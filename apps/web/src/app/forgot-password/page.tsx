import Link from "next/link";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteTopHeader />

      <main className="BTS-hero-ambient BTS-section-onyx BTS-grid-bg relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="mb-8 text-center">
            <span className="BTS-pill">Account recovery</span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Forgot Password
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[#CFCFCF]">
              Enter your email address to receive a secure reset code.
            </p>
          </div>

          <div className="BTS-card p-8">
            <div className="mb-8 flex items-center justify-center gap-3">
              <StepCircle active>1</StepCircle>
              <div className="h-px w-10 bg-[rgba(192,192,192,0.18)]" />
              <StepCircle>2</StepCircle>
              <div className="h-px w-10 bg-[rgba(192,192,192,0.18)]" />
              <StepCircle>3</StepCircle>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]"
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
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] text-sm font-semibold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),inset_0_0_0_1px_rgba(75,0,130,0.4),0_10px_32px_-10px_rgba(75,0,130,0.55)] transition-all duration-500 hover:-translate-y-[1px] hover:border-[rgba(192,192,192,0.4)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),inset_0_0_0_1px_rgba(155,81,224,0.5),0_18px_48px_-10px_rgba(75,0,130,0.7),0_0_0_4px_rgba(75,0,130,0.18)]"
              >
                Send reset code
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-[#A5A7AA]">
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
          ? "grid h-11 w-11 place-items-center rounded-full border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] text-sm font-semibold text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.2),0_8px_24px_-8px_rgba(75,0,130,0.55)]"
          : "grid h-11 w-11 place-items-center rounded-full border border-[rgba(192,192,192,0.14)] bg-[rgba(13,13,15,0.6)] text-sm font-semibold text-[#A5A7AA]"
      }
    >
      {children}
    </div>
  );
}
