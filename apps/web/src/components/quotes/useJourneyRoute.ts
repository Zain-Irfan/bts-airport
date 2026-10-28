"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchDrivingRoute } from "@/lib/directions-route";
import { DEFAULT_ROUTE_MILES as DEFAULT_MILES, DEFAULT_ROUTE_MINUTES as DEFAULT_MINUTES } from "@/lib/booking-pricing";

type ServerDistance = { miles: number; minutes: number; estimated: boolean };

/** Distance used for prices comes from the server (the same figure payment is charged on). */
async function fetchServerDistance(origin: string, destination: string, vias: string[]): Promise<ServerDistance | null> {
  const p = new URLSearchParams({ origin, destination });
  vias.forEach((v) => p.append("via", v));
  try {
    const res = await fetch(`/api/route-distance?${p}`);
    if (!res.ok) return null;
    return (await res.json()) as ServerDistance;
  } catch {
    return null;
  }
}

export function useJourneyRoute(
  apiKey: string | undefined,
  pickup: string,
  dropoff: string,
  vias: string[],
  enabled: boolean,
) {
  const [miles, setMiles] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const viasKey = vias.join("\u0001");
  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    if (!enabled || !pickup.trim() || !dropoff.trim()) {
      setMiles(null);
      setMinutes(null);
      setDirections(null);
      setNote(null);
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setNote(null);
    setDirections(null);

    try {
      // The browser route only draws the map; pricing distance comes from the server.
      const [server, stats] = await Promise.all([
        fetchServerDistance(pickup, dropoff, vias),
        fetchDrivingRoute(apiKey, pickup, dropoff, vias).catch(() => null),
      ]);
      if (requestId !== requestIdRef.current) return;

      if (stats) setDirections(stats.directions);
      if (!server || server.estimated) {
        setMiles(server?.miles ?? DEFAULT_MILES);
        setMinutes(server?.minutes ?? DEFAULT_MINUTES);
        setNote("Could not plot route — showing a typical estimate.");
        return;
      }
      setMiles(server.miles);
      setMinutes(server.minutes);
    } catch {
      if (requestId !== requestIdRef.current) return;
      setMiles(DEFAULT_MILES);
      setMinutes(DEFAULT_MINUTES);
      setNote("Could not load route — showing a typical estimate.");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [apiKey, dropoff, enabled, pickup, viasKey, vias]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    miles,
    minutes,
    directions,
    loading,
    note,
    milesUsed: miles ?? DEFAULT_MILES,
  };
}
