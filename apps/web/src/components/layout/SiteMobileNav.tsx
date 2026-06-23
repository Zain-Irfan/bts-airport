"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomerAuthNav } from "@/components/layout/CustomerAuthNav";
import {
  airportTransferLinks,
  primaryNavLinks,
  serviceLinks,
} from "@/lib/site-nav-data";

const ROUTE_START_EVENT = "BTS-route-start";

function startRouteLoading() {
  window.dispatchEvent(new Event(ROUTE_START_EVENT));
}

export function SiteMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [airportOpen, setAirportOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setAirportOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkClass = (href: string) =>
    cn(
      "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "bg-[rgba(75,0,130,0.25)] text-[#F8F8F8]"
        : "text-[#D1D5DB] hover:bg-[rgba(75,0,130,0.15)] hover:text-[#F8F8F8]",
    );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[rgba(192,192,192,0.15)] bg-[rgba(13,13,15,0.6)] text-[#F8F8F8] transition hover:bg-[rgba(75,0,130,0.2)]"
        aria-expanded={open}
        aria-controls="site-mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] cursor-pointer bg-black/60 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="site-mobile-nav-panel"
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(100vw-3rem,20rem)] flex-col overflow-y-auto border-l border-[rgba(192,192,192,0.12)] bg-[#0D0D0F] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[rgba(192,192,192,0.22)] px-4 py-4">
              <span className="text-sm font-bold text-[#F8F8F8]">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#A5A7AA] hover:bg-[rgba(192,192,192,0.08)] hover:text-[#F8F8F8]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-1 p-3">
              <Link href="/" onClick={startRouteLoading} className={linkClass("/")}>
                Home
              </Link>

              <button
                type="button"
                onClick={() => setAirportOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#D1D5DB] hover:bg-[rgba(75,0,130,0.15)] hover:text-[#F8F8F8]"
              >
                Airport Transfers
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", airportOpen && "rotate-180")}
                />
              </button>
              {airportOpen && (
                <div className="mb-1 space-y-0.5 border-l border-[rgba(192,192,192,0.1)] pl-3">
                  <Link
                    href="/airport-transfers"
                    onClick={startRouteLoading}
                    className={linkClass("/airport-transfers")}
                  >
                    All airports
                  </Link>
                  {airportTransferLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={startRouteLoading}
                      className={linkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#D1D5DB] hover:bg-[rgba(75,0,130,0.15)] hover:text-[#F8F8F8]"
              >
                Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")}
                />
              </button>
              {servicesOpen && (
                <div className="mb-1 space-y-0.5 border-l border-[rgba(192,192,192,0.1)] pl-3">
                  <Link
                    href="/services"
                    onClick={startRouteLoading}
                    className={linkClass("/services")}
                  >
                    All services
                  </Link>
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={startRouteLoading}
                      className={linkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {primaryNavLinks
                .filter((l) => !["/", "/airport-transfers", "/services"].includes(l.href))
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={startRouteLoading}
                    className={linkClass(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}

              <div className="mt-4 space-y-2 border-t border-[rgba(192,192,192,0.22)] pt-4">
                <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                  Account
                </p>
                <CustomerAuthNav
                  className="flex flex-col gap-2 md:hidden"
                  linkClassName="block rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[#D1D5DB] hover:bg-[rgba(75,0,130,0.15)] hover:text-[#F8F8F8]"
                  onNavigate={startRouteLoading}
                />
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
