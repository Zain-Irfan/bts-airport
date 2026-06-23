"use client";

import Link from "next/link";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { useSearchParams } from "next/navigation";
import { buildBookingSummaryUrl } from "@/lib/quote-search-params";
import { useEffect, useMemo, useState } from "react";
import { Briefcase, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { FullFooterSection } from "@/components/FullFooterSection";
import { FaWhatsapp } from "react-icons/fa";
import type { VehicleTypeDTO } from "@/lib/vehicle-types";
import type { VehicleCategoryDTO } from "@/lib/vehicle-category";
import { applyPromoPrice, calculateListPriceGbp, formatGbp } from "@/lib/quote-calculations";
import { QuoteJourneyCard } from "@/components/quotes/QuoteJourneyCard";
import { useJourneyRoute } from "@/components/quotes/useJourneyRoute";

/** Stable empty array — do not pass inline `[]` to hooks (causes infinite re-fetch). */
const NO_VIAS: string[] = [];

function useQuoteParams() {
  const sp = useSearchParams();
  return useMemo(() => {
    const pickup = sp.get("pickup")?.trim() ?? "";
    const dropoff = sp.get("dropoff")?.trim() ?? "";
    const dateStr = sp.get("date")?.trim() ?? "";
    const time = sp.get("time")?.trim() ?? "12:00";
    const passengers = Math.max(1, Number(sp.get("passengers")) || 1);
    const handcarry = Math.max(0, Number(sp.get("handcarry")) || 0);
    const suitcase = Math.max(0, Number(sp.get("suitcase")) || 0);
    const meet = sp.get("meet") ?? "yes";
    const flight = sp.get("flight")?.trim() ?? "";
    const vias = sp.getAll("via").map((v) => v.trim()).filter(Boolean);
    const hasReturn =
      sp.get("return") === "1" ||
      sp.get("returnJourney") === "on" ||
      sp.get("returnJourney") === "true";
    const returnDateStr = sp.get("returnDate")?.trim() ?? "";
    const returnTime = sp.get("returnTime")?.trim() ?? "12:00";
    return {
      pickup,
      dropoff,
      dateStr,
      time,
      passengers,
      handcarry,
      suitcase,
      meet,
      flight,
      vias,
      hasReturn,
      returnDateStr,
      returnTime,
    };
  }, [sp]);
}

function formatWhen(dateStr: string, time: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return `${dateStr} ${time}`.trim();
  try {
    const d = parseISO(`${dateStr}T${time}:00`);
    return format(d, "d MMM yyyy, HH:mm");
  } catch {
    return `${dateStr} ${time}`;
  }
}

export function QuotesPageClient() {
  const { whatsapp } = useSiteSettings();
  const searchParams = useSearchParams();
  const params = useQuoteParams();
  const [vehicles, setVehicles] = useState<VehicleTypeDTO[]>([]);
  const [categories, setCategories] = useState<VehicleCategoryDTO[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [categoryKey, setCategoryKey] = useState<string>("all");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  const outbound = useJourneyRoute(apiKey, params.pickup, params.dropoff, params.vias, true);
  const returnLeg = useJourneyRoute(
    apiKey,
    params.dropoff,
    params.pickup,
    NO_VIAS,
    params.hasReturn && !outbound.loading,
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingList(true);
      try {
        const [vRes, cRes] = await Promise.all([
          fetch("/api/vehicle-types"),
          fetch("/api/vehicle-categories"),
        ]);
        const vJson = await vRes.json().catch(() => ({}));
        const cJson = await cRes.json().catch(() => ({}));
        if (cancelled) return;
        setVehicles(Array.isArray(vJson.items) ? vJson.items : []);
        setCategories(Array.isArray(cJson.items) ? cJson.items : []);
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (categoryKey !== "all" && v.categoryKey !== categoryKey) return false;
      if (v.maxPassengers < params.passengers) return false;
      if (v.maxHandLuggage < params.handcarry) return false;
      if (v.maxSuitcases < params.suitcase) return false;
      return true;
    });
  }, [vehicles, categoryKey, params.handcarry, params.passengers, params.suitcase]);

  const activeCats = useMemo(() => categories.filter((c) => c.isActive), [categories]);

  const whenLabel = formatWhen(params.dateStr, params.time);
  const returnDateForLabel = useMemo(() => {
    if (params.returnDateStr) return params.returnDateStr;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(params.dateStr)) return params.dateStr;
    try {
      const d = parseISO(params.dateStr);
      d.setDate(d.getDate() + 2);
      return format(d, "yyyy-MM-dd");
    } catch {
      return params.dateStr;
    }
  }, [params.dateStr, params.returnDateStr]);

  const returnWhenLabel = params.hasReturn ? formatWhen(returnDateForLabel, params.returnTime) : "";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:bg-[#1ebe5d] hover:shadow-[0_8px_28px_-4px_rgba(37,211,102,0.45)]"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      <SiteTopHeader />

      <main className="container mx-auto max-w-6xl px-3 py-8 sm:px-4 sm:py-10 md:py-14">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-[#F8F8F8] sm:mb-8 sm:text-3xl md:text-4xl">
          Quotes
        </h1>

        {!params.pickup || !params.dropoff ? (
          <div className="rounded-xl border border-white/10 bg-card p-8 text-center text-muted-foreground">
            <p className="mb-4">
              Missing pickup or dropoff. Go back to the home page and complete the booking form.
            </p>
            <Link
              href="/"
              className="inline-flex cursor-pointer rounded-lg border border-highlight/40 bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:brightness-105"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <>
            <div className={`mb-8 grid gap-4 ${params.hasReturn ? "lg:grid-cols-2" : ""}`}>
              <QuoteJourneyCard
                title="Outbound Journey"
                pickup={params.pickup}
                dropoff={params.dropoff}
                vias={params.vias}
                whenLabel={whenLabel}
                passengers={params.passengers}
                miles={outbound.miles}
                minutes={outbound.minutes}
                routeLoading={outbound.loading}
                routeNote={outbound.note}
                apiKey={apiKey}
                directions={outbound.directions}
              />
              {params.hasReturn && (
                <QuoteJourneyCard
                  title="Return Journey"
                  pickup={params.dropoff}
                  dropoff={params.pickup}
                  whenLabel={returnWhenLabel}
                  passengers={params.passengers}
                  miles={returnLeg.miles}
                  minutes={returnLeg.minutes}
                  routeLoading={returnLeg.loading}
                  routeNote={returnLeg.note}
                  apiKey={apiKey}
                  directions={returnLeg.directions}
                />
              )}
            </div>

            <div className="-mx-3 mb-6 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <button
                type="button"
                onClick={() => setCategoryKey("all")}
                className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                  categoryKey === "all"
                    ? "border-accent/50 bg-accent text-accent-foreground shadow-[0_4px_20px_-6px_rgba(249,115,22,0.45)]"
                    : "border-white/10 bg-secondary/60 text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                All Vehicles
              </button>
              {activeCats.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategoryKey(c.slug)}
                  className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                    categoryKey === c.slug
                      ? "border-accent/50 bg-accent text-accent-foreground shadow-[0_4px_20px_-6px_rgba(249,115,22,0.45)]"
                      : "border-white/10 bg-secondary/60 text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {loadingList ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-card shadow-[0_16px_48px_-20px_rgba(0,0,0,0.55)]"
                  >
                    <div className="border-b border-white/[0.06] p-5 pb-3">
                      <div className="h-5 w-2/3 animate-pulse rounded-md bg-white/10" />
                      <div className="mt-2 h-3 w-1/2 animate-pulse rounded-md bg-white/[0.06]" />
                    </div>
                    <div className="h-40 w-full animate-pulse bg-white/[0.04]" />
                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <div className="flex gap-4">
                        <div className="h-4 w-10 animate-pulse rounded bg-white/10" />
                        <div className="h-4 w-10 animate-pulse rounded bg-white/10" />
                        <div className="h-4 w-10 animate-pulse rounded bg-white/10" />
                      </div>
                      <div className="mt-auto space-y-2">
                        <div className="h-7 w-24 animate-pulse rounded-md bg-white/10" />
                      </div>
                      <div className="h-12 w-full animate-pulse rounded-lg bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVehicles.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-card py-16 text-center text-muted-foreground">
                No vehicles match your party size and category. Try &quot;All Vehicles&quot; or adjust luggage /
                passengers.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredVehicles.map((v) => {
                  const promoPct = Number(v.promoDiscountPercent) || 0;

                  const outboundList = calculateListPriceGbp(
                    outbound.milesUsed,
                    v.baseFareGbp,
                    v.perMileGbp,
                    v.minimumFareGbp,
                  );
                  const returnList = params.hasReturn
                    ? calculateListPriceGbp(
                        returnLeg.milesUsed,
                        v.baseFareGbp,
                        v.perMileGbp,
                        v.minimumFareGbp,
                      )
                    : 0;

                  const outboundPay = applyPromoPrice(outboundList, promoPct);
                  const returnPay = params.hasReturn ? applyPromoPrice(returnList, promoPct) : 0;
                  const totalList = outboundList + returnList;
                  const totalPay = outboundPay + returnPay;
                  const showPromo = promoPct > 0 && totalList > totalPay;
                  const img = v.imageUrl || "/images/saloon.jpeg";

                  return (
                    <article
                      key={v.id}
                      className="relative flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-card shadow-[0_16px_48px_-20px_rgba(0,0,0,0.55)]"
                    >
                      {showPromo && (
                        <div className="absolute right-0 top-6 z-10 translate-x-8 rotate-45 bg-red-600 px-10 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
                          {promoPct}% Off
                        </div>
                      )}
                      <div className="border-b border-white/[0.06] p-5 pb-3">
                        <h2 className="pr-12 text-lg font-bold text-[#F8F8F8]">{v.name}</h2>
                        {v.subtitle && <p className="mt-1 text-xs text-muted-foreground">{v.subtitle}</p>}
                      </div>
                      <div className="relative h-40 w-full bg-[#141416]">
                        {/* eslint-disable-next-line @next/next/no-img-element -- dynamic admin URLs */}
                        <img src={img} alt="" className="h-full w-full object-contain object-center px-4" />
                      </div>
                      <div className="flex flex-1 flex-col gap-4 p-5">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-highlight" />
                            {v.maxPassengers}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            {v.maxHandLuggage}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4 opacity-70" />
                            {v.maxSuitcases}
                          </span>
                        </div>
                        <div className="mt-auto space-y-2">
                          {params.hasReturn && (
                            <span className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-400">
                              Round Trip
                            </span>
                          )}
                          {showPromo && (
                            <p className="text-sm text-red-400 line-through">Was {formatGbp(totalList)}</p>
                          )}
                          <p className="text-2xl font-extrabold text-emerald-400">{formatGbp(totalPay)}</p>
                          {params.hasReturn && (
                            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100/90">
                              <p>
                                <span className="font-semibold text-emerald-300">Outbound:</span>{" "}
                                {formatGbp(outboundPay)}
                              </p>
                              <p className="mt-1">
                                <span className="font-semibold text-emerald-300">Return:</span> {formatGbp(returnPay)}
                              </p>
                            </div>
                          )}
                        </div>
                        <Link
                          href={buildBookingSummaryUrl(searchParams, {
                            vehicleId: v.id,
                            vehicleName: v.name,
                            outboundPrice: outboundPay,
                            returnPrice: returnPay,
                            totalPrice: totalPay,
                            meetFee: Number(searchParams.get("meetFee")) || 0,
                          })}
                          className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-highlight/35 bg-accent text-sm font-extrabold text-accent-foreground shadow-[0_6px_24px_-8px_rgba(249,115,22,0.35)] transition hover:brightness-105"
                        >
                          Book Now
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      <FullFooterSection />
    </div>
  );
}
