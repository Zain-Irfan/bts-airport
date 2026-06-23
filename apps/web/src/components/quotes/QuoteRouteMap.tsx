"use client";

import { useEffect, useRef } from "react";
import { Loader2, MapPin } from "lucide-react";
import { loadGooglePlacesScript } from "@/lib/google-maps-script";

const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1c" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1c" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2d2d33" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1f2937" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2d33" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1f1f23" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3f3f46" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#27272a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
];

type Props = {
  apiKey: string | undefined;
  directions: google.maps.DirectionsResult | null;
  loading?: boolean;
  hasAddresses: boolean;
};

export function QuoteRouteMap({ apiKey, directions, loading, hasAddresses }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!apiKey || !directions || !containerRef.current) return;

    let cancelled = false;

    (async () => {
      try {
        await loadGooglePlacesScript(apiKey);
      } catch {
        return;
      }
      if (cancelled || !containerRef.current || !window.google?.maps) return;

      if (!mapRef.current) {
        mapRef.current = new google.maps.Map(containerRef.current, {
          zoom: 7,
          center: { lat: 54.5, lng: -3.5 },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: DARK_MAP_STYLES,
        });
      }

      if (!rendererRef.current) {
        rendererRef.current = new google.maps.DirectionsRenderer({
          map: mapRef.current,
          suppressMarkers: false,
          preserveViewport: false,
          polylineOptions: {
            strokeColor: "#F97316",
            strokeWeight: 5,
            strokeOpacity: 0.92,
          },
        });
      }

      rendererRef.current.setDirections(directions);
    })();

    return () => {
      cancelled = true;
    };
  }, [apiKey, directions]);

  if (!hasAddresses) return null;

  if (loading) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-lg border border-white/10 bg-[#141416] sm:h-56 md:h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-label="Loading map" />
      </div>
    );
  }

  if (!directions) {
    return (
      <div className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-[#141416] px-4 text-center sm:h-56 md:h-64">
        <MapPin className="h-8 w-8 text-muted-foreground/60" />
        <p className="text-xs text-muted-foreground">Route map unavailable — distance estimate still shown below</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-48 w-full overflow-hidden rounded-lg border border-white/10 sm:h-56 md:h-64"
      role="img"
      aria-label="Journey route map from pickup to dropoff"
    />
  );
}
