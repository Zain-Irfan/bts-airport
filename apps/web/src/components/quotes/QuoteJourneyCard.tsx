"use client";

import { Clock, Loader2, MapPin, Route, Users } from "lucide-react";
import { QuoteRouteMap } from "@/components/quotes/QuoteRouteMap";

type Props = {
  title: string;
  pickup: string;
  dropoff: string;
  vias?: string[];
  whenLabel: string;
  passengers: number;
  miles: number | null;
  minutes: number | null;
  routeLoading: boolean;
  routeNote?: string | null;
  apiKey?: string;
  directions: google.maps.DirectionsResult | null;
  showMap?: boolean;
};

export function QuoteJourneyCard({
  title,
  pickup,
  dropoff,
  vias = [],
  whenLabel,
  passengers,
  miles,
  minutes,
  routeLoading,
  routeNote,
  apiKey,
  directions,
  showMap = true,
}: Props) {
  const milesLabel = miles != null ? miles.toFixed(2) : "—";

  return (
    <section className="overflow-hidden rounded-xl border border-white/[0.1] bg-card shadow-lg">
      <div className="border-b border-white/10 bg-[#1a1a1c] px-4 py-3 text-sm font-bold text-[#F8F8F8]">
        {title}
      </div>
      <div className="space-y-4 p-4 sm:p-5 md:p-6">
        {showMap && (
          <QuoteRouteMap
            apiKey={apiKey}
            directions={directions}
            loading={routeLoading}
            hasAddresses={Boolean(pickup && dropoff)}
          />
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Pickup</p>
            <p className="flex items-start gap-2 text-sm font-medium text-[#E5E7EB]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
              {pickup}
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Dropoff</p>
            <p className="flex items-start gap-2 text-sm font-medium text-[#E5E7EB]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              {dropoff}
            </p>
          </div>
        </div>
        {vias.length > 0 && (
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Via</p>
            <ul className="space-y-1 text-sm text-[#CFCFCF]">
              {vias.map((v, i) => (
                <li key={`${v}-${i}`} className="flex items-start gap-2">
                  <Route className="mt-0.5 h-4 w-4 shrink-0 text-highlight/80" />
                  <span>
                    <span className="font-semibold text-[#E5E7EB]">Stop {i + 1}: </span>
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Pickup date</p>
          <p className="text-sm font-semibold text-[#F8F8F8]">{whenLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-secondary/80 px-3 py-1 text-xs font-semibold text-[#E5E7EB]">
            <Users className="h-3.5 w-3.5" />
            {passengers} Pax
          </span>
          {routeLoading ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Route…
            </span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-secondary/80 px-3 py-1 text-xs font-semibold text-[#E5E7EB]">
                <Clock className="h-3.5 w-3.5" />
                {minutes != null ? `${minutes.toFixed(0)} min` : "—"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-secondary/80 px-3 py-1 text-xs font-semibold text-[#E5E7EB]">
                <MapPin className="h-3.5 w-3.5" />
                {milesLabel} mi
              </span>
            </>
          )}
        </div>
        {routeNote && <p className="text-xs text-amber-400/90">{routeNote}</p>}
      </div>
    </section>
  );
}
