import Link from "next/link";

const nav = [
  {
    label: "Airport Transfers",
    href: "/airport-transfers",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Help & Support",
    href: "/help-and-support",
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 ukride-glass-nav">
      <div className="border-b border-white/[0.06] bg-primary/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-highlight/80 shadow-[0_0_8px_hsl(var(--highlight)/0.5)]" />
              24/7 bookings
            </span>
            <span className="hidden sm:inline">Google 4.9 ★ (1500+ reviews)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <a
              className="rounded-full border border-white/15 bg-foreground/5 px-3 py-1.5 font-semibold text-foreground transition-all duration-300 hover:border-highlight/40 hover:bg-highlight/10"
              href="tel:+447700140900"
            >
              +44 7700 1409 00
            </a>
            <a
              className="hidden rounded-full border border-white/15 bg-foreground/5 px-3 py-1.5 font-semibold text-foreground transition-all duration-300 hover:border-highlight/40 hover:bg-highlight/10 sm:inline-flex"
              href="tel:+442080509014"
            >
              +44 2080 5090 14
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-card text-sm font-extrabold text-foreground shadow-inner">
            UR
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-foreground">UKride</div>
            <div className="text-xs text-muted-foreground">London taxi services</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-highlight"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:bg-foreground/[0.06] hover:text-foreground sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/#quote"
            className="inline-flex items-center justify-center rounded-full border border-highlight/35 bg-accent px-4 py-2 text-sm font-extrabold text-accent-foreground shadow-[0_4px_24px_-6px_rgba(192,192,192,0.35)] transition-all duration-300 hover:brightness-[1.04]"
          >
            Get a quote
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-foreground/[0.04] px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:border-highlight/30 hover:text-highlight"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
