import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BookingSummaryClient } from "@/components/booking/BookingSummaryClient";

export const metadata: Metadata = {
  title: "Booking Summary",
  robots: { index: false, follow: false },
};

function Fallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-muted text-muted-foreground">
      <Loader2 className="h-10 w-10 animate-spin" aria-hidden />
    </div>
  );
}

export default function BookingSummaryPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <BookingSummaryClient />
    </Suspense>
  );
}
