import Link from "next/link";

const airports = [
  { slug: "heathrow", name: "Heathrow" },
  { slug: "gatwick", name: "Gatwick" },
  { slug: "luton", name: "Luton" },
  { slug: "stansted", name: "Stansted" },
  { slug: "london-city", name: "London City" },
  { slug: "southend", name: "Southend" },
];

export default function AirportTransfersPage() {
  return (
    <main className="flex-1 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Airport transfers
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Pre-book a reliable airport transfer across London
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-white/65">
            Choose your airport to view transfer info and start a booking. (UI
            first—API connection comes next.)
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {airports.map((a) => (
            <Link
              key={a.slug}
              href={`/airport-transfers/${a.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:bg-white/8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-base font-semibold text-white/90">
                    {a.name} transfers
                  </div>
                  <div className="mt-1 text-sm text-white/65">
                    Instant quote • Meet & greet • Flight number
                  </div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-sm font-extrabold text-white/85 transition group-hover:bg-[var(--accent)] group-hover:text-black">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white/90">
            Popular features
          </div>
          <div className="mt-2 grid gap-3 text-sm text-white/65 md:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4">
              45-minute grace period for airport pickups
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              Luggage & passenger-based vehicle matching
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              24/7 availability and pre-book convenience
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

