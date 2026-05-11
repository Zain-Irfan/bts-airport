import Link from "next/link";

const services = [
  {
    title: "A to B Taxi",
    desc: "Point-to-point travel anywhere in London with a clean booking flow.",
    href: "/services/a-to-b-taxi",
  },
  {
    title: "Business Taxi Services",
    desc: "Executive-friendly rides with flexible pickup notes and reliable timings.",
    href: "/services/business-taxi-services",
  },
  {
    title: "Dial a Cab",
    desc: "Fast quotes on any device, with luggage and passenger details included.",
    href: "/services/dial-a-cab",
  },
];

export default function ServicesPage() {
  return (
    <main className="flex-1 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Services
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Built for every London journey
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-white/65">
            The same booking engine supports airports, business travel, and
            point-to-point rides. We’re implementing the website first; API
            integration comes next.
          </p>
          <div className="pt-2">
            <Link
              href="/#quote"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-extrabold text-black hover:brightness-95"
            >
              Get instant quote
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <div className="text-base font-semibold text-white/90">
                {s.title}
              </div>
              <div className="mt-2 text-sm leading-6 text-white/65">
                {s.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

