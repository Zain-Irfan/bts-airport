// Server-only: Geoapify (geocoding, routing, autocomplete, map tiles). Keeps the API key off the browser.
// Free plan: ~3,000 credits/day, no card — https://www.geoapify.com/pricing

const API = "https://api.geoapify.com/v1";
const LONDON = { lat: 51.5074, lon: -0.1278 };

export type LatLng = [lat: number, lng: number];

export function geoapifyKey(): string | undefined {
  return process.env.GEOAPIFY_API_KEY?.trim() || undefined;
}

/** Small TTL + size-capped cache so repeat lookups don't spend credits. */
function makeCache<T>(ttlMs: number, max: number) {
  const store = new Map<string, { at: number; value: T }>();
  return {
    get(key: string): T | undefined {
      const hit = store.get(key);
      return hit && Date.now() - hit.at < ttlMs ? hit.value : undefined;
    },
    set(key: string, value: T) {
      if (store.size >= max) store.delete(store.keys().next().value as string);
      store.set(key, { at: Date.now(), value });
    },
  };
}

async function getJson<T>(path: string, params: Record<string, string>): Promise<T | null> {
  const key = geoapifyKey();
  if (!key) return null;
  try {
    const res = await fetch(`${API}${path}?${new URLSearchParams({ ...params, apiKey: key })}`, {
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn(`[geoapify] ${path}:`, res.status, (await res.text().catch(() => "")).slice(0, 200));
      return null;
    }
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// --- Geocoding (address text → coordinates) ---

type GeocodeResponse = { results?: { lat?: number; lon?: number }[] };

const geocodeCache = makeCache<LatLng>(24 * 60 * 60 * 1000, 1000);

export async function geocode(address: string): Promise<LatLng | null> {
  const cacheKey = address.trim().toLowerCase();
  const hit = geocodeCache.get(cacheKey);
  if (hit) return hit;

  const data = await getJson<GeocodeResponse>("/geocode/search", {
    text: address,
    filter: "countrycode:gb",
    bias: `proximity:${LONDON.lon},${LONDON.lat}`,
    limit: "1",
    lang: "en",
    format: "json",
  });
  const r = data?.results?.[0];
  if (r?.lat == null || r?.lon == null) return null;
  const point: LatLng = [r.lat, r.lon];
  geocodeCache.set(cacheKey, point);
  return point;
}

// --- Routing ---

type RoutingResponse = {
  features?: {
    properties?: { distance?: number; time?: number };
    geometry?: { type?: string; coordinates?: number[][][] };
  }[];
};

export type DrivingRoute = { meters: number; seconds: number; path: LatLng[] };

/** Most routes come back with thousands of points; the map only needs a few hundred. */
const MAX_PATH_POINTS = 400;

export async function drivingRoute(points: LatLng[]): Promise<DrivingRoute | null> {
  if (points.length < 2) return null;
  const data = await getJson<RoutingResponse>("/routing", {
    waypoints: points.map(([lat, lng]) => `${lat},${lng}`).join("|"),
    mode: "drive",
  });
  const feature = data?.features?.[0];
  const meters = feature?.properties?.distance ?? 0;
  if (meters <= 0) return null;

  // Geometry is a MultiLineString of [lon, lat] (one line per leg).
  const lines = feature?.geometry?.coordinates ?? [];
  const all: LatLng[] = lines.flat().map(([lon, lat]) => [lat, lon]);
  const step = Math.max(1, Math.ceil(all.length / MAX_PATH_POINTS));
  const path = all.filter((_, i) => i % step === 0 || i === all.length - 1);

  return { meters, seconds: feature?.properties?.time ?? 0, path };
}

// --- Autocomplete ---

export type PlaceSuggestion = {
  id: string;
  label: string;
  main: string;
  secondary: string;
  postcode: string | null;
  lat: number;
  lng: number;
  kind: "airport" | "station" | "bus" | "";
};

type AutocompleteResponse = {
  results?: {
    place_id?: string;
    formatted?: string;
    address_line1?: string;
    address_line2?: string;
    name?: string;
    postcode?: string;
    lat?: number;
    lon?: number;
    category?: string;
    result_type?: string;
  }[];
};

const autocompleteCache = makeCache<PlaceSuggestion[]>(60 * 60 * 1000, 500);

function placeKind(text: string): PlaceSuggestion["kind"] {
  const t = text.toLowerCase();
  if (/airport|aerodrome|terminal/.test(t)) return "airport";
  if (/railway|train|station|underground|tube/.test(t)) return "station";
  if (/bus|coach/.test(t)) return "bus";
  return "";
}

export async function autocomplete(text: string): Promise<PlaceSuggestion[]> {
  const cacheKey = text.trim().toLowerCase();
  const hit = autocompleteCache.get(cacheKey);
  if (hit) return hit;

  const data = await getJson<AutocompleteResponse>("/geocode/autocomplete", {
    text,
    filter: "countrycode:gb",
    bias: `proximity:${LONDON.lon},${LONDON.lat}`,
    limit: "8",
    lang: "en",
    format: "json",
  });
  if (!data) return [];

  const suggestions: PlaceSuggestion[] = [];
  for (const r of data.results ?? []) {
    if (r.lat == null || r.lon == null || !r.formatted) continue;
    const label = r.formatted.replace(/, United Kingdom$/, "");
    const main = r.address_line1 || r.name || label.split(",")[0];
    const secondary = (r.address_line2 ?? "")
      .replace(/, United Kingdom$/, "")
      .replace(r.postcode ?? "\u0000", "")
      .replace(/,\s*,/g, ",")
      .replace(/^[,\s]+|[,\s]+$/g, "");
    suggestions.push({
      id: r.place_id ?? `${r.lat},${r.lon}`,
      label,
      main,
      secondary,
      postcode: r.postcode?.toUpperCase() ?? null,
      lat: r.lat,
      lng: r.lon,
      kind: placeKind(`${r.category ?? ""} ${r.name ?? ""} ${main}`),
    });
  }
  autocompleteCache.set(cacheKey, suggestions);
  return suggestions;
}

// --- Map tiles ---

export function tileUrl(z: number, x: number, y: number, retina: boolean): string | null {
  const key = geoapifyKey();
  if (!key) return null;
  return `https://maps.geoapify.com/v1/tile/positron/${z}/${x}/${y}${retina ? "@2x" : ""}.png?apiKey=${encodeURIComponent(key)}`;
}
