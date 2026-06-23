import { NextResponse } from "next/server";
import { authCustomer } from "@/lib/auth";
import { parseCheckoutPayload } from "@/lib/checkout-payload";
import { prisma } from "@/lib/prisma";
import { requireAppBaseUrl } from "@/lib/app-url";
import {
  buildPaymentRedirectUrl,
  createRevolutOrder,
  getRevolutSecretKeyAsync,
  gbpToMinorUnits,
} from "@/lib/revolut";

export async function POST(req: Request) {
  if (!await getRevolutSecretKeyAsync()) {
    return NextResponse.json(
      {
        error:
          "Revolut is not configured. Add REVOLUT_MERCHANT_SECRET_KEY to your environment or set it in Admin → Settings.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const checkout = parseCheckoutPayload(
    typeof body === "object" && body && "checkout" in body
      ? (body as { checkout: unknown }).checkout
      : body,
  );

  if (!checkout) {
    return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 });
  }

  const amountMinor = gbpToMinorUnits(checkout.pricing.totalPrice);
  const customerName = `${checkout.customer.firstName} ${checkout.customer.lastName}`.trim();

  try {
    requireAppBaseUrl(req);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid site URL for payments";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const customerSession = await authCustomer();
  const payloadJson = {
    ...checkout,
    ...(customerSession?.user?.id ? { userId: customerSession.user.id } : {}),
  };

  const session = await prisma.paymentSession.create({
    data: {
      amountMinor,
      currency: "GBP",
      payload: JSON.stringify(payloadJson),
      status: "PENDING",
    },
  });

  try {
    const order = await createRevolutOrder({
      amountMinor,
      currency: "GBP",
      description: `BTS — ${checkout.pricing.vehicleName}`,
      redirectUrl: buildPaymentRedirectUrl(session.id, req),
      customerEmail: checkout.customer.email,
      customerName,
      customerPhone: checkout.customer.phone,
      metadata: {
        BTS_session_id: session.id,
        vehicle: checkout.pricing.vehicleName,
      },
    });

    await prisma.paymentSession.update({
      where: { id: session.id },
      data: { revolutOrderId: order.id },
    });

    return NextResponse.json({
      sessionId: session.id,
      checkoutUrl: order.checkout_url,
      orderId: order.id,
    });
  } catch (err) {
    await prisma.paymentSession.update({
      where: { id: session.id },
      data: { status: "FAILED" },
    });
    const message = err instanceof Error ? err.message : "Could not create payment";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
