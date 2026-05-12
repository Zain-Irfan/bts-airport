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
    <header className="ukride-glass-nav sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#4B0082_0%,#2A1238_100%)] text-sm font-extrabold tracking-tight text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_8px_24px_-8px_rgba(75,0,130,0.55)] transition-all duration-300 group-hover:border-[rgba(192,192,192,0.4)] group-hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),0_12px_32px_-8px_rgba(75,0,130,0.75)]">
            UR
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-[#F8F8F8]">
              UKride
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#A5A7AA]">
              London transfers
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-[#D1D5DB] transition-colors duration-300 hover:text-[#F8F8F8] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[linear-gradient(90deg,transparent,rgba(155,81,224,0.85),transparent)] after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#A5A7AA] transition-colors duration-300 hover:bg-[rgba(75,0,130,0.18)] hover:text-[#F8F8F8] sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/#quote"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(192,192,192,0.25)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] px-5 py-2 text-sm font-bold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_6px_22px_-6px_rgba(75,0,130,0.6)] transition-all duration-300 hover:-translate-y-px hover:border-[rgba(192,192,192,0.4)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),0_12px_32px_-8px_rgba(75,0,130,0.8),0_0_0_3px_rgba(75,0,130,0.18)]"
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
              className="rounded-full border border-[rgba(192,192,192,0.12)] bg-[rgba(13,13,15,0.45)] px-3 py-1.5 text-sm text-[#D1D5DB] transition-all duration-300 hover:border-[rgba(155,81,224,0.4)] hover:bg-[rgba(75,0,130,0.2)] hover:text-[#F8F8F8]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
