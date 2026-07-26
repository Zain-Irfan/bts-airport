export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { CalendarCheck, CarFront, Users, MessageSquare, TrendingUp, Clock } from "lucide-react";

export default async function AdminDashboardPage() {
  const [bookingCount, driverCount, userCount, contactCount, pendingDrivers, recentBookings] =
    await Promise.all([
      prisma.booking.count(),
      prisma.driver.count(),
      prisma.user.count(),
      prisma.contact.count(),
      prisma.driver.count({ where: { status: "PENDING" } }),
      prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Total Bookings", value: bookingCount, icon: CalendarCheck, color: "#999999" },
    { label: "Driver Applications", value: driverCount, icon: CarFront, color: "#3B82F6" },
    { label: "Users", value: userCount, icon: Users, color: "#10B981" },
    { label: "Messages", value: contactCount, icon: MessageSquare, color: "#F59E0B" },
  ];

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <AdminPageContent>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border p-5 transition-all duration-300"
                style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>
                      {s.label}
                    </p>
                    <p className="mt-1 text-3xl font-bold" style={{ color: "var(--adm-text)" }}>{s.value}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}18` }}>
                    <Icon className="h-5 w-5" style={{ color: s.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border p-5" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-zinc-500" />
              <h3 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Pending Driver Applications</h3>
            </div>
            <p className="text-4xl font-bold" style={{ color: "var(--adm-text)" }}>{pendingDrivers}</p>
            <p className="mt-1 text-xs" style={{ color: "var(--adm-text-muted)" }}>Awaiting your review</p>
          </div>

          <div className="rounded-xl border p-5" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-zinc-500" />
              <h3 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Recent Bookings</h3>
            </div>
            {recentBookings.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--adm-text-muted)" }}>No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                    style={{ background: "var(--adm-surface-2)", borderColor: "var(--adm-border-soft)" }}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium" style={{ color: "var(--adm-text)" }}>{b.customerName}</p>
                      <p className="truncate text-xs" style={{ color: "var(--adm-text-muted)" }}>{b.pickup} → {b.dropoff}</p>
                    </div>
                    <span className={`ml-3 flex-none rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      b.status === "CONFIRMED" ? "bg-emerald-500/15 text-emerald-500"
                        : b.status === "CANCELLED" ? "bg-red-500/15 text-red-500"
                        : b.status === "COMPLETED" ? "bg-blue-500/15 text-blue-500"
                        : "bg-amber-500/15 text-amber-500"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminPageContent>
    </>
  );
}
