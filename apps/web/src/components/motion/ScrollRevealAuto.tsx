"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type RevealDirection = "left" | "right" | "up";

function getDirectionClass(direction: RevealDirection) {
  if (direction === "left") return "ukride-reveal-left";
  if (direction === "right") return "ukride-reveal-right";
  return "ukride-reveal-up";
}

function shouldSkipElement(el: HTMLElement) {
  if (el.hasAttribute("data-no-reveal")) return true;
  if (el.closest("footer")) return true;
  if (el.closest("[data-no-reveal-scope]")) return true;
  return false;
}

export function ScrollRevealAuto() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let raf1 = 0;
    let raf2 = 0;

    const run = () => {
      if (cancelled) return;

      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          // Covers pages that use <section> as well as pages that use <main> with <div> blocks.
          "main > section, main > div, main > article, main > aside, section"
        )
      ).filter((el) => {
        if (shouldSkipElement(el)) return false;
        const tag = el.tagName.toLowerCase();
        if (tag === "header" || tag === "nav") return false;
        // Avoid animating tiny wrappers (buttons, pills, etc.). This keeps it premium.
        const h = el.getBoundingClientRect().height;
        if (h > 0 && h < 120) return false;
        return true;
      });

      if (!candidates.length) return;

      // Don’t double-apply. If something already has ukride-reveal, keep it.
      const targets = candidates.filter(
        (el) => !el.classList.contains("ukride-reveal") && !el.classList.contains("is-inview")
      );

      targets.forEach((el, idx) => {
        const direction: RevealDirection =
          (el.getAttribute("data-reveal") as RevealDirection) ??
          (idx % 3 === 0 ? "left" : idx % 3 === 1 ? "right" : "up");

        const delayMs = Math.min(240, idx * 60);
        el.style.setProperty("--ukride-reveal-delay", `${delayMs}ms`);
        el.classList.add("ukride-reveal", getDirectionClass(direction));
      });

      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (!entry.isIntersecting) continue;
            el.classList.add("is-inview");
            observer?.unobserve(el);
          }
        },
        { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
      );

      for (const el of targets) observer.observe(el);
    };

    // On client-side route changes, content lands async. Two RAFs makes it reliable
    // without timers and keeps motion subtle.
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(run);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return null;
}

