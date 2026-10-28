"use client";

import { Clock, Mail, Phone, Plane, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { telHref } from "@/lib/phone";

/** Thin navy strip above the header: trust points left, direct contact right. */
export function SiteUtilityBar() {
  const { whatsapp, phone, email } = useSiteSettings();

  return (
    <div className="theme-navy hidden border-b border-white/10 bg-navy-deep text-xs md:block">
      <div className="container mx-auto flex h-9 items-center justify-between gap-6 px-4">
        <ul className="flex items-center gap-5 text-body">
          <li className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden />
            Fixed fares, no surge pricing
          </li>
          <li className="hidden items-center gap-1.5 lg:flex">
            <Plane className="h-3.5 w-3.5 text-gold" aria-hidden />
            Live flight monitoring
          </li>
          <li className="hidden items-center gap-1.5 xl:flex">
            <Clock className="h-3.5 w-3.5 text-gold" aria-hidden />
            Free airport waiting time
          </li>
        </ul>
        <div className="flex items-center gap-5 font-medium">
          <a href={`mailto:${email}`} className="hidden items-center gap-1.5 text-body transition-colors hover:text-foreground lg:flex">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {email}
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-body transition-colors hover:text-foreground"
          >
            <FaWhatsapp className="h-3.5 w-3.5" aria-hidden />
            WhatsApp
          </a>
          <a href={telHref(phone)} className="flex items-center gap-1.5 text-foreground transition-colors hover:text-gold">
            <Phone className="h-3.5 w-3.5 text-gold" aria-hidden />
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}
