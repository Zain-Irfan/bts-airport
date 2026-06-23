import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { DriverActions } from "@/components/admin/DriverActions";
import { ArrowLeft, Mail, Phone, Car, MapPin, Calendar, FileText } from "lucide-react";

export default async function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const driver = await prisma.driver.findUnique({
    where: { id },
    include: {
      bookings: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, customerName: true, pickup: true, dropoff: true, date: true, status: true, fare: true },
      },
    },
  });

  if (!driver) notFound();

  const statusColor =
    driver.status === "APPROVED" ? "bg-emerald-500/15 text-emerald-500"
    : driver.status === "REJECTED" ? "bg-red-500/15 text-red-500"
    : "bg-amber-500/15 text-amber-500";

  const bookingStatusColors: Record<string, string> = {
    CONFIRMED: "bg-emerald-500/15 text-emerald-500",
    CANCELLED: "bg-red-500/15 text-red-500",
    COMPLETED: "bg-blue-500/15 text-blue-500",
    IN_PROGRESS: "bg-purple-500/15 text-purple-400",
    PENDING: "bg-amber-500/15 text-amber-500",
  };

  return (
    <>
      <AdminTopbar
        title="Driver Profile"
        left={
          <Link
            href="/admin/drivers"
            className="mr-3 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
            style={{ borderColor: "var(--adm-border)", color: "var(--adm-text-muted)", background: "var(--adm-surface)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        }
      />
      <AdminPageContent>
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left column — driver info */}
          <div className="space-y-5 lg:col-span-1">
            {/* Header card */}
            <div className="rounded-xl border p-6 text-center" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
                style={{ background: "var(--adm-surface-2)", color: "var(--adm-text)", border: "2px solid var(--adm-border)" }}>
                {driver.fullName.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg font-bold" style={{ color: "var(--adm-text)" }}>{driver.fullName}</h2>
              <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase ${statusColor}`}>
                {driver.status}
              </span>
              <p className="mt-1 text-xs" style={{ color: "var(--adm-text-muted)" }}>
                Joined {driver.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </p>
            </div>

            {/* Contact */}
            <div className="rounded-xl border p-5 space-y-3" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--adm-text-muted)" }}>Contact</p>
              <a href={`mailto:${driver.email}`} className="flex items-center gap-2.5 text-sm transition hover:opacity-80" style={{ color: "var(--adm-text-sub)" }}>
                <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--adm-text-muted)" }} />
                {driver.email}
              </a>
              <a href={`tel:${driver.phone}`} className="flex items-center gap-2.5 text-sm transition hover:opacity-80" style={{ color: "var(--adm-text-sub)" }}>
                <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--adm-text-muted)" }} />
                {driver.phone}
              </a>
              {driver.address && (
                <div className="flex items-start gap-2.5 text-sm" style={{ color: "var(--adm-text-sub)" }}>
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--adm-text-muted)" }} />
                  <span className="whitespace-pre-wrap">{driver.address}</span>
                </div>
              )}
            </div>

            {/* Vehicle */}
            <div className="rounded-xl border p-5 space-y-2" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--adm-text-muted)" }}>Vehicle</p>
              {(
                [
                  ["Type",    driver.vehicleType],
                  ["Model",   driver.vehicleModel],
                  ["Plate",   driver.vehiclePlate],
                  ["Licence", driver.licenseNumber],
                  ["Exp.",    driver.experience],
                ] as [string, string | null | undefined][]
              ).filter(([, v]) => v).map(([label, val]) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <Car className="h-4 w-4 shrink-0" style={{ color: "var(--adm-text-muted)" }} />
                  <span className="w-16 shrink-0 text-xs" style={{ color: "var(--adm-text-muted)" }}>{label}</span>
                  <span style={{ color: "var(--adm-text-sub)" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Licence image */}
            {driver.licenseImageUrl && (
              <div className="rounded-xl border p-5" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--adm-text-muted)" }}>Licence Photo</p>
                {driver.licenseImageUrl.endsWith(".pdf") ? (
                  <a
                    href={driver.licenseImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-28 w-full items-center justify-center gap-3 rounded-lg border text-sm font-medium transition hover:opacity-80"
                    style={{ borderColor: "var(--adm-border)", color: "var(--adm-text)" }}
                  >
                    📄 View PDF licence document
                  </a>
                ) : (
                  <a href={driver.licenseImageUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border" style={{ borderColor: "var(--adm-border)" }}>
                    <Image src={driver.licenseImageUrl} alt="Licence" width={400} height={240} className="h-44 w-full object-cover" />
                  </a>
                )}
              </div>
            )}

            {/* Review notes */}
            {driver.reviewNotes && (
              <div className="rounded-xl border p-5" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <FileText className="h-4 w-4" style={{ color: "var(--adm-text-muted)" }} />
                  <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--adm-text-muted)" }}>Review Notes</p>
                </div>
                <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: "var(--adm-text-sub)" }}>{driver.reviewNotes}</p>
              </div>
            )}

            {/* Actions */}
            {driver.status === "PENDING" && (
              <div className="rounded-xl border p-5" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--adm-text-muted)" }}>Actions</p>
                <DriverActions driverId={driver.id} />
              </div>
            )}
          </div>

          {/* Right column — assigned bookings */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
              <div className="border-b px-5 py-4 flex items-center gap-2" style={{ borderColor: "var(--adm-border)" }}>
                <Calendar className="h-4 w-4" style={{ color: "var(--adm-text-muted)" }} />
                <h3 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Assigned Bookings</h3>
                <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold bg-purple-500/15 text-purple-400">
                  {driver.bookings.length}
                </span>
              </div>
              {driver.bookings.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>No bookings assigned yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left text-sm">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--adm-border)" }}>
                        {["Customer", "Route", "Date", "Fare", "Status"].map((h) => (
                          <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {driver.bookings.map((b) => (
                        <tr key={b.id} style={{ borderBottom: "1px solid var(--adm-border-soft)" }}>
                          <td className="px-4 py-3 font-medium text-sm" style={{ color: "var(--adm-text)" }}>{b.customerName}</td>
                          <td className="px-4 py-3 max-w-[200px]">
                            <p className="truncate text-xs" style={{ color: "var(--adm-text-sub)" }}>{b.pickup}</p>
                            <p className="truncate text-xs" style={{ color: "var(--adm-text-muted)" }}>{b.dropoff}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: "var(--adm-text-sub)" }}>
                            {new Date(b.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold" style={{ color: "var(--adm-text)" }}>
                            {b.fare ? `£${Number(b.fare).toFixed(2)}` : "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${bookingStatusColors[b.status] ?? bookingStatusColors.PENDING}`}>
                              {b.status.replace("_", " ")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminPageContent>
    </>
  );
}
