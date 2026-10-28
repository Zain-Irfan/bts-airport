// Server-only: route distance used to price bookings. Do not import into client components.
import { DEFAULT_ROUTE_MILES, DEFAULT_ROUTE_MINUTES } from "@/lib/booking-pricing";

export type RouteDistance = {
  miles: number;
  minutes: number;
  /** true when Google couldn't plan the route and the typical-journey fallback was used */
  estimated: boolean;
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX = 500;
const cache = new Map<string, { at: number; value: RouteDistance }>();

function apiKey(): string | undefined {
  // A server key (IP-restricted) is preferred; browser keys with referrer restrictions are rejected server-side.
  return process.env.GOOGLE_MAPS_SERVER_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || undefined;
}

const FALLBACK: RouteDistance = { miles: DEFAULT_ROUTE_MILES, minutes: DEFAULT_ROUTE_MINUTES, estimated: true };

/** Driving distance via the Google Directions API, cached so repeat quotes for a journey stay identical. */
export async function getRouteDistance(origin: string, destination: string, vias: string[] = []): Promise<RouteDistance> {
  const from = origin.trim();
  const to = destination.trim();
  if (!from || !to) return FALLBACK;

  const key = [from, to, ...vias].map((s) => s.trim().toLowerCase()).join("|");
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.value;

  const value = await fetchFromGoogle(from, to, vias);
  // Only cache real routes, so a temporary Google outage doesn't pin the fallback for hours.
  if (!value.estimated) {
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value as string);
    cache.set(key, { at: Date.now(), value });
  }
  return value;
}

async function fetchFromGoogle(origin: string, destination: string, vias: string[]): Promise<RouteDistance> {
  const key = apiKey();
  if (!key) return FALLBACK;

  const params = new URLSearchParams({ origin, destination, mode: "driving", region: "uk", key });
  if (vias.length) params.set("waypoints", vias.join("|"));

  try {
    const res = await fetch(`https://maps.googleapis.com/maps/api/directions/json?${params}`, {
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const data = (await res.json()) as {
      status?: string;
      routes?: { legs?: { distance?: { value?: number }; duration?: { value?: number } }[] }[];
    };
    const legs = data.status === "OK" ? data.routes?.[0]?.legs : undefined;
    if (!legs?.length) return FALLBACK;

    let meters = 0;
    let secs = 0;
    for (const leg of legs) {
      meters += leg.distance?.value ?? 0;
      secs += leg.duration?.value ?? 0;
    }
    if (meters <= 0) return FALLBACK;
    return { miles: meters / 1609.344, minutes: secs / 60, estimated: false };
  } catch {
    return FALLBACK;
  }
}
