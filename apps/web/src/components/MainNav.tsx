"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

const airportTransferLinks = [
  { label: "Heathrow Airport Transfers", href: "/airport-transfers/heathrow" },
  { label: "Southend Airport Transfers", href: "/airport-transfers/southend" },
  {
    label: "London City Airport Transfers",
    href: "/airport-transfers/london-city",
  },
  { label: "Stansted Airport Transfers", href: "/airport-transfers/stansted" },
  { label: "Luton Airport transfers", href: "/airport-transfers/luton" },
  { label: "Gatwick Airport Transfers", href: "/airport-transfers/gatwick" },
];

const serviceLinks = [
  { label: "A to B Taxi", href: "/services/a-to-b-taxi" },
  { label: "Business Taxi Services", href: "/services/business-taxi-services" },
  { label: "Dial a Cab", href: "/services/dial-a-cab" },
];

const ROUTE_START_EVENT = "ukride-route-start";

export function MainNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [airportRoutesPrefetched, setAirportRoutesPrefetched] = useState(false);
  const [serviceRoutesPrefetched, setServiceRoutesPrefetched] = useState(false);

  const prefetchAirportRoutes = () => {
    if (airportRoutesPrefetched) return;
    airportTransferLinks.forEach((item) => {
      router.prefetch(item.href);
    });
    setAirportRoutesPrefetched(true);
  };

  const prefetchServiceRoutes = () => {
    if (serviceRoutesPrefetched) return;
    serviceLinks.forEach((item) => {
      router.prefetch(item.href);
    });
    setServiceRoutesPrefetched(true);
  };

  const startRouteLoading = () => {
    window.dispatchEvent(new Event(ROUTE_START_EVENT));
  };

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={startRouteLoading}
        className={cn(
          "transition-colors duration-300",
          active
            ? "text-highlight"
            : "text-foreground/80 hover:text-highlight",
        )}
      >
        {label}
      </Link>
    );
  };

  const airportActive = pathname.startsWith("/airport-transfers");
  const servicesActive = pathname.startsWith("/services");

  return (
    <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
      {navLink("/", "Home")}

      <div
        className="group relative"
        onMouseEnter={prefetchAirportRoutes}
        onFocus={prefetchAirportRoutes}
      >
        <button
          type="button"
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 transition-colors duration-300",
            airportActive
              ? "text-highlight"
              : "text-foreground/80 hover:text-highlight",
          )}
        >
          Airport Transfers
          <ChevronDown className="h-4 w-4 opacity-80" />
        </button>
        <div className="invisible absolute left-0 top-full z-50 mt-3 w-72 rounded-xl border border-white/[0.08] bg-popover/95 p-2 opacity-0 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 ease-out group-hover:visible group-hover:opacity-100">
          {airportTransferLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={startRouteLoading}
              className="block rounded-lg px-3 py-2.5 text-sm text-foreground/90 transition-colors duration-200 hover:bg-highlight/12 hover:text-highlight"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="group relative"
        onMouseEnter={prefetchServiceRoutes}
        onFocus={prefetchServiceRoutes}
      >
        <button
          type="button"
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 transition-colors duration-300",
            servicesActive
              ? "text-highlight"
              : "text-foreground/80 hover:text-highlight",
          )}
        >
          Services
          <ChevronDown className="h-4 w-4 opacity-80" />
        </button>
        <div className="invisible absolute left-0 top-full z-50 mt-3 w-64 rounded-xl border border-white/[0.08] bg-popover/95 p-2 opacity-0 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 ease-out group-hover:visible group-hover:opacity-100">
          {serviceLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={startRouteLoading}
              className="block rounded-lg px-3 py-2.5 text-sm text-foreground/90 transition-colors duration-200 hover:bg-highlight/12 hover:text-highlight"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {navLink("/about-us", "About Us")}
      {navLink("/help-and-support", "Help and support")}
    </nav>
  );
}
