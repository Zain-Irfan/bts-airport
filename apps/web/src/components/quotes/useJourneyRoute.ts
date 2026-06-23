"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchDrivingRoute } from "@/lib/directions-route";

const DEFAULT_MILES = 28;
const DEFAULT_MINUTES = 55;

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
      const stats = await fetchDrivingRoute(apiKey, pickup, dropoff, vias);
      if (requestId !== requestIdRef.current) return;

      if (!stats) {
        setMiles(DEFAULT_MILES);
        setMinutes(DEFAULT_MINUTES);
        setNote("Could not plot route — showing a typical estimate.");
        return;
      }
      setDirections(stats.directions);
      setMiles(stats.miles);
      setMinutes(stats.minutes);
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
