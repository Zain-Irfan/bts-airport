import type { BookingPricingParams, QuoteSearchParams } from "@/lib/quote-search-params";

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CheckoutPayload = {
  quote: QuoteSearchParams;
  pricing: BookingPricingParams;
  customer: CheckoutCustomer;
};

export function parseCheckoutPayload(raw: unknown): CheckoutPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const customer = o.customer as CheckoutCustomer | undefined;
  const quote = o.quote as QuoteSearchParams | undefined;
  const pricing = o.pricing as BookingPricingParams | undefined;

  if (
    !customer?.firstName ||
    !customer?.lastName ||
    !customer?.email ||
    !customer?.phone ||
    !quote?.pickup ||
    !quote?.dropoff ||
    !pricing?.vehicleId ||
    !pricing?.vehicleName ||
    !Number.isFinite(pricing.totalPrice)
  ) {
    return null;
  }

  return { quote, pricing, customer };
}
