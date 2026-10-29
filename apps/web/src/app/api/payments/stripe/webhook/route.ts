import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { fulfilPaymentSession } from "@/lib/fulfil-payment-session";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/** Stripe → us. Signature-verified; creates the booking even if the customer closes the tab before the success page. */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Must be the raw, unparsed body for the signature check.
    event = getStripe().webhooks.constructEvent(await req.text(), signature, secret);
  } catch (err) {
    console.error("[stripe] webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const id = await paymentSessionIdFor(event.data.object);
      if (id) {
        const result = await fulfilPaymentSession(id);
        // Not paid yet (e.g. delayed bank payment) is fine — async_payment_succeeded will follow.
        if (!result.ok && result.error !== "Payment not completed") {
          console.error("[stripe] fulfilment failed:", id, result.error);
        }
      }
      break;
    }
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed": {
      const id = await paymentSessionIdFor(event.data.object);
      if (id) {
        await prisma.paymentSession.updateMany({
          where: { id, status: "PENDING" },
          data: { status: event.type === "checkout.session.expired" ? "CANCELLED" : "FAILED" },
        });
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function paymentSessionIdFor(checkout: Stripe.Checkout.Session): Promise<string | null> {
  const fromMetadata = checkout.metadata?.payment_session_id || checkout.client_reference_id;
  if (fromMetadata) return fromMetadata;
  const row = await prisma.paymentSession.findUnique({
    where: { stripeSessionId: checkout.id },
    select: { id: true },
  });
  return row?.id ?? null;
}
