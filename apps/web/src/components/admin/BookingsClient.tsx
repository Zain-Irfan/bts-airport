"use client";

import { useState, useMemo } from "react";
import { Download, Search, X } from "lucide-react";
import { BookingDetailModal } from "@/components/admin/BookingDetailModal";

type Driver = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  vehicleType: string;
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  function handleUpdated(updated: Booking) {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
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
          <a
            href="/api/admin/bookings/export"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition"
            style={{ borderColor: "var(--adm-border)", background: "var(--adm-surface)", color: "var(--adm-text)" }}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </a>
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
              {["Customer", "Pickup", "Dropoff", "Date", "Driver", "Status", "Fare"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>
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
      />
    </>
  );
}
