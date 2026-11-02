"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_ROUTE_MILES as DEFAULT_MILES, DEFAULT_ROUTE_MINUTES as DEFAULT_MINUTES } from "@/lib/booking-pricing";
import type { RoutePath } from "@/components/quotes/QuoteRouteMap";

type ServerDistance = { miles: number; minutes: number; estimated: boolean; path?: RoutePath };

/** Distance used for prices comes from the server (the same figure payment is charged on), plus the map line. */
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
  pickup: string,
  dropoff: string,
  vias: string[],
  enabled: boolean,
) {
  const [miles, setMiles] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [path, setPath] = useState<RoutePath | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const viasKey = vias.join("\u0001");
  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    if (!enabled || !pickup.trim() || !dropoff.trim()) {
      setMiles(null);
      setMinutes(null);
      setPath(null);
      setNote(null);
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setNote(null);
    setPath(null);

    try {
      const server = await fetchServerDistance(pickup, dropoff, vias);
      if (requestId !== requestIdRef.current) return;

      if (!server || server.estimated) {
        setMiles(server?.miles ?? DEFAULT_MILES);
        setMinutes(server?.minutes ?? DEFAULT_MINUTES);
        setNote("Could not plot route — showing a typical estimate.");
        return;
      }
      setMiles(server.miles);
      setMinutes(server.minutes);
      setPath(server.path?.length ? server.path : null);
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
  }, [dropoff, enabled, pickup, viasKey, vias]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    miles,
    minutes,
    path,
    loading,
    note,
    milesUsed: miles ?? DEFAULT_MILES,
  };
}
