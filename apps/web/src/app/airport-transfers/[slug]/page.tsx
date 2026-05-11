import Link from "next/link";

const airportBySlug: Record<
  string,
  { name: string; blurb: string; bullets: string[] }
> = {
  heathrow: {
    name: "Heathrow",
    blurb: "Premium pickups and drop-offs with meet & greet options and luggage-aware vehicle choices.",
    bullets: [
      "Terminal-aware pickup notes (coming with API)",
      "Flight number support for smoother coordination",
      "Comfort-first vehicles for business and family travel",
    ],
  },
  gatwick: {
    name: "Gatwick",
    blurb: "Pre-book Gatwick transfers with transparent estimates and reliable timings.",
    bullets: [
      "Fixed-style quoting UI (connect pricing next)",
      "Meet & greet options",
      "Return journeys supported in one booking",
    ],
  },
  luton: {
    name: "Luton",
    blurb: "Simple, clean booking for Luton airport transfers—ideal for early flights and late arrivals.",
    bullets: [
      "24/7 availability messaging",
      "Vehicle choices based on passengers + luggage",
      "Smooth booking experience across devices",
    ],
  },
  stansted: {
    name: "Stansted",
    blurb: "Comfortable Stansted transfers with a streamlined quote → booking flow.",
    bullets: [
      "Fast quote experience",
      "Clear trip details and add-ons",
      "Return trip toggle in the form",
    ],
  },
  "london-city": {
    name: "London City",
    blurb: "City Airport transfers designed for business schedules and tight turnaround times.",
    bullets: [
      "Executive-friendly positioning",
      "Meet & greet and flight details fields",
      "Short, clear booking steps",
    ],
  },
  southend: {
    name: "Southend",
    blurb: "Reliable Southend airport transfers with easy pre-booking and clear trip details.",
    bullets: [
      "Simple address-based pickup/dropoff",
      "Luggage configuration built-in",
      "Transparent quote UI",
    ],
  },
};

export default async function AirportTransferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const airport =
    airportBySlug[slug] ??
    ({
      name: "Airport",
      blurb: "Pre-book airport transfers across London with a modern booking experience.",
      bullets: [
        "Instant quote UI",
        "Meet & greet support",
        "Return journey option",
      ],
    } as const);

  return (
    <main className="flex-1 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Airport transfers
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {airport.name} Airport Transfers
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/65">
              {airport.blurb}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-extrabold text-black hover:brightness-95"
              >
                Get instant quote
              </Link>
              <Link
                href="/airport-transfers"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Back to airports
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {airport.bullets.map((b) => (
              <div
                key={b}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-sm font-semibold text-white/90">
                  Included
                </div>
                <div className="mt-2 text-sm leading-6 text-white/65">
                  {b}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-semibold text-white/90">Next step</div>
            <p className="mt-2 text-sm leading-6 text-white/65">
              When you’re ready, we’ll connect this website to your Laravel API
              for live pricing, booking creation, payments, and customer
              accounts.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

