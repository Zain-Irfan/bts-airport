import { fulfilPaymentSession } from "@/lib/fulfil-payment-session";
import { prisma } from "@/lib/prisma";

export type PaymentSessionStatus = {
  sessionId: string;
  status: string;
  paid: boolean;
  bookingId: string | null;
  message?: string;
};

export async function getPaymentSessionStatus(
  sessionId: string,
): Promise<PaymentSessionStatus | { error: string; status: number }> {
  const session = await prisma.paymentSession.findUnique({ where: { id: sessionId } });
  if (!session) {
    return { error: "Session not found", status: 404 };
  }

  if (session.status !== "COMPLETED") {
    const result = await fulfilPaymentSession(sessionId);
    if (!result.ok) {
      return {
        sessionId,
        status: session.status,
        paid: false,
        bookingId: null,
        message: result.error,
      };
    }
  }

  const fresh = await prisma.paymentSession.findUnique({ where: { id: sessionId } });
  return {
    sessionId,
    status: fresh?.status ?? session.status,
    paid: fresh?.status === "COMPLETED",
    bookingId: fresh?.bookingId ?? null,
  };
}
