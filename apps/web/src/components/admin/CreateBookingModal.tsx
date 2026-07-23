"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Plus } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";
import { GooglePlacesInput } from "@/components/forms/GooglePlacesInput";

type Driver = {
  id: string;
  fullName: string;
  vehiclePlate: string | null;
};

type Props = {
  drivers: Driver[];
  onCreated: (booking: unknown) => void;
  onClose: () => void;
};

const STATUSES = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

export function CreateBookingModal({ drivers, onCreated, onClose }: Props) {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";

  const panelBg = isLight ? "#FFFFFF" : "#1E1E23";
  const panelBorder = isLight ? "#E5E7EB" : "rgba(192,192,192,0.12)";
  const textPrimary = isLight ? "#111827" : "#F8F8F8";
  const textMuted = isLight ? "#6B7280" : "#A5A7AA";
  const sectionBorder = isLight ? "#E5E7EB" : "rgba(192,192,192,0.08)";
  const inputBg = isLight ? "#FFFFFF" : "#0D0D0F";
  const inputBorder = isLight ? "#D1D5DB" : "rgba(192,192,192,0.12)";
  const textSub = isLight ? "#374151" : "#CFCFCF";

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    returnDate: "",
    returnTime: "",
    passengers: "1",
    luggage: "0",
    vehicleType: "",
    flightNumber: "",
    fare: "",
    notes: "",
    status: "CONFIRMED",
    assignedDriverId: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError("");
    setSaving(true);
    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        returnDate: isReturn && form.returnDate ? form.returnDate : null,
        returnTime: isReturn && form.returnTime ? form.returnTime : null,
      }),
    });
    setSaving(false);
    if (res.ok) {
      const booking = await res.json();
      onCreated(booking);
      onClose();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to create booking");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl border shadow-2xl flex flex-col"
        style={{ background: panelBg, borderColor: panelBorder, maxHeight: "calc(100vh - 2rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5" style={{ borderColor: sectionBorder }}>
          <h2 className="text-lg font-bold" style={{ color: textPrimary }}>Create Booking</h2>
          <button onClick={onClose} className="rounded-md p-1.5 transition hover:bg-black/10" style={{ color: textMuted }}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-500">{error}</p>
          )}

          {/* Customer */}
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>Customer</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="First & Last Name" value={form.customerName} onChange={(v) => set("customerName", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} required />
            <Field label="Email" type="email" value={form.customerEmail} onChange={(v) => set("customerEmail", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} required />
            <Field label="Phone" value={form.customerPhone} onChange={(v) => set("customerPhone", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} required />
          </div>

          {/* Journey */}
          <p className="text-[11px] font-semibold uppercase tracking-widest pt-2" style={{ color: textMuted }}>Journey</p>
          <div className="grid gap-3">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>Pickup Address <span className="text-red-400">*</span></label>
              <GooglePlacesInput
                value={form.pickup}
                onChange={(v) => set("pickup", v)}
                placeholder="Search pickup address…"
                className="h-10 w-full rounded-lg border px-3 text-sm outline-none text-gray-900 bg-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>Dropoff Address <span className="text-red-400">*</span></label>
              <GooglePlacesInput
                value={form.dropoff}
                onChange={(v) => set("dropoff", v)}
                placeholder="Search dropoff address…"
                className="h-10 w-full rounded-lg border px-3 text-sm outline-none text-gray-900 bg-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Date" type="date" value={form.date} onChange={(v) => set("date", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} required />
              <Field label="Time" type="time" value={form.time} onChange={(v) => set("time", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} required />
            </div>

            {/* Return journey toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isReturn}
                onChange={(e) => setIsReturn(e.target.checked)}
                className="h-4 w-4 rounded accent-purple-600"
              />
              <span className="text-sm font-medium" style={{ color: textPrimary }}>Return Journey</span>
            </label>

            {isReturn && (
              <div className="grid gap-3 sm:grid-cols-2 rounded-lg border p-3" style={{ borderColor: inputBorder }}>
                <Field label="Return Date" type="date" value={form.returnDate} onChange={(v) => set("returnDate", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} />
                <Field label="Return Time" type="time" value={form.returnTime} onChange={(v) => set("returnTime", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} />
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Passengers" type="number" value={form.passengers} onChange={(v) => set("passengers", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} />
              <Field label="Luggage" type="number" value={form.luggage} onChange={(v) => set("luggage", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} />
              <Field label="Fare (£)" type="number" value={form.fare} onChange={(v) => set("fare", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Vehicle Type" value={form.vehicleType} onChange={(v) => set("vehicleType", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} placeholder="e.g. Saloon" />
              <Field label="Flight Number" value={form.flightNumber} onChange={(v) => set("flightNumber", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} placeholder="e.g. BA123" />
            </div>
            <Field label="Notes" value={form.notes} onChange={(v) => set("notes", v)} inputBg={inputBg} inputBorder={inputBorder} textPrimary={textPrimary} textMuted={textMuted} placeholder="Optional notes" />
          </div>

          {/* Assignment */}
          <p className="text-[11px] font-semibold uppercase tracking-widest pt-2" style={{ color: textMuted }}>Assignment</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className="h-10 w-full rounded-lg border px-3 text-sm outline-none" style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }}>
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>Assign Driver</label>
              <select value={form.assignedDriverId} onChange={(e) => set("assignedDriverId", e.target.value)} className="h-10 w-full rounded-lg border px-3 text-sm outline-none" style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }}>
                <option value="">— Unassigned —</option>
                {drivers.map((d) => <option key={d.id} value={d.id}>{d.fullName}{d.vehiclePlate ? ` · ${d.vehiclePlate}` : ""}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-5" style={{ borderColor: sectionBorder }}>
          <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:opacity-80" style={{ borderColor: inputBorder, background: "transparent", color: textSub }}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50" style={{ background: "linear-gradient(135deg,#5B0F9C,#4B0082)" }}>
            <Plus className="h-4 w-4" />
            {saving ? "Creating…" : "Create Booking"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Field({ label, value, onChange, type = "text", inputBg, inputBorder, textPrimary, textMuted, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
  inputBg: string; inputBorder: string; textPrimary: string; textMuted: string;
  required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>
        {label}{required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border px-3 text-sm outline-none"
        style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }}
      />
    </div>
  );
}
