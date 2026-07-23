export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { DriverActions } from "@/components/admin/DriverActions";

export default async function DriversPage() {
  const drivers = await prisma.driver.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminTopbar title="Driver Applications" />
      <AdminPageContent>
        <p className="mb-4 text-sm sm:mb-6" style={{ color: "var(--adm-text-muted)" }}>
          {drivers.length} total application{drivers.length !== 1 ? "s" : ""}
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {drivers.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>
              No driver applications yet
            </p>
          ) : (
            drivers.map((d) => (
              <div
                key={d.id}
                className="rounded-xl border p-5"
                style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <Link href={`/admin/drivers/${d.id}`} className="font-semibold hover:underline" style={{ color: "var(--adm-text)" }}>{d.fullName}</Link>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    d.status === "APPROVED" ? "bg-emerald-500/15 text-emerald-500"
                      : d.status === "REJECTED" ? "bg-red-500/15 text-red-500"
                      : "bg-amber-500/15 text-amber-500"
                  }`}>
                    {d.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {[
                    ["Email", d.email],
                    ["Phone", d.phone],
                    ["License", d.licenseNumber],
                    ["Vehicle", `${d.vehicleType}${d.vehicleModel ? ` — ${d.vehicleModel}` : ""}`],
                    d.vehiclePlate ? ["Plate", d.vehiclePlate] : null,
                    d.experience ? ["Experience", d.experience] : null,
                  ].filter((x): x is string[] => x !== null).map(([label, val]) => (
                    <div key={label} className="flex justify-between gap-2">
                      <span style={{ color: "var(--adm-text-muted)" }}>{label}</span>
                      <span className="text-right" style={{ color: "var(--adm-text-sub)" }}>{val}</span>
                    </div>
                  ))}

                  {d.licenseImageUrl && (
                    <div className="mt-2 space-y-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--adm-text-muted)" }}>
                        Licence photo
                      </p>
                      <a
                        href={d.licenseImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden rounded-lg border"
                        style={{ borderColor: "var(--adm-border)" }}
                      >
                        <Image
                          src={d.licenseImageUrl}
                          alt={`Licence for ${d.fullName}`}
                          width={400}
                          height={240}
                          className="h-36 w-full object-cover"
                        />
                      </a>
                    </div>
                  )}
                </div>

                {d.reviewNotes && (
                  <p className="mt-3 rounded-lg px-3 py-2 text-xs" style={{ background: "var(--adm-surface-2)", color: "var(--adm-text-muted)" }}>
                    <span className="font-semibold" style={{ color: "var(--adm-text-sub)" }}>Note:</span> {d.reviewNotes}
                  </p>
                )}

                <DriverActions driverId={d.id} driverName={d.fullName} showApproveReject={d.status === "PENDING"} />
              </div>
            ))
          )}
        </div>
      </AdminPageContent>
    </>
  );
}
