import Link from "next/link";
import { FullFooterSection } from "@/components/FullFooterSection";
import { MainNav } from "@/components/MainNav";
import { SignupPhoneInput } from "@/components/auth/SignupPhoneInput";

export default function SignupPage() {
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
          <div className="rounded-2xl border border-white/[0.08] bg-card p-6 text-foreground shadow-lg">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Register to book rides faster and manage your journeys.
            </p>

            <form className="mt-6 space-y-4">
              <Field label="First Name">
                <input type="text" placeholder="First name" className={inputClass} />
              </Field>
              <Field label="Last Name">
                <input type="text" placeholder="Last name" className={inputClass} />
              </Field>
              <Field label="Email">
                <input type="email" placeholder="you@example.com" className={inputClass} />
              </Field>
              <Field label="Phone Number">
                <SignupPhoneInput />
              </Field>
              <Field label="Password">
                <input type="password" placeholder="••••••••" className={inputClass} />
              </Field>
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold hover:bg-accent/90"
              >
                Create account
              </button>
            </form>

            <p className="mt-5 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-highlight hover:underline">
                Log in
              </Link>
            </p>
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
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition";

