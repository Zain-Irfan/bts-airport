"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AdminTheme = "dark" | "light";

type AdminLayoutContextValue = {
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mainOffsetClass: string;
  theme: AdminTheme;
  toggleTheme: () => void;
};

const AdminLayoutContext = createContext<AdminLayoutContextValue | null>(null);

export function AdminLayoutProvider({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<AdminTheme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("admin-theme") as AdminTheme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("admin-theme", next);
      return next;
    });
  }, []);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);
  const toggleMobileNav = useCallback(() => setMobileNavOpen((v) => !v), []);

  const mainOffsetClass = sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[260px]";

  const value = useMemo(
    () => ({
      mobileNavOpen,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
      sidebarCollapsed,
      setSidebarCollapsed,
      mainOffsetClass,
      theme,
      toggleTheme,
    }),
    [mobileNavOpen, openMobileNav, closeMobileNav, toggleMobileNav, sidebarCollapsed, mainOffsetClass, theme, toggleTheme],
  );

  return <AdminLayoutContext.Provider value={value}>{children}</AdminLayoutContext.Provider>;
}

export function useAdminLayout() {
  const ctx = useContext(AdminLayoutContext);
  if (!ctx) throw new Error("useAdminLayout must be used within AdminLayoutProvider");
  return ctx;
}
