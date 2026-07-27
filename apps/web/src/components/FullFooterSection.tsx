"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";

export function FullFooterSection() {
  const { whatsapp, email } = useSiteSettings();
  return (
    <>
      {/* ── Pre-footer CTA — cinematic onyx → royal-purple band ── */}
      <section className="BTS-luxury-section-2 BTS-hero-ambient relative flex min-h-[420px] items-center justify-center overflow-hidden py-28 md:py-32">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/cta-bg.jpg"
            alt=""
            aria-hidden
            className="BTS-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.32] mix-blend-overlay"
          />
          <div className="BTS-media-overlay" />
        </div>

        <div className="container relative z-20 px-4 text-center">
          <p className="BTS-pill mx-auto mb-6">
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
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl border border-[rgba(192,192,192,0.32)] bg-[linear-gradient(135deg,#404040_0%,#333333_55%,#262626_100%)] px-10 text-base font-semibold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.2),inset_0_0_0_1px_rgba(51, 51, 51,0.4),0_18px_48px_-10px_rgba(51, 51, 51,0.6),0_4px_14px_-4px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out hover:-translate-y-[1px] hover:border-[rgba(192,192,192,0.45)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.24),inset_0_0_0_1px_rgba(153, 153, 153,0.5),0_22px_60px_-12px_rgba(51, 51, 51,0.75),0_8px_22px_-4px_rgba(0,0,0,0.6),0_0_0_4px_rgba(51, 51, 51,0.18)]"
          >
            Book a Taxi Now
          </Link>
        </div>
      </section>

      <hr className="BTS-divider" aria-hidden />

      {/* ── Footer — black base with deep-purple top wash + silver chrome ── */}
      <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#0D0D0F_0%,#0A0A0D_100%)] pb-10 pt-24 text-[#D1D5DB]">
        {/* Ambient purple wash on top */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[70vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(51, 51, 51,0.32),transparent_65%)] blur-[120px]"
          aria-hidden
        />
        {/* Subtle bottom-right neutral accent */}
        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(64,64,64,0.45),transparent_60%)] blur-[100px]"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          {/* Logo top-left */}
          <div className="mb-10">
            <Image src="/assets/logo.png" alt="London Airport Taxi Services Logo" width={160} height={56} className="h-14 w-auto object-contain" />
          </div>

          {/* Column grid */}
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Contact">
              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={email}
                href={`mailto:${email}`}
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="WhatsApp"
                value={`+${whatsapp}`}
                href={`https://wa.me/${whatsapp}`}
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
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(192,192,192,0.16)] bg-[rgba(13,13,15,0.6)] text-[#C0C0C0] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(192,192,192,0.4)] hover:bg-[rgba(51, 51, 51,0.32)] hover:text-[#F8F8F8]"
                >
                  <FaFacebookF className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(192,192,192,0.16)] bg-[rgba(13,13,15,0.6)] text-[#C0C0C0] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(192,192,192,0.4)] hover:bg-[rgba(51, 51, 51,0.32)] hover:text-[#F8F8F8]"
                >
                  <FaInstagram className="h-3.5 w-3.5" />
                </a>
              </li>
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
              <FooterLink href="/help-and-support">Help & Support</FooterLink>
              <FooterLink href="/drive-with-us/">Drive With Us</FooterLink>
              <FooterLink href="/terms-and-conditions">
                Terms & Conditions
              </FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            </FooterColumn>
          </div>

          {/* Bottom hairline + meta row */}
          <div className="BTS-divider-silver mb-8" aria-hidden />
          <p className="text-center text-xs tracking-wide text-[#A5A7AA]">
            © {new Date().getFullYear()} London Airport Taxi Services. All rights reserved.
          </p>
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
        <span className="h-px w-0 bg-[rgba(153, 153, 153,0.6)] transition-all duration-300 group-hover:w-3" />
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
