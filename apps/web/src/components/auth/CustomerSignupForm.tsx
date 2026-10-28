"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { CustomerPhoneField } from "@/components/auth/CustomerPhoneField";
import { FormField } from "@/components/forms/FormField";

const inputClass =
  "form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition";

export function CustomerSignupForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error || "Could not create account");
        setLoading(false);
        return;
      }

      const signInRes = await signIn("customer", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        setLoading(false);
        router.push("/login?registered=1");
        return;
      }

      router.push("/account/bookings");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
            autoComplete="given-name"
            className={inputClass}
          />
        </FormField>
        <FormField label="Last name">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            required
            autoComplete="family-name"
            className={inputClass}
          />
        </FormField>
      </div>
      <FormField label="Email">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className={inputClass}
        />
      </FormField>
      <FormField label="Phone number">
        <CustomerPhoneField value={phone} onChange={setPhone} />
      </FormField>
      <FormField label="Password">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
      </FormField>
      <FormField label="Confirm password">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
      </FormField>
      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl border border-gold bg-gold hover:bg-gold-hover text-sm font-bold tracking-wide text-gold-foreground shadow-sm transition-all duration-300 hover:-translate-y-px disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-gold-ink transition-colors hover:text-foreground"
        >
          Log in
        </Link>
      </p>
    </form>
    </>
  );
}
