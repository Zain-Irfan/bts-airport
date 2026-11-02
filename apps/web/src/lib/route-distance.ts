// Server-only: route distance used to price bookings. Do not import into client components.
import { DEFAULT_ROUTE_MILES, DEFAULT_ROUTE_MINUTES } from "@/lib/booking-pricing";
import { drivingRoute, geocode, type LatLng } from "@/lib/geoapify";

export type RouteDistance = {
  miles: number;
  minutes: number;
  /** true when the route couldn't be planned and the typical-journey fallback was used */
  estimated: boolean;
  /** Route line for the map ([lat, lng] points); empty when estimated. */
  path: LatLng[];
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX = 500;
const cache = new Map<string, { at: number; value: RouteDistance }>();

const FALLBACK: RouteDistance = { miles: DEFAULT_ROUTE_MILES, minutes: DEFAULT_ROUTE_MINUTES, estimated: true, path: [] };

/** Driving distance via Geoapify (addresses geocoded server-side), cached so repeat quotes for a journey stay identical. */
export async function getRouteDistance(origin: string, destination: string, vias: string[] = []): Promise<RouteDistance> {
  const from = origin.trim();
  const to = destination.trim();
  if (!from || !to) return FALLBACK;

  const key = [from, to, ...vias].map((s) => s.trim().toLowerCase()).join("|");
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.value;

  const value = await fetchRoute([from, ...vias.map((v) => v.trim()).filter(Boolean), to]);
  // Only cache real routes, so a temporary outage doesn't pin the fallback for hours.
  if (!value.estimated) {
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value as string);
    cache.set(key, { at: Date.now(), value });
  }
  return value;
}

async function fetchRoute(addresses: string[]): Promise<RouteDistance> {
  const points = await Promise.all(addresses.map(geocode));
  if (points.some((p) => !p)) return FALLBACK;

  const route = await drivingRoute(points as LatLng[]);
  if (!route) return FALLBACK;
  return { miles: route.meters / 1609.344, minutes: route.seconds / 60, estimated: false, path: route.path };
}
