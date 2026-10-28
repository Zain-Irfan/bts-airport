"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const inputClass =
  "form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition";

export function CustomerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account/bookings";
  const registered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("customer", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <>
    {loading && (
      <>
        <div className="fixed inset-0 z-[9998] bg-navy-deep/70 backdrop-blur-[6px]" />
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute rounded-full border border-gold/50" style={{ width: 110, height: 110, animation: "rl-pulse 2s ease-in-out infinite" }} />
            <div className="absolute rounded-full" style={{ width: 90, height: 90, border: "2px solid transparent", borderTopColor: "#F5B21B", borderRightColor: "rgba(153, 153, 153,0.3)", animation: "rl-spin 1s linear infinite", filter: "drop-shadow(0 0 8px rgba(153, 153, 153,0.6))" }} />
            <div className="absolute rounded-full" style={{ width: 70, height: 70, border: "1.5px solid transparent", borderBottomColor: "#F9C543", borderLeftColor: "rgba(220,192,122,0.25)", animation: "rl-spin-reverse 1.5s linear infinite" }} />
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
              <img src="/assets/logo-mrm.png" alt="MRM Executive Voyage" className="h-12 w-12 object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: "#F5B21B", animation: "rl-dot 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes rl-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes rl-spin-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
          @keyframes rl-pulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.1); opacity: 0.8; } }
          @keyframes rl-dot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1.2); opacity: 1; } }
        `}</style>
      </>
    )}
    <form onSubmit={handleSubmit} className="space-y-4">
      {registered ? (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Account created. Sign in with your email and password.
        </div>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <Field label="Email">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className={inputClass}
        />
      </Field>
      <Field label="Password">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </Field>
      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl border border-gold bg-gold hover:bg-gold-hover text-sm font-bold tracking-wide text-gold-foreground shadow-sm transition-all duration-300 hover:-translate-y-px disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-gold-ink transition-colors hover:text-foreground"
          >
            Sign up
          </Link>
        </p>
        <Link
          href="/forgot-password"
          className="font-semibold text-gold-ink transition-colors hover:text-foreground"
        >
          Forgot password?
        </Link>
      </div>
    </form>
    </>
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
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
