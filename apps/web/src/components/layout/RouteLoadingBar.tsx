"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";

const ROUTE_START_EVENT = "ukride-route-start";

export function RouteLoadingBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);
  const showTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (showTimeoutRef.current) {
        window.clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      // Avoid flashing the overlay on ultra-fast route changes.
      showTimeoutRef.current = window.setTimeout(() => {
        setActive(true);
      }, 120);
    };

    window.addEventListener(ROUTE_START_EVENT, start);
    return () => {
      window.removeEventListener(ROUTE_START_EVENT, start);
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      const currentUrl = `${window.location.pathname}${window.location.search}`;
      const nextUrl = `${url.pathname}${url.search}`;
      if (currentUrl === nextUrl) return;

      window.dispatchEvent(new Event(ROUTE_START_EVENT));
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    hideTimeoutRef.current = window.setTimeout(() => {
      setActive(false);
    }, 320);
  }, [pathname, active]);

  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        window.clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background/55 backdrop-blur-md transition-opacity duration-300 ease-out ${
        active ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!active}
    >
      <div className="w-[280px] rounded-2xl border border-white/[0.08] bg-card p-5 text-card-foreground shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65)]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
            <Plane className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-foreground">BTS</p>
            <p className="text-xs text-muted-foreground">Preparing your next page</p>
          </div>
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[ukride-loader_1.1s_ease-in-out_infinite] rounded-full bg-highlight" />
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-highlight [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-highlight [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-highlight [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

