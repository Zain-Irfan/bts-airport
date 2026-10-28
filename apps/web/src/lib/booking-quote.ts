// Server-only: authoritative booking price. Imports Prisma — never import into client components.
import { prisma } from "@/lib/prisma";
import { meetFeeFor, priceJourney, type JourneyPrice } from "@/lib/booking-pricing";
import type { BookingPricingParams, QuoteSearchParams } from "@/lib/quote-search-params";
import { getRouteDistance } from "@/lib/route-distance";

export type ServerQuote = BookingPricingParams &
  JourneyPrice & {
    outboundMiles: number;
    returnMiles: number | null;
    estimatedDistance: boolean;
  };

export type ServerQuoteResult = { ok: true; quote: ServerQuote } | { ok: false; error: string; status: number };

type QuoteInput = Pick<QuoteSearchParams, "pickup" | "dropoff" | "vias" | "hasReturn" | "meet" | "passengers" | "handcarry" | "suitcase">;

/** Recalculates the fare from DB rates + server-side route distance. Client-sent prices are ignored. */
export async function quoteBooking(raw: QuoteInput, vehicleId: string): Promise<ServerQuoteResult> {
  // Body comes from the browser: coerce every field rather than trusting its types.
  const input: QuoteInput = {
    pickup: String(raw?.pickup ?? "").trim(),
    dropoff: String(raw?.dropoff ?? "").trim(),
    vias: Array.isArray(raw?.vias) ? raw.vias.map(String).slice(0, 5) : [],
    hasReturn: raw?.hasReturn === true,
    meet: raw?.meet === "no" ? "no" : "yes",
    passengers: Math.max(1, Number(raw?.passengers) || 1),
    handcarry: Math.max(0, Number(raw?.handcarry) || 0),
    suitcase: Math.max(0, Number(raw?.suitcase) || 0),
  };
  if (!input.pickup || !input.dropoff) {
    return { ok: false, error: "Pickup and dropoff are required.", status: 400 };
  }

  const vehicle = await prisma.vehicleType.findUnique({ where: { id: vehicleId } });
  if (!vehicle || !vehicle.isActive) {
    return { ok: false, error: "That vehicle is no longer available. Please choose another.", status: 404 };
  }
  if (
    input.passengers > vehicle.maxPassengers ||
    input.handcarry > vehicle.maxHandLuggage ||
    input.suitcase > vehicle.maxSuitcases
  ) {
    return { ok: false, error: "This vehicle can't fit your passengers and luggage. Please choose a larger one.", status: 400 };
  }

  const vias = Array.isArray(input.vias) ? input.vias.filter((v) => typeof v === "string" && v.trim()) : [];
  const [outbound, returnLeg] = await Promise.all([
    getRouteDistance(input.pickup, input.dropoff, vias),
    input.hasReturn ? getRouteDistance(input.dropoff, input.pickup) : Promise.resolve(null),
  ]);

  const price = priceJourney(
    {
      baseFareGbp: vehicle.baseFareGbp.toString(),
      perMileGbp: vehicle.perMileGbp.toString(),
      minimumFareGbp: vehicle.minimumFareGbp.toString(),
      promoDiscountPercent: vehicle.promoDiscountPercent.toString(),
    },
    outbound.miles,
    returnLeg ? returnLeg.miles : null,
    meetFeeFor(input.pickup, input.meet),
  );

  if (!(price.totalPrice > 0)) {
    return { ok: false, error: "We couldn't price this journey. Please contact us to book.", status: 422 };
  }

  return {
    ok: true,
    quote: {
      ...price,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      outboundMiles: outbound.miles,
      returnMiles: returnLeg ? returnLeg.miles : null,
      estimatedDistance: outbound.estimated || Boolean(returnLeg?.estimated),
    },
  };
}
