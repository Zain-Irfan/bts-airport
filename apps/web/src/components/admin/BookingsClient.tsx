"use client";

import { useState, useMemo } from "react";
import { Download, Search, X, Plus, Trash2 } from "lucide-react";
import { BookingDetailModal } from "@/components/admin/BookingDetailModal";
import { CreateBookingModal } from "@/components/admin/CreateBookingModal";

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

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-emerald-500/15 text-emerald-500",
  CANCELLED: "bg-red-500/15 text-red-500",
  COMPLETED: "bg-blue-500/15 text-blue-500",
  IN_PROGRESS: "bg-purple-500/15 text-purple-400",
  PENDING: "bg-amber-500/15 text-amber-500",
};

const ALL_STATUSES = ["PENDING","CONFIRMED","IN_PROGRESS","COMPLETED","CANCELLED"] as const;

export function BookingsClient({ bookings: initial, drivers }: { bookings: Booking[]; drivers: Driver[] }) {
  const [bookings, setBookings] = useState(initial);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const confirmDeleteBooking = bookings.find((b) => b.id === confirmDeleteId) ?? null;

  function handleUpdated(updated: Booking) {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  function handleDeleted(id: string) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  function handleCreated(booking: unknown) {
    setBookings((prev) => [booking as Booking, ...prev]);
  }

  async function handleDeleteConfirmed(id: string) {
    setDeleting(true);
    const res = await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok || res.status === 204) {
      handleDeleted(id);
    }
    setConfirmDeleteId(null);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return bookings.filter((b) => {
      const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
      const matchSearch = !q || [b.customerName, b.customerEmail, b.customerPhone, b.pickup, b.dropoff]
        .some((f) => f?.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [bookings, search, statusFilter]);

  return (
    <>
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm" style={{ color: "var(--adm-text-muted)" }}>
            {filtered.length} of {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <a
              href="/api/admin/bookings/export"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition"
              style={{ borderColor: "var(--adm-border)", background: "var(--adm-surface)", color: "var(--adm-text)" }}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </a>
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              style={{ background: "linear-gradient(135deg,#5B0F9C,#4B0082)" }}
            >
              <Plus className="h-4 w-4" />
              New Booking
            </button>
          </div>
        </div>
        {/* Search + filter row */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }} />
            <input
              type="text"
              placeholder="Search name, email, phone, address…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border pl-9 pr-9 text-sm outline-none"
              style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)", color: "var(--adm-text)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }}>
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border px-3 text-sm outline-none"
            style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)", color: "var(--adm-text)" }}
          >
            <option value="ALL">All statuses</option>
            {ALL_STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--adm-border)" }}>
              {["Customer", "Pickup", "Dropoff", "Date", "Driver", "Status", "Fare", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>
                  {bookings.length === 0 ? "No bookings yet" : "No bookings match your search"}
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr
                  key={b.id}
                  className="cursor-pointer transition"
                  style={{ borderBottom: "1px solid var(--adm-border-soft)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--adm-row-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  onClick={() => setSelected(b)}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium" style={{ color: "var(--adm-text)" }}>{b.customerName}</p>
                    <p className="text-xs" style={{ color: "var(--adm-text-muted)" }}>{b.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="truncate text-sm" style={{ color: "var(--adm-text-sub)" }}>{b.pickup}</p>
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="truncate text-sm" style={{ color: "var(--adm-text-sub)" }}>{b.dropoff}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--adm-text-sub)" }}>
                    {new Date(b.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    <span className="ml-1 text-xs" style={{ color: "var(--adm-text-muted)" }}>{b.time}</span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--adm-text-sub)" }}>
                    {b.assignedDriver ? b.assignedDriver.fullName : <span style={{ color: "var(--adm-text-muted)" }}>—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusColors[b.status] ?? statusColors.PENDING}`}>
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--adm-text-sub)" }}>
                    {b.fare ? `£${Number(b.fare).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setConfirmDeleteId(b.id)}
                      className="rounded p-1.5 transition hover:bg-red-500/10 hover:text-red-500"
                      style={{ color: "var(--adm-text-muted)" }}
                      title="Delete booking"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <BookingDetailModal
        booking={selected}
        drivers={drivers}
        onClose={() => setSelected(null)}
        onUpdated={handleUpdated}
        onDeleted={handleDeleted}
      />

      {creating && (
        <CreateBookingModal
          drivers={drivers}
          onCreated={handleCreated}
          onClose={() => setCreating(false)}
        />
      )}

      {/* Delete confirmation modal */}
      {confirmDeleteBooking && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl border p-6 shadow-2xl"
            style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              <h3 className="text-base font-bold" style={{ color: "var(--adm-text)" }}>Delete Booking</h3>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--adm-text-muted)" }}>
              Are you sure you want to delete the booking for{" "}
              <span className="font-semibold" style={{ color: "var(--adm-text)" }}>{confirmDeleteBooking.customerName}</span>?
              This cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:opacity-80"
                style={{ borderColor: "var(--adm-border)", background: "transparent", color: "var(--adm-text-sub)" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirmed(confirmDeleteBooking.id)}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                style={{ background: "#dc2626" }}
              >
                <Trash2 className="h-4 w-4" />
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
