"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";
import { NotificationBell } from "@/components/admin/NotificationBell";

export function AdminTopbar({ title, left }: { title: string; left?: React.ReactNode }) {
  const { data: session } = useSession();
  const { toggleMobileNav, theme, toggleTheme } = useAdminLayout();

  const isLight = theme === "light";

  const headerBg = isLight
    ? "bg-white/90 border-gray-200"
    : "bg-[rgba(13,13,15,0.85)] border-[rgba(192,192,192,0.08)]";
  const textPrimary = isLight ? "text-gray-900" : "text-[#F8F8F8]";
  const textMuted = isLight ? "text-gray-500" : "text-[#A5A7AA]";
  const btnBase = isLight
    ? "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
    : "border-[rgba(192,192,192,0.12)] text-[#A5A7AA] hover:bg-[rgba(192,192,192,0.08)] hover:text-[#F8F8F8]";
  const avatarBg = isLight ? "bg-gray-200 border-gray-300 text-gray-700" : "bg-[rgba(45,45,51,0.5)] border-[rgba(192,192,192,0.15)] text-[#F8F8F8]";
  const signOutBtn = isLight
    ? "border-gray-200 bg-gray-100 text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
    : "border-[rgba(192,192,192,0.15)] bg-[rgba(45,45,51,0.35)] text-[#CFCFCF] hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400";

  return (
    <header className={`sticky top-0 z-30 flex h-14 min-w-0 items-center justify-between gap-2 border-b px-3 backdrop-blur-xl sm:h-16 sm:gap-3 sm:px-4 lg:px-6 ${headerBg}`}>
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleMobileNav}
          className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition lg:hidden ${btnBase}`}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {left}
        <h1 className={`truncate text-base font-semibold tracking-tight sm:text-lg ${textPrimary}`}>
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition ${btnBase}`}
          aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
          title={isLight ? "Dark mode" : "Light mode"}
        >
          {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        <NotificationBell />

        <div className="hidden items-center gap-3 md:flex">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${avatarBg}`}>
            {session?.user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className={`max-w-[140px] truncate text-sm font-medium ${textPrimary}`}>
              {session?.user?.name || "Admin"}
            </p>
            <p className={`text-[11px] ${textMuted}`}>
              {(session?.user as { role?: string })?.role || "ADMIN"}
            </p>
          </div>
        </div>

        <button
          type="button"
          title="Sign out"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border p-2 transition sm:px-3 sm:py-2 md:px-4 ${signOutBtn}`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="hidden text-sm font-semibold md:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
