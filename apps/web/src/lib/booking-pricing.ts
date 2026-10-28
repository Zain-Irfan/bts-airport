import { isLikelyAirportPickup } from "@/lib/airport-pickup";
import { applyPromoPrice, calculateListPriceGbp } from "@/lib/quote-calculations";

/**
 * Shared fare maths for the quotes page, booking summary and the payment API.
 * The server re-runs this (with its own route distance and DB rates) before charging,
 * so whatever the browser sends is never trusted as the amount.
 */

export const MEET_AND_GREET_FEE_GBP = 16;

/** Used when no route can be planned (also the server fallback), so both sides agree. */
export const DEFAULT_ROUTE_MILES = 28;
export const DEFAULT_ROUTE_MINUTES = 55;

export type VehicleRates = {
  baseFareGbp: string;
  perMileGbp: string;
  minimumFareGbp: string;
  promoDiscountPercent: string | number;
};

export type JourneyPrice = {
  outboundList: number;
  returnList: number;
  outboundPrice: number;
  returnPrice: number;
  /** Fares before meet & greet */
  subtotal: number;
  meetFee: number;
  /** Amount the customer pays */
  totalPrice: number;
  promoPercent: number;
};

export function roundGbp(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Meet & greet only applies to airport pickups the customer didn't opt out of. */
export function meetFeeFor(pickup: string, meet: string): number {
  return meet !== "no" && isLikelyAirportPickup(pickup) ? MEET_AND_GREET_FEE_GBP : 0;
}

export function priceJourney(
  rates: VehicleRates,
  outboundMiles: number,
  returnMiles: number | null,
  meetFee: number,
): JourneyPrice {
  const promoPercent = Number(rates.promoDiscountPercent) || 0;
  const outboundList = calculateListPriceGbp(outboundMiles, rates.baseFareGbp, rates.perMileGbp, rates.minimumFareGbp);
  const returnList =
    returnMiles === null
      ? 0
      : calculateListPriceGbp(returnMiles, rates.baseFareGbp, rates.perMileGbp, rates.minimumFareGbp);

  const outboundPrice = roundGbp(applyPromoPrice(outboundList, promoPercent));
  const returnPrice = returnMiles === null ? 0 : roundGbp(applyPromoPrice(returnList, promoPercent));
  const subtotal = roundGbp(outboundPrice + returnPrice);

  return {
    outboundList: roundGbp(outboundList),
    returnList: roundGbp(returnList),
    outboundPrice,
    returnPrice,
    subtotal,
    meetFee,
    totalPrice: roundGbp(subtotal + meetFee),
    promoPercent,
  };
}
