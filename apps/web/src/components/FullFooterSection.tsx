import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";

export function FullFooterSection() {
  return (
    <>
      {/* ── Pre-footer CTA — cinematic onyx → royal-purple band ── */}
      <section className="ukride-luxury-section-2 ukride-hero-ambient relative flex min-h-[420px] items-center justify-center overflow-hidden py-28 md:py-32">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/cta-bg.jpg"
            alt=""
            aria-hidden
            className="ukride-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.32] mix-blend-overlay"
          />
          <div className="ukride-media-overlay" />
        </div>

        <div className="container relative z-20 px-4 text-center">
          <p className="ukride-pill mx-auto mb-6">
            <span className="block h-1.5 w-1.5 rounded-full bg-[#C0C0C0]" />
            Private Chauffeur
          </p>
          <h2 className="mx-auto mb-6 max-w-3xl text-4xl font-semibold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_28px_rgba(0,0,0,0.45)] md:text-6xl">
            Ready to ride in quiet luxury?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#D1D5DB] md:text-xl">
            Experience the pinnacle of London transport. Discreet, punctual, and
            curated for those who expect more.
          </p>
          <Link
            href="/taxi-quote"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl border border-[rgba(192,192,192,0.32)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] px-10 text-base font-semibold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.2),inset_0_0_0_1px_rgba(75,0,130,0.4),0_18px_48px_-10px_rgba(75,0,130,0.6),0_4px_14px_-4px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out hover:-translate-y-[1px] hover:border-[rgba(192,192,192,0.45)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.24),inset_0_0_0_1px_rgba(155,81,224,0.5),0_22px_60px_-12px_rgba(75,0,130,0.75),0_8px_22px_-4px_rgba(0,0,0,0.6),0_0_0_4px_rgba(75,0,130,0.18)]"
          >
            Book a Taxi Now
          </Link>
        </div>
      </section>

      <hr className="ukride-divider" aria-hidden />

      {/* ── Footer — black base with deep-purple top wash + silver chrome ── */}
      <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#0D0D0F_0%,#0A0A0D_100%)] pb-10 pt-24 text-[#D1D5DB]">
        {/* Ambient purple wash on top */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[70vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.32),transparent_65%)] blur-[120px]"
          aria-hidden
        />
        {/* Subtle bottom-right royal accent */}
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,10,87,0.45),transparent_60%)] blur-[100px]"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          {/* Brand row */}
          <div className="mb-16 flex flex-col items-start gap-6 border-b border-[rgba(192,192,192,0.1)] pb-12 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#4B0082_0%,#2A1238_100%)] text-sm font-extrabold tracking-tight text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_8px_24px_-8px_rgba(75,0,130,0.55)]">
                  UR
                </span>
                <div className="leading-tight">
                  <div className="text-lg font-bold tracking-tight text-[#F8F8F8]">
                    UKride
                  </div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[#A5A7AA]">
                    London transfers
                  </div>
                </div>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#A5A7AA]">
                Pre-booked private transfers across London and every major
                airport. Transparent pricing. Premium fleet. Discreet service.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/447700140900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(192,192,192,0.16)] bg-[rgba(13,13,15,0.6)] text-[#C0C0C0] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(192,192,192,0.4)] hover:bg-[rgba(75,0,130,0.32)] hover:text-[#F8F8F8] hover:shadow-[0_10px_28px_-10px_rgba(75,0,130,0.65)]"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/447700140900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(192,192,192,0.16)] bg-[rgba(13,13,15,0.6)] text-[#C0C0C0] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(192,192,192,0.4)] hover:bg-[rgba(75,0,130,0.32)] hover:text-[#F8F8F8] hover:shadow-[0_10px_28px_-10px_rgba(75,0,130,0.65)]"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column grid */}
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Contact">
              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value="support@ukride.uk"
                href="mailto:support@ukride.uk"
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="Call us"
                value="+44 7700 1409 00"
                href="tel:+447700140900"
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="Support"
                value="+44 2080 5090 14"
                href="tel:+442080509014"
              />
              <ContactRow
                icon={<MapPin className="h-4 w-4" />}
                label="Office"
                value="450 Bath Rd, London UB7 0EB, UK"
              />
              <p className="pt-2 text-xs leading-5 text-[#A5A7AA]/80">
                Bookings handled by licensed operator&apos;s companies.
              </p>
            </FooterColumn>

            <FooterColumn title="Airport transfers">
              <FooterLink href="/airport-transfers/heathrow">
                Heathrow Airport
              </FooterLink>
              <FooterLink href="/airport-transfers/gatwick">
                Gatwick Airport
              </FooterLink>
              <FooterLink href="/airport-transfers/london-city">
                London City Airport
              </FooterLink>
              <FooterLink href="/airport-transfers/luton">
                Luton Airport
              </FooterLink>
              <FooterLink href="/airport-transfers/stansted">
                Stansted Airport
              </FooterLink>
              <FooterLink href="/airport-transfers/southend">
                Southend Airport
              </FooterLink>
            </FooterColumn>

            <FooterColumn title="Plan your journey">
              <FooterLink href="/london-hotel-transfers/">
                London Hotel Transfer
              </FooterLink>
              <FooterLink href="/london-station-taxi/">
                London Station Taxi
              </FooterLink>
              <FooterLink href="/london-taxi/">London Taxi</FooterLink>
              <FooterLink href="/taxi-quote">Get a Quote</FooterLink>
              <FooterLink href="/taxi-booking-app/">
                Taxi Booking App
              </FooterLink>
              <FooterLink href="/taxi-fare-calculator/">
                Fare Calculator
              </FooterLink>
            </FooterColumn>

            <FooterColumn title="Company">
              <FooterLink href="/about-us">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/blog/">Blog</FooterLink>
              <FooterLink href="/help-and-support">Help & Support</FooterLink>
              <FooterLink href="/drive-with-us/">Drive With Us</FooterLink>
              <FooterLink href="/terms-and-conditions">
                Terms & Conditions
              </FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            </FooterColumn>
          </div>

          {/* Bottom hairline + meta row */}
          <div className="ukride-divider-silver mb-8" aria-hidden />
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#A5A7AA] md:flex-row">
            <p className="tracking-wide">
              © {new Date().getFullYear()} UKride. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#A5A7AA]/70">
              Designed for elite private transport
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
        {title}
      </h4>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-[#D1D5DB] transition-colors duration-300 hover:text-[#F8F8F8]"
      >
        <span className="h-px w-0 bg-[rgba(155,81,224,0.6)] transition-all duration-300 group-hover:w-3" />
        {children}
      </Link>
    </li>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <span className="text-sm text-[#F8F8F8]/90 group-hover:text-[#F8F8F8]">
      {value}
    </span>
  );
  return (
    <li className="group flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-md border border-[rgba(192,192,192,0.14)] bg-[rgba(45,45,51,0.5)] text-[#C0C0C0]">
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            className="text-sm text-[#F8F8F8]/90 transition-colors duration-300 hover:text-[#F8F8F8]"
          >
            {value}
          </a>
        ) : (
          body
        )}
      </span>
    </li>
  );
}
