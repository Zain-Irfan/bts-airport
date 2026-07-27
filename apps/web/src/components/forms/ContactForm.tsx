"use client";

import { useState } from "react";

const inputClass =
  "form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error || "Could not send your message. Please try again.");
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-6 text-center"
        role="status"
      >
        <p className="text-sm font-semibold text-emerald-200">Message sent</p>
        <p className="mt-2 text-sm text-[#D1D5DB]">
          Thanks for contacting London Airport Taxi Services. We&apos;ll get back to you as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm font-semibold text-[#C0C0C0] underline-offset-2 hover:text-[#F8F8F8] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <Field label="Name">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
          minLength={2}
          autoComplete="name"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+44 7700 000 000"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Message">
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="How can we help?"
          required
          minLength={10}
          maxLength={5000}
          className="form-field-light min-h-[140px] w-full rounded-lg px-3 py-2.5 text-sm outline-none transition"
        />
      </Field>

      {/* Honeypot — hidden from users, bots often fill it */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[rgba(192,192,192,0.25)] bg-[linear-gradient(135deg,#404040_0%,#333333_55%,#262626_100%)] text-sm font-bold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_10px_32px_-10px_rgba(51, 51, 51,0.6)] transition-all duration-300 hover:-translate-y-px hover:border-[rgba(192,192,192,0.4)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),0_18px_44px_-12px_rgba(51, 51, 51,0.8),0_0_0_3px_rgba(51, 51, 51,0.18)] disabled:opacity-60"
      >
        {loading ? "Sending…" : "Submit"}
      </button>
    </form>
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
