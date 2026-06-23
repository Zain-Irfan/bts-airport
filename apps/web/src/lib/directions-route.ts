import { loadGooglePlacesScript } from "@/lib/google-maps-script";

export type RouteStats = {
  miles: number;
  minutes: number;
  directions: google.maps.DirectionsResult;
};

export async function fetchDrivingRoute(
  apiKey: string | undefined,
  origin: string,
  destination: string,
  vias: string[] = [],
): Promise<RouteStats | null> {
  if (!origin.trim() || !destination.trim()) return null;

  if (apiKey) {
    await loadGooglePlacesScript(apiKey);
  }
  if (!window.google?.maps?.DirectionsService) return null;

  const svc = new google.maps.DirectionsService();
  const waypoints = vias.map((location) => ({ location, stopover: true }));

  const result = await new Promise<google.maps.DirectionsResult | null>((resolve) => {
    const timeout = window.setTimeout(() => resolve(null), 20_000);

    svc.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        region: "uk",
      },
      (res, status) => {
        window.clearTimeout(timeout);
        if (status === google.maps.DirectionsStatus.OK && res?.routes[0]) {
          resolve(res);
        } else {
          resolve(null);
        }
      },
    );
  });

  if (!result?.routes[0]) return null;

  let meters = 0;
  let secs = 0;
  for (const leg of result.routes[0].legs ?? []) {
    meters += leg.distance?.value ?? 0;
    secs += leg.duration?.value ?? 0;
  }

  return {
    miles: meters / 1609.344,
    minutes: secs / 60,
    directions: result,
  };
}
