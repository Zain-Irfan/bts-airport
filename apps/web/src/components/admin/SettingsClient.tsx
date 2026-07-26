"use client";

import { useState } from "react";
import { Save, MessageCircle, Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

export function SettingsClient({
  initial,
  revolutActiveKey = "",
  revolutActiveSource = "none",
}: {
  initial: Record<string, string>;
  revolutActiveKey?: string;
  revolutActiveSource?: "db" | "env" | "none";
}) {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";

  const inputBg     = isLight ? "#FFFFFF" : "#0D0D0F";
  const inputBorder = isLight ? "#D1D5DB" : "rgba(192,192,192,0.18)";
  const inputColor  = isLight ? "#111827" : "#F8F8F8";
  const labelColor  = isLight ? "#6B7280" : "#A5A7AA";

  const [whatsapp,    setWhatsapp]    = useState(initial["whatsapp_number"]   ?? "447700140900");
  const [email,       setEmail]       = useState(initial["contact_email"]     ?? "support@BTS.uk");
  // Pre-fill with the DB value only (env var stays in .env — don't expose it in the input)
  const [revolutKey,  setRevolutKey]  = useState(initial["revolut_secret_key"] ?? "");
  const [showKey,     setShowKey]     = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        whatsapp_number:    whatsapp,
        contact_email:      email,
        revolut_secret_key: revolutKey,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-lg space-y-5">
      <p className="text-sm" style={{ color: labelColor }}>
        These values update across the entire site instantly — no redeployment needed.
      </p>

      {/* WhatsApp */}
      <div className="rounded-xl border p-6 space-y-4" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" style={{ color: "#25D366" }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>WhatsApp Number</h2>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: labelColor }}>
            Number (digits only, include country code)
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
            placeholder="447700140900"
            className="h-10 w-full rounded-lg border px-3 text-sm outline-none font-mono"
            style={{ background: inputBg, borderColor: inputBorder, color: inputColor }}
          />
          <p className="mt-1.5 text-xs" style={{ color: labelColor }}>
            Used in: WhatsApp floating button, all wa.me links site-wide
          </p>
        </div>
        <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--adm-surface-2)", color: labelColor }}>
          Preview: <span className="font-mono" style={{ color: "var(--adm-text-sub)" }}>https://wa.me/{whatsapp}</span>
        </div>
      </div>

      {/* Email */}
      <div className="rounded-xl border p-6 space-y-4" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" style={{ color: "#999999" }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Contact Email</h2>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: labelColor }}>
            Support / contact email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="support@BTS.uk"
            className="h-10 w-full rounded-lg border px-3 text-sm outline-none"
            style={{ background: inputBg, borderColor: inputBorder, color: inputColor }}
          />
          <p className="mt-1.5 text-xs" style={{ color: labelColor }}>
            Used in: footer email link, contact page
          </p>
        </div>
        <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--adm-surface-2)", color: labelColor }}>
          Preview: <span className="font-mono" style={{ color: "var(--adm-text-sub)" }}>mailto:{email}</span>
        </div>
      </div>

      {/* Revolut */}
      <div className="rounded-xl border p-6 space-y-4" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4" style={{ color: "#F59E0B" }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Revolut Secret Key</h2>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: labelColor }}>
            Merchant secret key
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={revolutKey}
              onChange={(e) => setRevolutKey(e.target.value.trim())}
              placeholder="sk_live_… or sk_sandbox_…"
              className="h-10 w-full rounded-lg border px-3 pr-10 text-sm outline-none font-mono"
              style={{ background: inputBg, borderColor: inputBorder, color: inputColor }}
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 transition hover:opacity-70"
              style={{ color: labelColor }}
              aria-label={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-1.5 text-xs" style={{ color: labelColor }}>
            Found in your Revolut merchant dashboard → API keys. DB value overrides the server env var.
          </p>
        </div>
        <div className="rounded-lg px-3 py-2 text-xs space-y-1" style={{ background: "var(--adm-surface-2)", color: labelColor }}>
          <div>
            Active source:{" "}
            {revolutActiveSource === "db" && (
              <span className="font-semibold text-emerald-500">Database (this field) ✓</span>
            )}
            {revolutActiveSource === "env" && (
              <span className="font-semibold text-amber-500">Server env var — override by saving a key here</span>
            )}
            {revolutActiveSource === "none" && (
              <span className="font-semibold text-red-400">Not configured — payments will fail</span>
            )}
          </div>
          {revolutActiveSource !== "none" && (
            <div>
              Active key:{" "}
              <span className="font-mono" style={{ color: "var(--adm-text-sub)" }}>
                {showKey
                  ? revolutActiveKey
                  : `${revolutActiveKey.slice(0, 10)}${"•".repeat(Math.min(24, Math.max(0, revolutActiveKey.length - 10)))}`
                }
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        style={{ background: "linear-gradient(135deg,#404040,#333333)" }}
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving…" : saved ? "✓ Saved" : "Save Settings"}
      </button>
    </div>
  );
}
