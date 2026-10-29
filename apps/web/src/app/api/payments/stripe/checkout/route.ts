import { NextResponse } from "next/server";
import { authCustomer } from "@/lib/auth";
import { requireAppBaseUrl } from "@/lib/app-url";
import { quoteBooking } from "@/lib/booking-quote";
import { parseCheckoutPayload } from "@/lib/checkout-payload";
import { paymentSuccessPath } from "@/lib/payment-session-param";
import { prisma } from "@/lib/prisma";
import { gbpToMinorUnits, getStripe, isStripeConfigured } from "@/lib/stripe";

/** Only allow returning to our own booking summary when the customer cancels on Stripe. */
function safeCancelPath(raw: unknown): string {
  return typeof raw === "string" && raw.startsWith("/booking-summary?") ? raw : "/";
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Online payments are not set up yet. Please call or WhatsApp us to book." },
      { status: 503 },
    );
  }

  let body: { checkout?: unknown; cancelPath?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const checkout = parseCheckoutPayload(body.checkout);
  if (!checkout) {
    return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 });
  }

  // Never charge the browser-sent price: recalculate from DB rates + server route distance.
  const priced = await quoteBooking(checkout.quote, checkout.pricing.vehicleId);
  if (!priced.ok) {
    return NextResponse.json({ error: priced.error }, { status: priced.status });
  }
  const pricing = {
    vehicleId: priced.quote.vehicleId,
    vehicleName: priced.quote.vehicleName,
    outboundPrice: priced.quote.outboundPrice,
    returnPrice: priced.quote.returnPrice,
    meetFee: priced.quote.meetFee,
    totalPrice: priced.quote.totalPrice,
  };
  const amountMinor = gbpToMinorUnits(pricing.totalPrice);

  let baseUrl: string;
  try {
    baseUrl = requireAppBaseUrl(req);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid site URL for payments";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const customerSession = await authCustomer();
  const session = await prisma.paymentSession.create({
    data: {
      amountMinor,
      currency: "GBP",
      payload: JSON.stringify({
        ...checkout,
        pricing,
        ...(customerSession?.user?.id ? { userId: customerSession.user.id } : {}),
      }),
      status: "PENDING",
    },
  });

  const { quote, customer } = checkout;
  const when = [quote.dateStr, quote.time].filter(Boolean).join(" ");
  const journey = `${quote.pickup} → ${quote.dropoff}`;
  const metadata = { payment_session_id: session.id, vehicle: pricing.vehicleName };

  try {
    const stripeSession = await getStripe().checkout.sessions.create(
      {
        mode: "payment",
        customer_email: customer.email,
        client_reference_id: session.id,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "gbp",
              unit_amount: amountMinor,
              product_data: {
                name: `${pricing.vehicleName} transfer${quote.hasReturn ? " (return)" : ""}`,
                description: `${journey}${when ? ` · ${when}` : ""}${pricing.meetFee > 0 ? " · incl. meet & greet" : ""}`.slice(0, 500),
              },
            },
          },
        ],
        metadata,
        payment_intent_data: {
          description: `MRM Executive Voyage — ${pricing.vehicleName}`,
          metadata,
        },
        success_url: `${baseUrl}${paymentSuccessPath(session.id)}`,
        cancel_url: `${baseUrl}${safeCancelPath(body.cancelPath)}`,
      },
      // One Stripe session per payment record, even if the request is retried.
      { idempotencyKey: `checkout-${session.id}` },
    );

    await prisma.paymentSession.update({
      where: { id: session.id },
      data: { stripeSessionId: stripeSession.id },
    });

    if (!stripeSession.url) {
      throw new Error("Stripe did not return a checkout URL");
    }
    return NextResponse.json({ sessionId: session.id, checkoutUrl: stripeSession.url });
  } catch (err) {
    await prisma.paymentSession.update({
      where: { id: session.id },
      data: { status: "FAILED" },
    });
    console.error("[stripe] create checkout session failed:", err);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
