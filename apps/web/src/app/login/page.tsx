import type { Metadata } from "next";
import { Suspense } from "react";
import { LogIn } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { CustomerLoginForm } from "@/components/auth/CustomerLoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main className="BTS-hero-ambient BTS-auth-main relative py-16 md:py-24">
        <div className="mx-auto w-full max-w-md px-4" data-no-reveal-scope>
          <div className="mb-6 text-center">
            <p className="BTS-pill mx-auto">
              <LogIn className="h-3.5 w-3.5" />
              Welcome back
            </p>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Sign in to MRM Executive Voyage
            </h1>
            <p className="mt-3 text-sm leading-6 text-body">
              View your bookings or continue where you left off.
            </p>
          </div>

          <div className="BTS-card p-7">
            <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Loading…</p>}>
              <CustomerLoginForm />
            </Suspense>
          </div>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}
