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

const ROUTE_START_EVENT = "ukride-route-start";

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
        ? "bg-gold/15 text-foreground"
        : "text-body hover:bg-gold/10 hover:text-foreground",
    );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-input-bg text-foreground transition hover:bg-gold/15"
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
            className="fixed inset-0 z-[60] cursor-pointer bg-navy-deep/60 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="site-mobile-nav-panel"
            className="theme-light fixed inset-y-0 right-0 z-[70] flex w-[min(100vw-3rem,20rem)] flex-col overflow-y-auto border-l border-border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="text-sm font-bold text-foreground">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
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
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-body hover:bg-gold/10 hover:text-foreground"
              >
                Airport Transfers
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", airportOpen && "rotate-180")}
                />
              </button>
              {airportOpen && (
                <div className="mb-1 space-y-0.5 border-l border-border pl-3">
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
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-body hover:bg-gold/10 hover:text-foreground"
              >
                Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")}
                />
              </button>
              {servicesOpen && (
                <div className="mb-1 space-y-0.5 border-l border-border pl-3">
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

              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Account
                </p>
                <CustomerAuthNav
                  className="flex flex-col gap-2 md:hidden"
                  linkClassName="block rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-body hover:bg-gold/10 hover:text-foreground"
                  onNavigate={startRouteLoading}
                />
              </div>

              <Link
                href="/#quote"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-gold text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-hover"
              >
                Book now
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
