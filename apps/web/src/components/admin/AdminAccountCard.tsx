"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { KeyRound, UserCog } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

type Status = { type: "ok" | "err"; text: string } | null;

/** Change the signed-in admin's own login email / password (current password always required). */
export function AdminAccountCard({ currentEmail }: { currentEmail: string }) {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";

  const inputBg     = isLight ? "#FFFFFF" : "#071427";
  const inputBorder = isLight ? "#D1D5DB" : "rgba(192,192,192,0.18)";
  const inputColor  = isLight ? "#111827" : "#F8F8F8";
  const labelColor  = isLight ? "#6B7280" : "#A5A7AA";
  const inputStyle  = { background: inputBg, borderColor: inputBorder, color: inputColor };
  const inputClass  = "h-10 w-full rounded-lg border px-3 text-sm outline-none";
  const labelClass  = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em]";

  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState<Status>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<Status>(null);

  const [busy, setBusy] = useState<"email" | "password" | null>(null);

  async function submit(
    kind: "email" | "password",
    payload: Record<string, string>,
    setStatus: (s: Status) => void,
  ) {
    setBusy(kind);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ type: "err", text: data.error || "Could not save. Please try again." });
        return;
      }
      setStatus({ type: "ok", text: "Saved. Signing you out — log in again with your new details…" });
      // The session still carries the old details, so start a fresh one.
      setTimeout(() => signOut({ callbackUrl: "/admin/login" }), 1800);
    } catch {
      setStatus({ type: "err", text: "Network error. Please try again." });
    } finally {
      setBusy(null);
    }
  }

  function onChangeEmail(e: React.FormEvent) {
    e.preventDefault();
    if (newEmail.trim().toLowerCase() === currentEmail.toLowerCase()) {
      setEmailStatus({ type: "err", text: "That is already your email." });
      return;
    }
    void submit("email", { newEmail, currentPassword: emailPassword }, setEmailStatus);
  }

  function onChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "err", text: "The new passwords don't match." });
      return;
    }
    void submit("password", { newPassword, currentPassword }, setPasswordStatus);
  }

  const statusLine = (s: Status) =>
    s && (
      <p className={`text-xs font-medium ${s.type === "ok" ? "text-emerald-500" : "text-red-400"}`} role="status">
        {s.text}
      </p>
    );

  const button = (label: string, kind: "email" | "password") => (
    <button
      type="submit"
      disabled={busy !== null}
      className="rounded-xl px-5 py-2 text-sm font-semibold text-[#0B1F3A] transition hover:brightness-95 disabled:opacity-50"
      style={{ background: "#F5B21B" }}
    >
      {busy === kind ? "Saving…" : label}
    </button>
  );

  return (
    <div className="max-w-lg space-y-5">
      <h2 className="pt-4 text-base font-semibold" style={{ color: "var(--adm-text)" }}>Admin account</h2>

      {/* Login email */}
      <form
        onSubmit={onChangeEmail}
        className="rounded-xl border p-6 space-y-4"
        style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
      >
        <div className="flex items-center gap-2">
          <UserCog className="h-4 w-4" style={{ color: "var(--adm-accent-ink)" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Login email</h3>
        </div>
        <p className="text-xs" style={{ color: labelColor }}>
          Current: <span className="font-mono" style={{ color: "var(--adm-text-sub)" }}>{currentEmail}</span>
        </p>
        <div>
          <label htmlFor="adm-new-email" className={labelClass} style={{ color: labelColor }}>New email</label>
          <input
            id="adm-new-email"
            type="email"
            required
            autoComplete="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="adm-email-pw" className={labelClass} style={{ color: labelColor }}>Current password</label>
          <input
            id="adm-email-pw"
            type="password"
            required
            autoComplete="current-password"
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        {statusLine(emailStatus)}
        {button("Change email", "email")}
      </form>

      {/* Password */}
      <form
        onSubmit={onChangePassword}
        className="rounded-xl border p-6 space-y-4"
        style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
      >
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4" style={{ color: "var(--adm-accent-ink)" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Password</h3>
        </div>
        <div>
          <label htmlFor="adm-current-pw" className={labelClass} style={{ color: labelColor }}>Current password</label>
          <input
            id="adm-current-pw"
            type="password"
            required
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="adm-new-pw" className={labelClass} style={{ color: labelColor }}>New password</label>
          <input
            id="adm-new-pw"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
          <p className="mt-1.5 text-xs" style={{ color: labelColor }}>At least 8 characters.</p>
        </div>
        <div>
          <label htmlFor="adm-confirm-pw" className={labelClass} style={{ color: labelColor }}>Confirm new password</label>
          <input
            id="adm-confirm-pw"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        {statusLine(passwordStatus)}
        {button("Change password", "password")}
      </form>
    </div>
  );
}
