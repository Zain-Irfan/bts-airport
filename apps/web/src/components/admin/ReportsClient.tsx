"use client";

import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

type MonthData = { month: string; label: string; revenue: number; count: number };
type StatusItem = { status: string; count: number };
type VehicleItem = { vehicle: string; count: number };
type Totals = { bookings: number; revenue: number; paymentRevenue: number; completed: number; cancelled: number };

type Props = {
  data: {
    monthly: MonthData[];
    statusBreakdown: StatusItem[];
    vehicleBreakdown: VehicleItem[];
    totals: Totals;
  };
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED:   "#10B981",
  COMPLETED:   "#3B82F6",
  PENDING:     "#F59E0B",
  CANCELLED:   "#EF4444",
  IN_PROGRESS: "#8B5CF6",
};

export function ReportsClient({ data }: Props) {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";
  const textMuted = isLight ? "#6B7280" : "#A5A7AA";
  const textSub   = isLight ? "#374151" : "#CFCFCF";
  const borderColor = isLight ? "#E5E7EB" : "rgba(192,192,192,0.1)";

  const maxRevenue = Math.max(...data.monthly.map((m) => m.revenue), 1);
  const maxCount   = Math.max(...data.monthly.map((m) => m.count), 1);
  const totalStatusCount = data.statusBreakdown.reduce((s, i) => s + i.count, 0);
  const totalVehicleCount = data.vehicleBreakdown.reduce((s, i) => s + i.count, 0);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        {[
          { label: "Total Bookings",    value: data.totals.bookings,                          color: "#999999" },
          { label: "Booking Revenue",   value: `£${data.totals.revenue.toFixed(2)}`,           color: "#10B981" },
          { label: "Payment Revenue",   value: `£${data.totals.paymentRevenue.toFixed(2)}`,    color: "#3B82F6" },
          { label: "Completed",         value: data.totals.completed,                          color: "#10B981" },
          { label: "Cancelled",         value: data.totals.cancelled,                          color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border p-5" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: textMuted }}>{s.label}</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Monthly bar chart — bookings */}
      <div className="rounded-xl border p-6" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <h3 className="mb-5 text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Monthly Bookings (last 12 months)</h3>
        <div className="flex items-end gap-1.5 h-40">
          {data.monthly.map((m) => {
            const h = Math.round((m.count / maxCount) * 100);
            return (
              <div key={m.month} className="group flex flex-1 flex-col items-center gap-1">
                <div className="relative flex flex-1 w-full items-end justify-center">
                  <div
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      height: `${Math.max(h, 2)}%`,
                      background: "linear-gradient(180deg,#7C3AED,#333333)",
                      opacity: m.count === 0 ? 0.25 : 1,
                    }}
                  />
                  {m.count > 0 && (
                    <span
                      className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "var(--adm-surface-2)", color: "var(--adm-text)", border: `1px solid ${borderColor}` }}
                    >
                      {m.count}
                    </span>
                  )}
                </div>
                <span className="text-[9px] rotate-0 truncate max-w-full" style={{ color: textMuted }}>{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly revenue chart */}
      <div className="rounded-xl border p-6" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <h3 className="mb-5 text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Monthly Revenue — £ (last 12 months)</h3>
        <div className="flex items-end gap-1.5 h-40">
          {data.monthly.map((m) => {
            const h = Math.round((m.revenue / maxRevenue) * 100);
            return (
              <div key={m.month} className="group flex flex-1 flex-col items-center gap-1">
                <div className="relative flex flex-1 w-full items-end justify-center">
                  <div
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      height: `${Math.max(h, 2)}%`,
                      background: "linear-gradient(180deg,#10B981,#065F46)",
                      opacity: m.revenue === 0 ? 0.25 : 1,
                    }}
                  />
                  {m.revenue > 0 && (
                    <span
                      className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                      style={{ background: "var(--adm-surface-2)", color: "var(--adm-text)", border: `1px solid ${borderColor}` }}
                    >
                      £{m.revenue.toFixed(0)}
                    </span>
                  )}
                </div>
                <span className="text-[9px] truncate max-w-full" style={{ color: textMuted }}>{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status breakdown */}
        <div className="rounded-xl border p-6" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
          <h3 className="mb-4 text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Booking Status Breakdown</h3>
          <div className="space-y-3">
            {data.statusBreakdown.sort((a, b) => b.count - a.count).map((s) => {
              const pct = totalStatusCount ? Math.round((s.count / totalStatusCount) * 100) : 0;
              return (
                <div key={s.status}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span style={{ color: textSub }}>{s.status.replace("_", " ")}</span>
                    <span style={{ color: textMuted }}>{s.count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full" style={{ background: "var(--adm-surface-2)" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: STATUS_COLORS[s.status] ?? "#6B7280" }}
                    />
                  </div>
                </div>
              );
            })}
            {data.statusBreakdown.length === 0 && (
              <p className="text-sm text-center py-4" style={{ color: textMuted }}>No data yet</p>
            )}
          </div>
        </div>

        {/* Vehicle breakdown */}
        <div className="rounded-xl border p-6" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
          <h3 className="mb-4 text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Most Booked Vehicles</h3>
          <div className="space-y-3">
            {data.vehicleBreakdown.map((v, i) => {
              const pct = totalVehicleCount ? Math.round((v.count / totalVehicleCount) * 100) : 0;
              const colors = ["#999999","#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6","#EC4899","#14B8A6"];
              return (
                <div key={v.vehicle}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span style={{ color: textSub }}>{v.vehicle}</span>
                    <span style={{ color: textMuted }}>{v.count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full" style={{ background: "var(--adm-surface-2)" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: colors[i % colors.length] }}
                    />
                  </div>
                </div>
              );
            })}
            {data.vehicleBreakdown.length === 0 && (
              <p className="text-sm text-center py-4" style={{ color: textMuted }}>No data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
