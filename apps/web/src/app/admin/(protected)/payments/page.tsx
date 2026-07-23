export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";

const statusColors: Record<string, string> = {
  COMPLETED: "bg-emerald-500/15 text-emerald-500",
  PENDING:   "bg-amber-500/15 text-amber-500",
  FAILED:    "bg-red-500/15 text-red-500",
  CANCELLED: "bg-gray-500/15 text-gray-400",
};

export default async function PaymentsPage() {
  const payments = await prisma.paymentSession.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((s, p) => s + p.amountMinor / 100, 0);

  const counts = {
    COMPLETED: payments.filter((p) => p.status === "COMPLETED").length,
    PENDING:   payments.filter((p) => p.status === "PENDING").length,
    FAILED:    payments.filter((p) => p.status === "FAILED").length,
    CANCELLED: payments.filter((p) => p.status === "CANCELLED").length,
  };

  return (
    <>
      <AdminTopbar title="Payments" />
      <AdminPageContent>
        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[
            { label: "Total Revenue", value: `£${totalRevenue.toFixed(2)}`, color: "#10B981" },
            { label: "Completed",     value: counts.COMPLETED,              color: "#10B981" },
            { label: "Pending",       value: counts.PENDING,                color: "#F59E0B" },
            { label: "Failed",        value: counts.FAILED,                 color: "#EF4444" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border p-5"
              style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>
                {s.label}
              </p>
              <p className="mt-1 text-2xl font-bold" style={{ color: s.color }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--adm-border)" }}>
                {["Session ID", "Revolut Order", "Booking ID", "Amount", "Currency", "Status", "Created"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>
                    No payment sessions yet
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--adm-border-soft)" }}>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs" style={{ color: "var(--adm-text-muted)" }}>
                        {p.id.slice(0, 12)}…
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs" style={{ color: "var(--adm-text-sub)" }}>
                        {p.revolutOrderId ? `${p.revolutOrderId.slice(0, 14)}…` : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs" style={{ color: "var(--adm-text-sub)" }}>
                        {p.bookingId ? `${p.bookingId.slice(0, 12)}…` : <span style={{ color: "var(--adm-text-muted)" }}>—</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--adm-text)" }}>
                      £{(p.amountMinor / 100).toFixed(2)}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--adm-text-sub)" }}>
                      {p.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusColors[p.status] ?? statusColors.PENDING}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--adm-text-muted)" }}>
                      {p.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      {" "}
                      {p.createdAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminPageContent>
    </>
  );
}
