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
    <header className="BTS-glass-nav sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-[linear-gradient(135deg,#333333_0%,#242424_100%)] text-sm font-extrabold tracking-tight text-foreground shadow-sm transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-md">
            LA
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-foreground whitespace-nowrap">
              MRM Executive Voyage
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Executive travel · 24/7
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-body transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:bg-gold/15 hover:text-foreground sm:inline-flex"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-border bg-input-bg px-3 py-1.5 text-sm text-body transition-all duration-300 hover:border-gold/50 hover:bg-gold/15 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
