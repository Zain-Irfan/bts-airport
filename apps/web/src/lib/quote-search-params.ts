/** Shared query params between /quotes and /booking-summary */

export type QuoteSearchParams = {
  pickup: string;
  dropoff: string;
  dateStr: string;
  time: string;
  passengers: number;
  handcarry: number;
  suitcase: number;
  meet: string;
  flight: string;
  vias: string[];
  hasReturn: boolean;
  returnDateStr: string;
  returnTime: string;
};

export type BookingPricingParams = {
  vehicleId: string;
  vehicleName: string;
  outboundPrice: number;
  returnPrice: number;
  totalPrice: number;
  meetFee: number;
};

export function parseQuoteSearchParams(sp: URLSearchParams): QuoteSearchParams {
  return {
    pickup: sp.get("pickup")?.trim() ?? "",
    dropoff: sp.get("dropoff")?.trim() ?? "",
    dateStr: sp.get("date")?.trim() ?? "",
    time: sp.get("time")?.trim() ?? "12:00",
    passengers: Math.max(1, Number(sp.get("passengers")) || 1),
    handcarry: Math.max(0, Number(sp.get("handcarry")) || 0),
    suitcase: Math.max(0, Number(sp.get("suitcase")) || 0),
    meet: sp.get("meet") ?? "yes",
    flight: sp.get("flight")?.trim() ?? "",
    vias: sp.getAll("via").map((v) => v.trim()).filter(Boolean),
    hasReturn:
      sp.get("return") === "1" ||
      sp.get("returnJourney") === "on" ||
      sp.get("returnJourney") === "true",
    returnDateStr: sp.get("returnDate")?.trim() ?? "",
    returnTime: sp.get("returnTime")?.trim() ?? "12:00",
  };
}

export function parseBookingPricingParams(sp: URLSearchParams): BookingPricingParams | null {
  const vehicleId = sp.get("vehicleId")?.trim() ?? "";
  const vehicleName = sp.get("vehicle")?.trim() ?? "";
  const totalPrice = Number(sp.get("totalPrice"));
  if (!vehicleId || !vehicleName || !Number.isFinite(totalPrice)) return null;

  return {
    vehicleId,
    vehicleName,
    outboundPrice: Number(sp.get("outboundPrice")) || 0,
    returnPrice: Number(sp.get("returnPrice")) || 0,
    totalPrice,
    meetFee: Number(sp.get("meetFee")) || 0,
  };
}

export function quoteParamsToSearchParams(quote: QuoteSearchParams): URLSearchParams {
  const p = new URLSearchParams({
    pickup: quote.pickup,
    dropoff: quote.dropoff,
    date: quote.dateStr,
    time: quote.time,
    passengers: String(quote.passengers),
    handcarry: String(quote.handcarry),
    suitcase: String(quote.suitcase),
    meet: quote.meet,
    flight: quote.flight,
  });
  quote.vias.forEach((v) => p.append("via", v));
  if (quote.hasReturn) {
    p.set("return", "1");
    if (quote.returnDateStr) p.set("returnDate", quote.returnDateStr);
    p.set("returnTime", quote.returnTime);
  }
  return p;
}

export function buildBookingSummaryUrl(
  base: URLSearchParams | { toString(): string },
  pricing: Omit<BookingPricingParams, "meetFee"> & { meetFee?: number },
): string {
  const p = new URLSearchParams(base.toString());
  p.set("vehicleId", pricing.vehicleId);
  p.set("vehicle", pricing.vehicleName);
  p.set("outboundPrice", pricing.outboundPrice.toFixed(2));
  p.set("returnPrice", pricing.returnPrice.toFixed(2));
  p.set("totalPrice", pricing.totalPrice.toFixed(2));
  p.set("meetFee", (pricing.meetFee ?? 0).toFixed(2));
  return `/booking-summary?${p.toString()}`;
}

export function buildQuotesUrl(base: URLSearchParams | { toString(): string }): string {
  const p = new URLSearchParams(base.toString());
  for (const key of ["vehicleId", "vehicle", "outboundPrice", "returnPrice", "totalPrice", "meetFee"]) {
    p.delete(key);
  }
  return `/quotes?${p.toString()}`;
}
