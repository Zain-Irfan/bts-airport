import { PaymentSuccessClient } from "@/components/booking/PaymentSuccessClient";
import { getPaymentSessionStatus } from "@/lib/get-payment-session-status";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ sessionId: string }>;
};

export default async function PaymentSuccessBySessionPage({ params }: Props) {
  const { sessionId: raw } = await params;
  const sessionId = decodeURIComponent(raw).trim();

  if (!sessionId) {
    return (
      <PaymentSuccessClient
        sessionId=""
        initial={{
          paid: false,
          status: "missing",
          bookingId: null,
          message: "Missing payment session.",
        }}
      />
    );
  }

  const result = await getPaymentSessionStatus(sessionId);
  if ("error" in result) {
    return (
      <PaymentSuccessClient
        sessionId={sessionId}
        initial={{
          paid: false,
          status: "error",
          bookingId: null,
          message: result.error,
        }}
      />
    );
  }

  return <PaymentSuccessClient sessionId={sessionId} initial={result} />;
}
