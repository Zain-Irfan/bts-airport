import Link from "next/link";
import { LogIn } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main className="ukride-hero-ambient relative py-16 md:py-24">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="mb-6 text-center">
            <p className="ukride-pill mx-auto">
              <LogIn className="h-3.5 w-3.5" />
              Welcome back
            </p>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Sign in to UKride
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#D1D5DB]">
              Continue booking and managing your journeys.
            </p>
          </div>

          <div className="ukride-card p-7">
            <form className="space-y-4">
              <Field label="Email">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </Field>
              <button
                type="button"
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl border border-[rgba(192,192,192,0.25)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] text-sm font-bold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_10px_32px_-10px_rgba(75,0,130,0.6)] transition-all duration-300 hover:-translate-y-px hover:border-[rgba(192,192,192,0.4)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),0_18px_44px_-12px_rgba(75,0,130,0.8),0_0_0_3px_rgba(75,0,130,0.18)]"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm text-[#A5A7AA]">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#C0C0C0] transition-colors hover:text-[#F8F8F8]"
                >
                  Sign up
                </Link>
              </p>
              <Link
                href="/forgot-password"
                className="font-semibold text-[#C0C0C0] transition-colors hover:text-[#F8F8F8]"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition";
