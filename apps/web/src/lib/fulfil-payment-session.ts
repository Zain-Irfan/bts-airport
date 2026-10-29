import { parseCheckoutPayload } from "@/lib/checkout-payload";
import { createBookingFromCheckout } from "@/lib/create-booking-from-checkout";
import { prisma } from "@/lib/prisma";
import { getStripe, isCheckoutPaid } from "@/lib/stripe";
import { sendBookingConfirmationEmail } from "@/lib/email";
import { format } from "date-fns";

/** Idempotent: confirm payment session and create the booking once Stripe reports it paid. */
export async function fulfilPaymentSession(sessionId: string) {
  const session = await prisma.paymentSession.findUnique({ where: { id: sessionId } });
  if (!session) {
    return { ok: false as const, error: "Session not found" };
  }

  if (session.status === "COMPLETED" && session.bookingId) {
    return { ok: true as const, session, alreadyDone: true };
  }

  if (!session.stripeSessionId) {
    return { ok: false as const, error: "No Stripe payment linked" };
  }

  const checkout = await getStripe().checkout.sessions.retrieve(session.stripeSessionId);
  if (!isCheckoutPaid(checkout)) {
    return { ok: false as const, error: "Payment not completed", orderState: checkout.payment_status };
  }
  // Belt and braces: the paid amount must match what we priced on the server.
  if (checkout.amount_total !== session.amountMinor || checkout.currency?.toLowerCase() !== session.currency.toLowerCase()) {
    console.error("[stripe] amount mismatch", { sessionId, paid: checkout.amount_total, expected: session.amountMinor });
    return { ok: false as const, error: "Payment amount mismatch — please contact us" };
  }

  const rawPayload = JSON.parse(session.payload) as { userId?: string };
  const payload = parseCheckoutPayload(rawPayload);
  if (!payload) {
    return { ok: false as const, error: "Invalid session payload" };
  }

  const userId =
    typeof rawPayload.userId === "string" && rawPayload.userId.trim()
      ? rawPayload.userId.trim()
      : undefined;

  // The webhook and the success page can arrive at the same moment: lock the payment row so
  // only one of them creates the booking.
  const { updated, bookingId, isNewBooking } = await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM payment_sessions WHERE id = ${sessionId} FOR UPDATE`;
    const locked = await tx.paymentSession.findUniqueOrThrow({ where: { id: sessionId } });

    let bookingId = locked.bookingId;
    let isNewBooking = false;
    if (!bookingId) {
      const booking = await createBookingFromCheckout(payload, userId, tx);
      bookingId = booking.id;
      isNewBooking = true;
    }

    const updated = await tx.paymentSession.update({
      where: { id: sessionId },
      data: { status: "COMPLETED", bookingId },
    });
    return { updated, bookingId, isNewBooking };
  });

  // Send confirmation email for new bookings only (idempotent)
  if (isNewBooking && process.env.RESEND_API_KEY) {
    const { quote, pricing, customer } = payload;
    const name = `${customer.firstName} ${customer.lastName}`.trim();
    let dateFormatted = quote.dateStr;
    try { dateFormatted = format(new Date(quote.dateStr), "dd MMMM yyyy"); } catch { /* keep raw */ }

    sendBookingConfirmationEmail({
      customerName: name,
      customerEmail: customer.email,
      bookingId,
      pickup: quote.pickup,
      dropoff: quote.dropoff,
      date: dateFormatted,
      time: quote.time,
      passengers: quote.passengers,
      luggage: quote.handcarry + quote.suitcase,
      vehicleType: pricing.vehicleName,
      fare: pricing.totalPrice,
      flightNumber: quote.flight || null,
      meetGreet: pricing.meetFee > 0,
    }).catch((err) => console.error("[email] booking confirmation failed:", err));
  }

  return { ok: true as const, session: updated, alreadyDone: false };
}
