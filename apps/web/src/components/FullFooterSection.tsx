"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { telHref } from "@/lib/phone";

export function FullFooterSection() {
  const { whatsapp, phone, email } = useSiteSettings();
  return (
    <>
      {/* ── Pre-footer CTA band ── */}
      <section className="BTS-luxury-section-2 relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/cta-bg.jpg"
            alt=""
            aria-hidden
            className="BTS-media-cinematic absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="BTS-media-overlay" />
        </div>

        <div className="container relative z-10 mx-auto flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-ink">
              Book in under a minute
            </p>
            <h2 className="text-3xl tracking-tight text-foreground md:text-4xl">
              Ready to book your London transfer?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body md:text-lg">
              Fixed fares, live flight monitoring and a licensed driver waiting
              for you — at every London airport, station and hotel.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/#quote"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gold px-7 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-hover"
            >
              Get a fixed quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={telHref(phone)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-7 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:bg-white/5"
            >
              <Phone className="h-4 w-4 text-gold" />
              {phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="theme-navy relative bg-navy-deep pb-8 pt-16 text-body md:pt-20">
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
            {/* Brand + contact */}
            <div className="col-span-2 space-y-6 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image src="/assets/logo-mrm.png" alt="MRM Executive Voyage Logo" width={128} height={128} className="h-16 w-16 object-contain" />
                <span className="leading-tight">
                  <span className="block text-lg font-bold text-foreground">MRM Executive</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-ink">Voyage</span>
                </span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Pre-booked airport transfers and private hire across London, with
                fixed fares and professional, licensed drivers.
              </p>
              <ul className="space-y-3">
                <ContactRow icon={<Phone className="h-4 w-4" />} value={phone} href={telHref(phone)} />
                <ContactRow icon={<FaWhatsapp className="h-4 w-4" />} value={`+${whatsapp}`} href={`https://wa.me/${whatsapp}`} />
                <ContactRow icon={<Mail className="h-4 w-4" />} value={email} href={`mailto:${email}`} />
                <ContactRow icon={<MapPin className="h-4 w-4" />} value="450 Bath Rd, London UB7 0EB, UK" />
              </ul>
              <div className="flex items-center gap-2">
                <SocialLink href="https://facebook.com" label="Facebook">
                  <FaFacebookF className="h-3.5 w-3.5" />
                </SocialLink>
                <SocialLink href="https://instagram.com" label="Instagram">
                  <FaInstagram className="h-3.5 w-3.5" />
                </SocialLink>
              </div>
            </div>

            <FooterColumn title="Airport transfers">
              <FooterLink href="/airport-transfers/heathrow">Heathrow Airport</FooterLink>
              <FooterLink href="/airport-transfers/gatwick">Gatwick Airport</FooterLink>
              <FooterLink href="/airport-transfers/london-city">London City Airport</FooterLink>
              <FooterLink href="/airport-transfers/luton">Luton Airport</FooterLink>
              <FooterLink href="/airport-transfers/stansted">Stansted Airport</FooterLink>
              <FooterLink href="/airport-transfers/southend">Southend Airport</FooterLink>
            </FooterColumn>

            <FooterColumn title="Plan your journey">
              <FooterLink href="/london-hotel-transfers/">London Hotel Transfer</FooterLink>
              <FooterLink href="/london-station-taxi/">London Station Taxi</FooterLink>
              <FooterLink href="/london-taxi/">London Taxi</FooterLink>
              <FooterLink href="/taxi-booking-app/">Taxi Booking App</FooterLink>
              <FooterLink href="/taxi-fare-calculator/">Fare Calculator</FooterLink>
            </FooterColumn>

            <FooterColumn title="Company">
              <FooterLink href="/about-us">About Us</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/help-and-support">Help & Support</FooterLink>
              <FooterLink href="/drive-with-us/">Drive With Us</FooterLink>
            </FooterColumn>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} MRM Executive Voyage. All rights reserved.
              <span className="hidden sm:inline"> · Bookings handled by licensed operators.</span>
            </p>
            <div className="flex gap-5">
              <Link href="/terms-and-conditions" className="transition-colors hover:text-foreground">
                Terms & Conditions
              </Link>
              <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
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
    <div>
      <h4 className="mb-5 text-sm font-semibold tracking-tight text-foreground">
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
        className="text-muted-foreground transition-colors duration-200 hover:text-gold"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-body transition-colors duration-200 hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

function ContactRow({
  icon,
  value,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  href?: string;
}) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <span className="flex-none text-gold">{icon}</span>
      {href ? (
        <a href={href} className="text-body transition-colors duration-200 hover:text-foreground">
          {value}
        </a>
      ) : (
        <span className="text-body">{value}</span>
      )}
    </li>
  );
}
