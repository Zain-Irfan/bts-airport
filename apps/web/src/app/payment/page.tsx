import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { PaymentPageClient } from "@/components/booking/PaymentPageClient";

export const metadata: Metadata = {
  title: "Payment",
  robots: { index: false, follow: false },
};

function Fallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-muted text-muted-foreground">
      <Loader2 className="h-10 w-10 animate-spin" aria-hidden />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <PaymentPageClient />
    </Suspense>
  );
}
