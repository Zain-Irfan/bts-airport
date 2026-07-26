"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, User, MapPin, Calendar, Car, Phone, Mail, FileText, CheckCircle, Trash2 } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

type Driver = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  vehicleType: string | null;
  vehiclePlate: string | null;
};

type Booking = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  returnDate: string | null;
  returnTime: string | null;
  flightNumber: string | null;
  passengers: number;
  luggage: number;
  vehicleType: string | null;
  notes: string | null;
  fare: string | null;
  status: string;
  assignedDriverId: string | null;
  assignedDriver: Driver | null;
  createdAt: string;
};

type Props = {
  booking: Booking | null;
  drivers: Driver[];
  onClose: () => void;
  onUpdated: (b: Booking) => void;
  onDeleted: (id: string) => void;
};

const STATUSES = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

/** Parse notes string like "Meet & greet: yes\nHandcarry: 1, Suitcases: 1" into {label, value} pairs */
function parseNotes(raw: string): { label: string; value: string }[] {
  const result: { label: string; value: string }[] = [];
  // Split by newlines first, then by ", " only when followed by a known label pattern
  const lines = raw.split(/\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    // Split comma-separated pairs within a line: "Handcarry: 1, Suitcases: 1"
    // A "pair" is: text (possibly with & and spaces) followed by ": " and a value
    const pairRegex = /([A-Za-z &]+?):\s*([^,]+?)(?=,\s*[A-Za-z &]+:|$)/g;
    let match;
    let found = false;
    while ((match = pairRegex.exec(line)) !== null) {
      result.push({ label: match[1].trim(), value: match[2].trim() });
      found = true;
    }
    if (!found) {
      // Fallback: display the whole line as a note
      result.push({ label: "Note", value: line.trim() });
    }
  }
  return result;
}

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-emerald-500/15 text-emerald-500",
  CANCELLED: "bg-red-500/15 text-red-500",
  COMPLETED: "bg-blue-500/15 text-blue-500",
  IN_PROGRESS: "bg-zinc-500/15 text-zinc-400",
  PENDING: "bg-amber-500/15 text-amber-500",
};

