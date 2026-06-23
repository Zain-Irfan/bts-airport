import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BookingSummaryClient } from "@/components/booking/BookingSummaryClient";

function Fallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#f3f4f6] text-gray-500">
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
