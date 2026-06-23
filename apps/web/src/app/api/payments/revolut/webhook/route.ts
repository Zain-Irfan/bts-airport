import { NextResponse } from "next/server";
import { fulfilPaymentSession } from "@/lib/fulfil-payment-session";
import { prisma } from "@/lib/prisma";

type WebhookBody = {
  event?: string;
  order_id?: string;
  id?: string;
  metadata?: Record<string, string>;
};

const PAYMENT_EVENTS = new Set([
  "ORDER_COMPLETED",
  "ORDER_AUTHORISED",
  "ORDER_PAYMENT_AUTHENTICATED",
]);

export async function POST(req: Request) {
  let body: WebhookBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = body.event ?? "";
  if (!PAYMENT_EVENTS.has(event)) {
    return NextResponse.json({ received: true, ignored: true });
  }

  const orderId = body.order_id ?? body.id;
  if (!orderId) {
    return NextResponse.json({ error: "Missing order id" }, { status: 400 });
  }

  let session =
    (await prisma.paymentSession.findUnique({ where: { revolutOrderId: orderId } })) ??
    (body.metadata?.BTS_session_id
      ? await prisma.paymentSession.findUnique({
          where: { id: body.metadata.BTS_session_id },
        })
      : null);

  if (!session) {
    return NextResponse.json({ received: true, session: "not_found" });
  }

  if (!session.revolutOrderId) {
    await prisma.paymentSession.update({
      where: { id: session.id },
      data: { revolutOrderId: orderId },
    });
  }

  await fulfilPaymentSession(session.id);

  return NextResponse.json({ received: true });
}
