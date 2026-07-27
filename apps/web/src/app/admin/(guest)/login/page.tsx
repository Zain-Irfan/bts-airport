"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("admin", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: "linear-gradient(135deg,#F5F5F5 0%,#EEEEEE 50%,#F3F4F6 100%)" }}>
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Image src="/assets/logo.jpeg" alt="London Airport Taxi Services Logo" width={200} height={200} className="mx-auto mb-4 h-20 w-20 rounded-2xl object-contain" priority />
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#111827" }}>Admin Panel</h1>
          <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>Sign in to manage your platform</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-6 shadow-[0_8px_40px_-12px_rgba(51, 51, 51,0.15)] sm:p-8"
          style={{ background: "#FFFFFF", borderColor: "#E5E7EB" }}
        >
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#6B7280" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bts.com"
                required
                className="h-11 w-full rounded-lg border px-3 text-sm outline-none transition"
                style={{ background: "#F9FAFB", borderColor: "#D1D5DB", color: "#111827" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(51, 51, 51,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(51, 51, 51,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#6B7280" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-11 w-full rounded-lg border px-3 text-sm outline-none transition"
                style={{ background: "#F9FAFB", borderColor: "#D1D5DB", color: "#111827" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(51, 51, 51,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(51, 51, 51,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:brightness-110 hover:-translate-y-px disabled:pointer-events-none disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#404040 0%,#333333 55%,#262626 100%)", boxShadow: "0 8px 24px -8px rgba(51, 51, 51,0.45)" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
