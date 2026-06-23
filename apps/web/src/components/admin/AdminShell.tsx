"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { AdminLayoutProvider, useAdminLayout } from "@/components/admin/AdminLayoutContext";
import { AdminSidebar } from "./AdminSidebar";

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const { mainOffsetClass, theme } = useAdminLayout();

  // Apply theme class to <body> so Radix Portals (dropdowns, dialogs) also inherit CSS variables
  useEffect(() => {
    document.body.classList.remove("admin-light", "admin-dark");
    document.body.classList.add(theme === "light" ? "admin-light" : "admin-dark");
    return () => {
      document.body.classList.remove("admin-light", "admin-dark");
    };
  }, [theme]);

  return (
    <div className={`flex min-h-screen overflow-x-hidden ${theme === "light" ? "bg-[#F3F4F6]" : "bg-[#0D0D0F]"}`}>
      <AdminSidebar />
      <main className={`min-w-0 flex-1 transition-[padding] duration-300 ${mainOffsetClass}`}>
        {children}
      </main>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutProvider>
        <AdminShellInner>{children}</AdminShellInner>
      </AdminLayoutProvider>
    </SessionProvider>
  );
}
