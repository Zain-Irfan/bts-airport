"use client";

import Image from "next/image";
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

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement)?.closest("a[href]") as HTMLAnchorElement | null;
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

  useEffect(() => {
    const start = () => {
      clearTimers();
      startPathRef.current = pathname;
      showTimerRef.current = window.setTimeout(() => setActive(true), 120);
    };
    window.addEventListener(ROUTE_START_EVENT, start);
    return () => window.removeEventListener(ROUTE_START_EVENT, start);
  }, [pathname, clearTimers]);

  useEffect(() => {
    if (!active) return;
    if (pathname === startPathRef.current) return;
    fadeTimerRef.current = window.setTimeout(() => setActive(false), 300);
  }, [pathname, active]);

  useEffect(() => {
    if (!active) return;
    const safety = window.setTimeout(() => setActive(false), 8000);
    return () => window.clearTimeout(safety);
  }, [active]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <>
      {/* Full screen overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998] transition-all duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: "rgba(5,5,8,0.75)",
          backdropFilter: active ? "blur(6px)" : "none",
        }}
      />

      {/* Centered spinner */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 transition-all duration-500"
        style={{ opacity: active ? 1 : 0, transform: active ? "scale(1)" : "scale(0.92)" }}
      >
        {/* Spinner rings + logo */}
        <div className="relative flex items-center justify-center">
          {/* Outer slow ring */}
          <div
            className="absolute rounded-full border border-[rgba(153, 153, 153,0.2)]"
            style={{ width: 110, height: 110, animation: "rl-pulse 2s ease-in-out infinite" }}
          />
          {/* Mid spinning ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 90,
              height: 90,
              border: "2px solid transparent",
              borderTopColor: "#999999",
              borderRightColor: "rgba(153, 153, 153,0.3)",
              animation: "rl-spin 1s linear infinite",
              filter: "drop-shadow(0 0 8px rgba(153, 153, 153,0.6))",
            }}
          />
          {/* Inner counter-spin ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 70,
              height: 70,
              border: "1.5px solid transparent",
              borderBottomColor: "#C084FC",
              borderLeftColor: "rgba(192,132,252,0.25)",
              animation: "rl-spin-reverse 1.5s linear infinite",
            }}
          />
          {/* Logo in center */}
          <div
            className="relative flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden"
            style={{ boxShadow: "0 0 24px rgba(51, 51, 51,0.6)" }}
          >
            <Image src="/assets/logo.png" alt="BTS" width={48} height={48} className="h-12 w-12 object-cover" />
          </div>
        </div>

        {/* Dot pulse */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "#999999",
                animation: "rl-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rl-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes rl-spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes rl-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.4; }
          50%       { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes rl-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </>
  );
}
