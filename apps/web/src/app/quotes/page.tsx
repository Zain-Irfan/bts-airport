import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { QuotesPageClient } from "@/components/quotes/QuotesPageClient";

export const metadata: Metadata = {
  title: "Your Quotes",
  robots: { index: false, follow: false },
};

function QuotesFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background text-muted-foreground">
      <Loader2 className="h-10 w-10 animate-spin" aria-hidden />
    </div>
  );
}

export default function QuotesPage() {
  return (
    <Suspense fallback={<QuotesFallback />}>
      <QuotesPageClient />
    </Suspense>
  );
}
