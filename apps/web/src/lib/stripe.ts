// Server-only: Stripe client. Keys come from env vars only — never from the DB or the browser.
import Stripe from "stripe";

let client: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

/** Lazily created so builds and pages that don't take payments work without keys. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!client) {
    client = new Stripe(key, { appInfo: { name: "MRM Executive Voyage" } });
  }
  return client;
}

/** "test" / "live" from the key prefix, for admin display. */
export function stripeMode(): "test" | "live" | "none" {
  const key = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (key.startsWith("sk_live_") || key.startsWith("rk_live_")) return "live";
  if (key.startsWith("sk_test_") || key.startsWith("rk_test_")) return "test";
  return key ? "test" : "none";
}

/** Masked key for admin display, e.g. "sk_test_…4f2a". */
export function maskedStripeKey(): string | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  const prefix = key.match(/^(sk|rk)_(test|live)_/)?.[0] ?? "";
  return `${prefix}…${key.slice(-4)}`;
}

export function gbpToMinorUnits(amountGbp: number): number {
  return Math.max(1, Math.round(amountGbp * 100));
}

/** Checkout Session states that mean the money is secured. */
export function isCheckoutPaid(session: Stripe.Checkout.Session): boolean {
  return session.payment_status === "paid" || session.payment_status === "no_payment_required";
}
