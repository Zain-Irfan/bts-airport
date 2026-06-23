import { parseCheckoutPayload } from "@/lib/checkout-payload";
import { createBookingFromCheckout } from "@/lib/create-booking-from-checkout";
import { prisma } from "@/lib/prisma";
import { retrieveRevolutOrder } from "@/lib/revolut";
import { sendBookingConfirmationEmail } from "@/lib/email";
import { format } from "date-fns";

const PAID_STATES = new Set(["completed", "authorised", "processing"]);

/** Idempotent: confirm payment session and create booking when Revolut order is paid. */
export async function fulfilPaymentSession(sessionId: string) {
  const session = await prisma.paymentSession.findUnique({ where: { id: sessionId } });
  if (!session) {
    return { ok: false as const, error: "Session not found" };
  }

  if (session.status === "COMPLETED" && session.bookingId) {
    return { ok: true as const, session, alreadyDone: true };
  }

  if (!session.revolutOrderId) {
    return { ok: false as const, error: "No Revolut order linked" };
  }

  const order = await retrieveRevolutOrder(session.revolutOrderId);
  const state = order.state?.toLowerCase() ?? "";

  if (!PAID_STATES.has(state)) {
    return { ok: false as const, error: "Payment not completed", orderState: state };
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

  let bookingId = session.bookingId;
  let isNewBooking = false;
  if (!bookingId) {
    const booking = await createBookingFromCheckout(payload, userId);
    bookingId = booking.id;
    isNewBooking = true;
  }

  const updated = await prisma.paymentSession.update({
    where: { id: sessionId },
    data: {
      status: "COMPLETED",
      bookingId,
    },
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
      meetGreet: quote.meet === "yes",
    }).catch((err) => console.error("[email] booking confirmation failed:", err));
  }

  return { ok: true as const, session: updated, alreadyDone: false };
}
