import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export function FullFooterSection() {
  return (
    <>
      <section className="ukride-aurora relative flex min-h-[360px] items-center justify-center overflow-hidden bg-primary py-28 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/cta-bg.jpg"
            alt="London taxi at night"
            className="ukride-media-cinematic absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="ukride-media-overlay" />
        </div>
        <div className="container relative z-20 px-4 text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-highlight-soft/85">
            Private Chauffeur
          </p>
          <h2 className="mx-auto mb-6 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Ready to ride in quiet luxury?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Experience the pinnacle of London transport. Discreet, punctual, and
            curated for those who expect more.
          </p>
          <button
            type="button"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-accent px-10 text-base font-semibold tracking-wide text-accent-foreground shadow-[0_10px_36px_-8px_rgba(192,192,192,0.35),0_8px_32px_-10px_rgba(109,40,217,0.55)] transition-all duration-500 ease-out hover:-translate-y-[1px] hover:shadow-[0_14px_44px_-8px_rgba(192,192,192,0.45),0_12px_40px_-10px_rgba(109,40,217,0.7)]"
          >
            Book a Taxi Now
          </button>
        </div>
      </section>

      <hr className="ukride-divider" aria-hidden />

      <footer className="relative overflow-hidden bg-primary pb-10 pt-24 text-primary-foreground">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60vw] max-w-[900px] -translate-x-1/2 rounded-full bg-highlight/15 blur-[120px]"
          aria-hidden
        />
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4 text-muted-foreground">
              <h4 className="mb-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Contact Us</h4>
              <p className="text-muted-foreground">support@ukride.uk</p>
              <div className="space-y-2 pt-1">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Call us now</p>
                <p className="text-foreground/90">+44 7700 1409 00</p>
                <p className="text-foreground/90">+44 2080 5090 14</p>
              </div>
              <div className="pt-2">
                <h4 className="mb-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">UKride Address</h4>
                <p className="text-muted-foreground">
                  450 Bath Rd, London UB7 0EB, United Kingdom
                </p>
              </div>
              <p className="max-w-xs text-sm text-muted-foreground/80">
                Bookings handled by licensed operator&apos;s companies.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-foreground/[0.03] text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-highlight-soft/55 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[0_8px_24px_-8px_rgba(109,40,217,0.55)]"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-foreground/[0.03] text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-highlight-soft/55 hover:bg-highlight hover:text-highlight-foreground hover:shadow-[0_8px_24px_-8px_rgba(109,40,217,0.55)]"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-6 text-2xl font-semibold tracking-tight text-highlight-soft md:text-3xl">London Airport</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/airport-transfers/london-city" className="transition-colors hover:text-highlight">
                    London City Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/heathrow" className="transition-colors hover:text-highlight">
                    Heathrow Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/gatwick" className="transition-colors hover:text-highlight">
                    Gatwick Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/luton" className="transition-colors hover:text-highlight">
                    Luton Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/southend" className="transition-colors hover:text-highlight">
                    Southend Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/stansted" className="transition-colors hover:text-highlight">
                    Stansted Airport Transfers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-2xl font-semibold tracking-tight text-highlight-soft md:text-3xl">Plan Your Journey</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/london-hotel-transfers/" className="transition-colors hover:text-highlight">
                    London Hotel Transfer
                  </Link>
                </li>
                <li>
                  <Link href="/london-station-taxi/" className="transition-colors hover:text-highlight">
                    London Station Taxi
                  </Link>
                </li>
                <li>
                  <Link href="/london-taxi/" className="transition-colors hover:text-highlight">
                    London Taxi
                  </Link>
                </li>
                <li>
                  <Link href="/taxi-quote" className="transition-colors hover:text-highlight">
                    Taxi Quote
                  </Link>
                </li>
                <li>
                  <Link href="/taxi-booking-app/" className="transition-colors hover:text-highlight">
                    Taxi Booking App
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-2xl font-semibold tracking-tight text-highlight-soft md:text-3xl">Useful Links</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/terms-and-conditions" className="transition-colors hover:text-highlight">
                    Customer T&C
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="transition-colors hover:text-highlight">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/taxi-fare-calculator/" className="transition-colors hover:text-highlight">
                    Taxi Fare Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/drive-with-us/" className="transition-colors hover:text-highlight">
                    Drive With Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className="transition-colors hover:text-highlight">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="ukride-divider mb-8" aria-hidden />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p className="tracking-wide">© 2025 UkRide. All rights reserved.</p>
            <p className="tracking-[0.2em] uppercase text-xs text-muted-foreground/80">
              Designed for elite private transport
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

