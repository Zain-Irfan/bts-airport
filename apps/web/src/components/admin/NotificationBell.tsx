"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Bell, X, MapPin, Clock } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";
import { createPortal } from "react-dom";

type NotifBooking = {
  id: string;
  customerName: string;
  pickup: string;
  dropoff: string;
  status: string;
  createdAt: string;
};

const LS_KEY = "bts_notif_dismissed_at";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function NotificationBell() {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";

  const [bookings, setBookings] = useState<NotifBooking[]>([]);
  const [open, setOpen] = useState(false);
  const [dismissedAt, setDismissedAt] = useState<Date>(() => {
    if (typeof window === "undefined") return new Date(0);
    const stored = localStorage.getItem(LS_KEY);
    return stored ? new Date(stored) : new Date(0);
  });

  const bellRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  const fetchNotifs = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      if (!res.ok) return;
      const data = await res.json() as { bookings: NotifBooking[] };
      setBookings(data.bookings ?? []);
    } catch { /* network error — ignore */ }
  }, []);

  useEffect(() => {
    fetchNotifs();
    const id = setInterval(fetchNotifs, 30_000);
    return () => clearInterval(id);
  }, [fetchNotifs]);

  // Position dropdown below the bell button
  useEffect(() => {
    if (!open || !bellRef.current) return;
    const rect = bellRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        dropRef.current && !dropRef.current.contains(e.target as Node) &&
        bellRef.current && !bellRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const unread = bookings.filter((b) => new Date(b.createdAt) > dismissedAt);
  const count = unread.length;
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? bookings : unread;

  function markAllRead() {
    const now = new Date();
    localStorage.setItem(LS_KEY, now.toISOString());
    setDismissedAt(now);
  }

  const textMuted = isLight ? "#6B7280" : "#A5A7AA";
  const btnBase = isLight
    ? "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
    : "border-[rgba(192,192,192,0.12)] text-[#A5A7AA] hover:bg-[rgba(192,192,192,0.08)] hover:text-[#F8F8F8]";
  const panelBg = isLight ? "#FFFFFF" : "#1E1E23";
  const panelBorder = isLight ? "#E5E7EB" : "rgba(192,192,192,0.12)";
  const itemHover = isLight ? "hover:bg-gray-50" : "hover:bg-white/5";
  const textPrimary = isLight ? "#111827" : "#F8F8F8";
  const textSub = isLight ? "#374151" : "#CFCFCF";
  const divider = isLight ? "#F3F4F6" : "rgba(192,192,192,0.08)";

  const statusColors: Record<string, string> = {
    CONFIRMED: "bg-emerald-500/15 text-emerald-500",
    CANCELLED: "bg-red-500/15 text-red-500",
    COMPLETED: "bg-blue-500/15 text-blue-500",
    IN_PROGRESS: "bg-zinc-500/15 text-zinc-400",
    PENDING: "bg-amber-500/15 text-amber-400",
  };

  return (
    <>
      <button
        ref={bellRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition ${btnBase}`}
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#999999] px-1 text-[10px] font-bold text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && createPortal(
        <div
          ref={dropRef}
          className="fixed z-[500] w-80 rounded-xl border shadow-2xl"
          style={{
            top: pos.top,
            right: pos.right,
            background: panelBg,
            borderColor: panelBorder,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: divider }}
          >
            <span className="text-sm font-semibold" style={{ color: textPrimary }}>
              Notifications
            </span>
            <div className="flex items-center gap-2">
              {bookings.length > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[11px] font-medium transition hover:opacity-70"
                  style={{ color: "#999999" }}
                >
                  Mark all read
                </button>
              )}
              <button onClick={() => setOpen(false)} style={{ color: textMuted }}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: divider }}>
            <button
              onClick={() => setShowAll(false)}
              className="flex-1 py-2 text-xs font-semibold transition"
              style={{ color: !showAll ? "#999999" : textMuted, borderBottom: !showAll ? "2px solid #999999" : "2px solid transparent" }}
            >
              Unread {count > 0 && `(${count})`}
            </button>
            <button
              onClick={() => setShowAll(true)}
              className="flex-1 py-2 text-xs font-semibold transition"
              style={{ color: showAll ? "#999999" : textMuted, borderBottom: showAll ? "2px solid #999999" : "2px solid transparent" }}
            >
              All
            </button>
          </div>

          {/* List */}
          <div className="max-h-[360px] overflow-y-auto">
            {displayed.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm" style={{ color: textMuted }}>
                {showAll ? "No recent bookings" : "You're all caught up ✓"}
              </div>
            ) : (
              displayed.map((b) => {
                const isNew = new Date(b.createdAt) > dismissedAt;
                return (
                  <div
                    key={b.id}
                    className={`relative px-4 py-3 border-b transition ${itemHover}`}
                    style={{ borderColor: divider }}
                  >
                    {isNew && (
                      <span className="absolute left-2 top-4 h-1.5 w-1.5 rounded-full bg-[#999999]" />
                    )}
                    <div className="pl-2">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold truncate" style={{ color: textPrimary }}>
                          {b.customerName}
                        </span>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[b.status] ?? statusColors.PENDING}`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="flex items-start gap-1 text-[11px] truncate" style={{ color: textMuted }}>
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                        {b.pickup} → {b.dropoff}
                      </p>
                      <p className="flex items-center gap-1 mt-0.5 text-[11px]" style={{ color: textMuted }}>
                        <Clock className="h-3 w-3 shrink-0" />
                        {timeAgo(b.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 text-center border-t" style={{ borderColor: divider }}>
            <a
              href="/admin/bookings"
              className="text-xs font-semibold transition hover:opacity-70"
              style={{ color: "#999999" }}
              onClick={() => setOpen(false)}
            >
              View all bookings →
            </a>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
