"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { telHref } from "@/lib/phone";

export function SiteFooter() {
  const { whatsapp, phone, email } = useSiteSettings();
  return (
    <footer className="relative overflow-hidden border-t border-[rgba(192,192,192,0.1)] bg-[linear-gradient(180deg,#0D0D0F_0%,#0A0A0D_100%)] text-[#D1D5DB]">
      {/* Subtle purple top wash */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-56 w-[60vw] max-w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(51, 51, 51,0.28),transparent_65%)] blur-[110px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Image
              src="/assets/logo.jpeg"
              alt="London Airport Taxi Services Logo"
              width={140}
              height={50}
              className="h-10 w-auto object-contain"
            />
            <p className="max-w-xs text-sm leading-6 text-[#A5A7AA]">
              Pre-booked London transfers with transparent pricing and premium
              vehicles.
            </p>
          </div>

          <FooterCol title="Airport transfers">
            <FooterLi href="/airport-transfers/heathrow">Heathrow</FooterLi>
            <FooterLi href="/airport-transfers/gatwick">Gatwick</FooterLi>
            <FooterLi href="/airport-transfers/stansted">Stansted</FooterLi>
            <FooterLi href="/airport-transfers/luton">Luton</FooterLi>
            <FooterLi href="/airport-transfers/london-city">London City</FooterLi>
            <FooterLi href="/airport-transfers/southend">Southend</FooterLi>
          </FooterCol>

          <FooterCol title="Plan your journey">
            <FooterLi href="/services">Services</FooterLi>
            <FooterLi href="/about-us">About</FooterLi>
            <FooterLi href="/help-and-support">Help & Support</FooterLi>
          </FooterCol>

          <FooterCol title="Contact">
            <li>
              <a
                className="text-[#D1D5DB] transition-colors duration-300 hover:text-[#F8F8F8]"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </li>
            <li>
              <a
                className="text-[#D1D5DB] transition-colors duration-300 hover:text-[#F8F8F8]"
                href={`https://wa.me/${whatsapp}`}
              >
                WhatsApp: +{whatsapp}
              </a>
            </li>
            <li>
              <a
                className="text-[#D1D5DB] transition-colors duration-300 hover:text-[#F8F8F8]"
                href={telHref(phone)}
              >
                {phone}
              </a>
            </li>
            <li className="pt-1 text-xs leading-5 text-[#A5A7AA]">
              450 Bath Rd, London UB7 0EB, United Kingdom
            </li>
          </FooterCol>
        </div>

        <div className="BTS-divider-silver mt-10" aria-hidden />
        <div className="mt-6 flex flex-col gap-2 text-xs text-[#A5A7AA] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} London Airport Taxi Services. All rights reserved.</div>
          <div className="flex gap-5">
            <Link
              className="text-[#A5A7AA] transition-colors hover:text-[#F8F8F8]"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-[#A5A7AA] transition-colors hover:text-[#F8F8F8]"
              href="/terms-and-conditions"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
        {title}
      </div>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLi({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        className="text-[#D1D5DB] transition-colors duration-300 hover:text-[#F8F8F8]"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
