import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050817] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="text-sm font-extrabold tracking-tight">UKride</div>
            <p className="text-sm leading-6 text-white/65">
              Pre-booked London transfers with transparent pricing and premium
              vehicles.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Airport transfers</div>
            <ul className="space-y-2 text-sm text-white/65">
              <li>
                <Link className="hover:text-white" href="/airport-transfers/heathrow">
                  Heathrow
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/airport-transfers/gatwick">
                  Gatwick
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/airport-transfers/stansted">
                  Stansted
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/airport-transfers/luton">
                  Luton
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/airport-transfers/london-city">
                  London City
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/airport-transfers/southend">
                  Southend
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Plan your journey</div>
            <ul className="space-y-2 text-sm text-white/65">
              <li>
                <Link className="hover:text-white" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/about-us">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/help-and-support">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Contact</div>
            <ul className="space-y-2 text-sm text-white/65">
              <li>
                <a className="hover:text-white" href="mailto:support@ukride.uk">
                  support@ukride.uk
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="tel:+447700140900">
                  +44 7700 1409 00
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="tel:+442080509014">
                  +44 2080 5090 14
                </a>
              </li>
              <li className="text-xs leading-5 text-white/45">
                450 Bath Rd, London UB7 0EB, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <div>© UKride. All rights reserved.</div>
          <div className="flex gap-4">
            <Link className="hover:text-white" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-white" href="/terms-and-conditions">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

