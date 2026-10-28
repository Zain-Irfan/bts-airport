import type { Metadata } from "next";
import Link from "next/link";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export const metadata: Metadata = {
  title: "Reset Your Password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteTopHeader />

      <main className="BTS-hero-ambient BTS-section-onyx BTS-grid-bg relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="mb-8 text-center">
            <span className="BTS-pill">Account recovery</span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Forgot Password
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              Enter your email address to receive a secure reset code.
            </p>
          </div>

          <div className="BTS-card p-8">
            <div className="mb-8 flex items-center justify-center gap-3">
              <StepCircle active>1</StepCircle>
              <div className="h-px w-10 bg-border" />
              <StepCircle>2</StepCircle>
              <div className="h-px w-10 bg-border" />
              <StepCircle>3</StepCircle>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="form-field-light h-12 w-full rounded-lg px-4 text-sm outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-xl border border-gold bg-gold hover:bg-gold-hover text-sm font-semibold tracking-wide text-gold-foreground shadow-sm transition-all duration-500 hover:-translate-y-[1px] hover:border-gold-hover hover:shadow-md"
              >
                Send reset code
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <Link href="/login" className="BTS-link">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}

function StepCircle({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={
        active
          ? "grid h-11 w-11 place-items-center rounded-full border border-gold bg-gold hover:bg-gold-hover text-sm font-semibold text-gold-foreground shadow-sm"
          : "grid h-11 w-11 place-items-center rounded-full border border-border bg-input-bg text-sm font-semibold text-muted-foreground"
      }
    >
      {children}
    </div>
  );
}
