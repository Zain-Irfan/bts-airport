import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { authCustomer } from "@/lib/auth";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MyBookingsPage() {
  const session = await authCustomer();
  if (!session?.user?.email) {
    return null;
  }

  const email = session.user.email.toLowerCase();
  const userId = session.user.id;

  const bookings = await prisma.booking.findMany({
    where: {
      OR: [{ userId }, { customerEmail: email }],
    },
    orderBy: { date: "desc" },
    take: 50,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main className="BTS-hero-ambient relative py-12 md:py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#F8F8F8]">My bookings</h1>
            <p className="mt-2 text-sm text-[#A5A7AA]">
              Signed in as {session.user.email}
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="BTS-card p-8 text-center">
              <p className="text-[#D1D5DB]">You have no bookings yet.</p>
              <Link
                href="/#quote"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-[rgba(192,192,192,0.25)] bg-[linear-gradient(135deg,#404040_0%,#333333_55%,#262626_100%)] px-6 text-sm font-bold text-[#F8F8F8]"
              >
                Book a transfer
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="BTS-card overflow-hidden p-5 transition hover:border-[rgba(192,192,192,0.2)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#A5A7AA]">
                        Ref {b.id}
                      </p>
                      <p className="mt-1 text-lg font-bold text-[#F8F8F8]">
                        {b.vehicleType ?? "Transfer"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        b.status === "CONFIRMED"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : b.status === "CANCELLED"
                            ? "bg-red-500/15 text-red-300"
                            : "bg-amber-500/15 text-amber-200"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-[#C0C0C0]">
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                      <span>
                        {b.pickup} → {b.dropoff}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0 text-[#A5A7AA]" />
                      {format(b.date, "dd MMM yyyy")} at {b.time}
                      {b.passengers ? ` · ${b.passengers} passenger(s)` : ""}
                    </p>
                    {b.fare != null && (
                      <p className="font-semibold text-[#F8F8F8]">
                        £{Number(b.fare).toFixed(2)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-[#C0C0C0] hover:text-[#F8F8F8]"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}
