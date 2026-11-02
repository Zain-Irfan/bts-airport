"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Loader2, MapPin } from "lucide-react";

export type RoutePath = [lat: number, lng: number][];

type Props = {
  path: RoutePath | null;
  loading?: boolean;
  hasAddresses: boolean;
};

const NAVY = "#0B1F3A";
const GOLD = "#F5B21B";

export function QuoteRouteMap({ path, loading, hasAddresses }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!path || path.length < 2 || !containerRef.current) return;

    let cancelled = false;
    let map: import("leaflet").Map | null = null;

    (async () => {
      // Leaflet touches `window` on import, so load it only in the browser.
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, { scrollWheelZoom: false, attributionControl: true });
      L.tileLayer("/api/map-tiles/{z}/{x}/{y}{r}", {
        maxZoom: 19,
        attribution:
          'Powered by <a href="https://www.geoapify.com/" target="_blank" rel="noopener">Geoapify</a> | © <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      }).addTo(map);

      const line = L.polyline(path, { color: NAVY, weight: 5, opacity: 0.9 }).addTo(map);
      L.circleMarker(path[0], { radius: 7, color: NAVY, weight: 2, fillColor: GOLD, fillOpacity: 1 })
        .bindTooltip("Pickup")
        .addTo(map);
      L.circleMarker(path[path.length - 1], { radius: 7, color: GOLD, weight: 2, fillColor: NAVY, fillOpacity: 1 })
        .bindTooltip("Dropoff")
        .addTo(map);
      map.fitBounds(line.getBounds(), { padding: [24, 24] });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [path]);

  if (!hasAddresses) return null;

  if (loading) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-lg border border-border bg-muted sm:h-56 md:h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-label="Loading map" />
      </div>
    );
  }

  if (!path || path.length < 2) {
    return (
      <div className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted px-4 text-center sm:h-56 md:h-64">
        <MapPin className="h-8 w-8 text-muted-foreground/60" />
        <p className="text-xs text-muted-foreground">Route map unavailable — distance estimate still shown below</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative z-0 h-48 w-full overflow-hidden rounded-lg border border-border sm:h-56 md:h-64"
      role="img"
      aria-label="Journey route map from pickup to dropoff"
    />
  );
}
