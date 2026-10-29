"use client";

import { useState } from "react";
import { Save, MessageCircle, Mail, Phone, CreditCard } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

type StripeStatus = {
  mode: "test" | "live" | "none";
  maskedKey: string | null;
  webhookConfigured: boolean;
};

export function SettingsClient({
  initial,
  stripe,
}: {
  initial: Record<string, string>;
  stripe: StripeStatus;
}) {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";

  const inputBg     = isLight ? "#FFFFFF" : "#071427";
  const inputBorder = isLight ? "#D1D5DB" : "rgba(192,192,192,0.18)";
  const inputColor  = isLight ? "#111827" : "#F8F8F8";
  const labelColor  = isLight ? "#6B7280" : "#A5A7AA";

  const [whatsapp,    setWhatsapp]    = useState(initial["whatsapp_number"]   ?? "447700140900");
  const [phone,       setPhone]       = useState(initial["contact_phone"]     ?? "+44 2080 5090 14");
  const [email,       setEmail]       = useState(initial["contact_email"]     ?? "support@BTS.uk");
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        whatsapp_number:    whatsapp,
        contact_phone:      phone,
        contact_email:      email,
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

      {/* Call / Phone number */}
      <div className="rounded-xl border p-6 space-y-4" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" style={{ color: "var(--adm-accent-ink)" }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Call / Phone Number</h2>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: labelColor }}>
            Phone number (as you want it displayed)
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+44 2080 5090 14"
            className="h-10 w-full rounded-lg border px-3 text-sm outline-none font-mono"
            style={{ background: inputBg, borderColor: inputBorder, color: inputColor }}
          />
          <p className="mt-1.5 text-xs" style={{ color: labelColor }}>
            Used in: footer &ldquo;Support&rdquo; line, homepage phone card, help &amp; support page — as the clickable call (tel:) number
          </p>
        </div>
        <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--adm-surface-2)", color: labelColor }}>
          Preview: <span className="font-mono" style={{ color: "var(--adm-text-sub)" }}>tel:{phone.replace(/[^\d+]/g, "")}</span>
        </div>
      </div>

      {/* Email */}
      <div className="rounded-xl border p-6 space-y-4" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" style={{ color: "var(--adm-accent-ink)" }} />
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

      {/* Stripe (read-only: keys are set as server env vars) */}
      <div className="rounded-xl border p-6 space-y-4" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" style={{ color: "var(--adm-accent-ink)" }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Stripe Payments</h2>
        </div>
        <div className="rounded-lg px-3 py-2 text-xs space-y-1.5" style={{ background: "var(--adm-surface-2)", color: labelColor }}>
          <div>
            Status:{" "}
            {stripe.mode === "live" && <span className="font-semibold text-emerald-500">Live — taking real payments</span>}
            {stripe.mode === "test" && <span className="font-semibold text-amber-500">Test mode — no real money is taken</span>}
            {stripe.mode === "none" && <span className="font-semibold text-red-400">Not configured — customers can&apos;t pay online</span>}
          </div>
          {stripe.maskedKey && (
            <div>
              Secret key: <span className="font-mono" style={{ color: "var(--adm-text-sub)" }}>{stripe.maskedKey}</span>
            </div>
          )}
          <div>
            Webhook:{" "}
            {stripe.webhookConfigured ? (
              <span className="font-semibold text-emerald-500">Connected ✓</span>
            ) : (
              <span className="font-semibold text-amber-500">Not set — bookings are still created on the success page</span>
            )}
          </div>
        </div>
        <p className="text-xs" style={{ color: labelColor }}>
          Keys are set on the server as <span className="font-mono">STRIPE_SECRET_KEY</span> and{" "}
          <span className="font-mono">STRIPE_WEBHOOK_SECRET</span> (Stripe Dashboard → Developers). They are never shown in full here.
        </p>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-[#0B1F3A] transition hover:brightness-95 disabled:opacity-50"
        style={{ background: "#F5B21B" }}
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving…" : saved ? "✓ Saved" : "Save Settings"}
      </button>
    </div>
  );
}
