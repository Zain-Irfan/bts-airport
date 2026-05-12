"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

const ROUTE_START_EVENT = "ukride-route-start";

export function RouteLoadingBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const startPathRef = useRef(pathname);
  const showTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
  }, []);

  // Listen for internal navigation clicks
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;

      const anchor = (event.target as HTMLElement)?.closest(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${url.pathname}${url.search}`;
      if (current === next) return;

      window.dispatchEvent(new Event(ROUTE_START_EVENT));
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // Show the loader (with a small debounce to skip instant navigations)
  useEffect(() => {
    const start = () => {
      clearTimers();
      startPathRef.current = pathname;

      showTimerRef.current = window.setTimeout(() => {
        setActive(true);
      }, 120);
    };

    window.addEventListener(ROUTE_START_EVENT, start);
    return () => window.removeEventListener(ROUTE_START_EVENT, start);
  }, [pathname, clearTimers]);

  // Hide the loader only when pathname actually changes from where we started
  useEffect(() => {
    if (!active) return;
    if (pathname === startPathRef.current) return;

    // Route arrived — let the new paint settle, then fade out
    fadeTimerRef.current = window.setTimeout(() => {
      setActive(false);
    }, 280);
  }, [pathname, active]);

  // Safety: if the loader has been visible for 8s something is stuck — dismiss
  useEffect(() => {
    if (!active) return;
    const safety = window.setTimeout(() => setActive(false), 8000);
    return () => window.clearTimeout(safety);
  }, [active]);

  // Cleanup on unmount
  useEffect(() => clearTimers, [clearTimers]);

  return (
    <>
      {/* Top progress bar */}
      <div
        className={`fixed left-0 right-0 top-0 z-[110] h-[2px] transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!active}
      >
        <div className="ukride-topbar-track h-full w-full overflow-hidden">
          <div className="ukride-topbar-fill h-full" />
        </div>
      </div>

      {/* Full-screen overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center transition-all duration-[400ms] ease-out ${
          active
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none"
        }`}
        style={{
          backgroundColor: active ? "rgba(13,13,15,0.45)" : "transparent",
        }}
        aria-hidden={!active}
      >
        <div
          className={`flex flex-col items-center gap-5 transition-all duration-[400ms] ease-out ${
            active
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-95 opacity-0"
          }`}
        >
          {/* Spinning ring with brand mark */}
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[rgba(155,81,224,0.3)]" style={{ animation: "ukride-ring-pulse 2s ease-in-out infinite" }} />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#9B51E0]" style={{ animation: "ukride-spin 0.9s linear infinite" }} />
            <span className="text-[10px] font-extrabold tracking-tight text-[#F8F8F8]">
              BTS
            </span>
          </div>

          {/* Dot pulse */}
          <div className="flex items-center gap-1.5">
            <span className="ukride-dot-pulse h-1 w-1 rounded-full bg-[#C0C0C0]" style={{ animationDelay: "0ms" }} />
            <span className="ukride-dot-pulse h-1 w-1 rounded-full bg-[#C0C0C0]" style={{ animationDelay: "160ms" }} />
            <span className="ukride-dot-pulse h-1 w-1 rounded-full bg-[#C0C0C0]" style={{ animationDelay: "320ms" }} />
          </div>
        </div>
      </div>
    </>
  );
}
