import Link from "next/link";
import { FullFooterSection } from "@/components/FullFooterSection";
import { MainNav } from "@/components/MainNav";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full ukride-glass-nav">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              UR
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">UKRide</span>
          </Link>
          <MainNav />
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:inline-flex min-h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex min-h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="py-14">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="rounded-2xl border border-white/[0.08] bg-card p-8 shadow-lg">
            <div className="mb-8 flex items-center justify-center gap-3">
              <StepCircle active>1</StepCircle>
              <div className="h-px w-10 bg-muted" />
              <StepCircle>2</StepCircle>
              <div className="h-px w-10 bg-muted" />
              <StepCircle>3</StepCircle>
            </div>

            <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl">
              Forgot Password
            </h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-[1.15rem]">
              Enter your email address to receive an OTP for password reset
            </p>

            <form className="mt-8 space-y-4">
              <label className="block space-y-2">
                <span className="text-base font-semibold text-foreground">
                  Enter your email address
                </span>
                <input
                  type="email"
                  placeholder="test@gmail.com"
                  className="form-field-light h-12 w-full rounded-lg px-4 text-base text-foreground outline-none transition md:text-lg"
                />
              </label>

              <button
                type="button"
                className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-xl font-semibold text-accent-foreground hover:bg-accent/90"
              >
                SEND OTP
              </button>
            </form>

            <div className="mt-12 text-center">
              <Link
                href="/login"
                className="text-xl font-medium text-muted-foreground hover:text-foreground"
              >
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
      className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
        active ? "bg-accent text-accent-foreground" : "bg-muted text-white"
      }`}
    >
      {children}
    </div>
  );
}