export function BookingDetailModal({ booking, drivers, onClose, onUpdated, onDeleted }: Props) {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [status, setStatus] = useState(booking?.status ?? "PENDING");
  const [driverId, setDriverId] = useState(booking?.assignedDriverId ?? "");

  if (!booking) return null;

  const panelBg = isLight ? "#FFFFFF" : "#1E1E23";
  const panelBorder = isLight ? "#E5E7EB" : "rgba(192,192,192,0.12)";
  const textPrimary = isLight ? "#111827" : "#F8F8F8";
  const textMuted = isLight ? "#6B7280" : "#A5A7AA";
  const textSub = isLight ? "#374151" : "#CFCFCF";
  const sectionBg = isLight ? "#F9FAFB" : "rgba(255,255,255,0.03)";
  const sectionBorder = isLight ? "#E5E7EB" : "rgba(192,192,192,0.08)";
  const inputBg = isLight ? "#FFFFFF" : "#0D0D0F";
  const inputBorder = isLight ? "#D1D5DB" : "rgba(192,192,192,0.12)";

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch(`/api/admin/bookings/${booking!.id}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok || res.status === 204) {
      onDeleted(booking!.id);
      onClose();
    }
  }

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/admin/bookings/${booking!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, assignedDriverId: driverId || null }),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json();
      onUpdated(updated);
      onClose();
    }
  }

  const date = new Date(booking.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

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
        <div className="flex items-start justify-between border-b p-5" style={{ borderColor: sectionBorder }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: textMuted }}>Booking</p>
            <h2 className="text-lg font-bold" style={{ color: textPrimary }}>{booking.customerName}</h2>
            <p className="text-sm mt-0.5" style={{ color: textMuted }}>{booking.id}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 transition hover:bg-black/10" style={{ color: textMuted }}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Customer info */}
          <Section title="Customer" icon={<User className="h-4 w-4" />} bg={sectionBg} border={sectionBorder} textMuted={textMuted}>
            <Row label="Name" value={booking.customerName} textSub={textSub} textMuted={textMuted} />
            <Row label="Email" value={booking.customerEmail} textSub={textSub} textMuted={textMuted} icon={<Mail className="h-3.5 w-3.5" />} />
            <Row label="Phone" value={booking.customerPhone} textSub={textSub} textMuted={textMuted} icon={<Phone className="h-3.5 w-3.5" />} />
          </Section>

          {/* Journey info */}
          <Section title="Journey" icon={<MapPin className="h-4 w-4" />} bg={sectionBg} border={sectionBorder} textMuted={textMuted}>
            <Row label="Pickup" value={booking.pickup} textSub={textSub} textMuted={textMuted} />
            <Row label="Dropoff" value={booking.dropoff} textSub={textSub} textMuted={textMuted} />
            <Row label="Date" value={`${date} at ${booking.time}`} textSub={textSub} textMuted={textMuted} icon={<Calendar className="h-3.5 w-3.5" />} />
            {booking.returnDate && (
              <Row label="Return" value={`${new Date(booking.returnDate).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}${booking.returnTime ? ` at ${booking.returnTime}` : ""}`} textSub={textSub} textMuted={textMuted} icon={<Calendar className="h-3.5 w-3.5" />} />
            )}
            <Row label="Passengers" value={String(booking.passengers)} textSub={textSub} textMuted={textMuted} />
            <Row label="Luggage" value={String(booking.luggage)} textSub={textSub} textMuted={textMuted} />
            {booking.flightNumber && <Row label="Flight" value={booking.flightNumber} textSub={textSub} textMuted={textMuted} />}
            {booking.vehicleType && <Row label="Vehicle" value={booking.vehicleType} textSub={textSub} textMuted={textMuted} icon={<Car className="h-3.5 w-3.5" />} />}
            {booking.fare && <Row label="Fare" value={`£${Number(booking.fare).toFixed(2)}`} textSub={textSub} textMuted={textMuted} />}
          </Section>

          {/* Notes — parsed into structured rows */}
          {booking.notes && (
            <Section title="Extras & Notes" icon={<FileText className="h-4 w-4" />} bg={sectionBg} border={sectionBorder} textMuted={textMuted}>
              {parseNotes(booking.notes).map(({ label, value }, i) => (
                <Row key={i} label={label} value={value} textSub={textSub} textMuted={textMuted} />
              ))}
            </Section>
          )}

          {/* Status + Driver assignment */}
          <Section title="Manage" icon={<CheckCircle className="h-4 w-4" />} bg={sectionBg} border={sectionBorder} textMuted={textMuted}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-10 w-full rounded-lg border px-3 text-sm outline-none"
                  style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>Assign Driver</label>
                <select
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  className="h-10 w-full rounded-lg border px-3 text-sm outline-none"
                  style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }}
                >
                  <option value="">— Unassigned —</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName}{d.vehiclePlate ? ` · ${d.vehiclePlate}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current status badge */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs" style={{ color: textMuted }}>Current:</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusColors[booking.status] ?? statusColors.PENDING}`}>
                {booking.status.replace("_", " ")}
              </span>
              {booking.assignedDriver && (
                <span className="text-xs" style={{ color: textMuted }}>
                  · Driver: <span style={{ color: textSub }}>{booking.assignedDriver.fullName}</span>
                </span>
              )}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t p-5" style={{ borderColor: sectionBorder }}>
          {/* Delete */}
          {!confirmDelete ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition hover:opacity-80"
              style={{ borderColor: "rgba(239,68,68,0.4)", color: "#ef4444", background: "transparent" }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: textMuted }}>Sure?</span>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                style={{ background: "#dc2626" }}
              >
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:opacity-80"
                style={{ borderColor: inputBorder, background: "transparent", color: textSub }}
              >
                Cancel
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:opacity-80"
              style={{ borderColor: inputBorder, background: "transparent", color: textSub }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#404040,#333333)" }}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Section({ title, icon, bg, border, textMuted, children }: {
  title: string; icon: React.ReactNode; bg: string; border: string; textMuted: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-4" style={{ background: bg, borderColor: border }}>
      <div className="mb-3 flex items-center gap-1.5">
        <span style={{ color: textMuted }}>{icon}</span>
        <h3 className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: textMuted }}>{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value, textSub, textMuted, icon }: {
  label: string; value: string; textSub: string; textMuted: string; icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="w-24 shrink-0 text-xs" style={{ color: textMuted }}>{label}</span>
      <span className="flex items-center gap-1 flex-1" style={{ color: textSub }}>
        {icon && <span style={{ color: textMuted }}>{icon}</span>}
        {value}
      </span>
    </div>
  );
}
