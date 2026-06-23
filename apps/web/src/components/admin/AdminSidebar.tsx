"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  CarFront,
  Users,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bus,
  Tags,
  X,
  CreditCard,
  BarChart2,
  Settings,
  Calculator,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

const nav = [
  { label: "Dashboard",          href: "/admin",                    icon: LayoutDashboard },
  { label: "Bookings",           href: "/admin/bookings",           icon: CalendarCheck   },
  { label: "Payments",           href: "/admin/payments",           icon: CreditCard      },
  { label: "Reports",            href: "/admin/reports",            icon: BarChart2       },
  { label: "Drivers",            href: "/admin/drivers",            icon: CarFront        },
  { label: "Users",              href: "/admin/users",              icon: Users           },
  { label: "Messages",           href: "/admin/contacts",           icon: MessageSquare   },
  { label: "Vehicle Categories", href: "/admin/vehicle-categories", icon: Tags            },
  { label: "Vehicle Types",      href: "/admin/vehicle-types",      icon: Bus             },
  { label: "Pricing Test",       href: "/admin/pricing-test",       icon: Calculator      },
  { label: "Settings",           href: "/admin/settings",           icon: Settings        },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const {
    mobileNavOpen,
    closeMobileNav,
    sidebarCollapsed,
    setSidebarCollapsed,
    theme,
  } = useAdminLayout();

  const isLight = theme === "light";
  const sidebarBg = isLight ? "bg-white border-gray-200" : "bg-[#0D0D0F] border-[rgba(192,192,192,0.08)]";
  const textPrimary = isLight ? "text-gray-900" : "text-[#F8F8F8]";
  const textMuted = isLight ? "text-gray-500" : "text-[#A5A7AA]";
  const dividerBorder = isLight ? "border-gray-200" : "border-[rgba(192,192,192,0.08)]";
  const activeItem = isLight
    ? "bg-purple-50 text-purple-900 shadow-[inset_0_0_0_1px_rgba(109,40,217,0.2)]"
    : "bg-[rgba(75,0,130,0.2)] text-[#F8F8F8] shadow-[inset_0_0_0_1px_rgba(155,81,224,0.25)]";
  const inactiveItem = isLight
    ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    : "text-[#A5A7AA] hover:bg-[rgba(192,192,192,0.06)] hover:text-[#F8F8F8]";
  const activeIcon = isLight ? "text-purple-600" : "text-[#9B51E0]";
  const activeDot = isLight ? "bg-purple-500" : "bg-[#9B51E0]";

  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  const widthClass = sidebarCollapsed ? "lg:w-[72px]" : "lg:w-[260px]";

  return (
    <>
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-pointer bg-black/60 backdrop-blur-[2px] lg:hidden"
          aria-label="Close menu"
          onClick={closeMobileNav}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col border-r transition-transform duration-300 ease-out",
          "w-[min(100vw-3rem,280px)]",
          widthClass,
          sidebarBg,
          mobileNavOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className={`flex h-14 shrink-0 items-center justify-between border-b px-3 sm:h-16 sm:px-4 ${dividerBorder}`}>
          <Link href="/admin" className="flex min-w-0 items-center gap-3" onClick={closeMobileNav}>
            <div className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg overflow-hidden ${isLight ? "bg-[#0D0D0F]" : "bg-transparent"}`}>
              <Image src="/assets/logo.png" alt="BTS Logo" width={36} height={36} className="h-9 w-9 object-contain" style={{ mixBlendMode: isLight ? "normal" : "screen" }} />
            </div>
            {(!sidebarCollapsed || mobileNavOpen) && (
              <div className="min-w-0 leading-tight">
                <div className={`truncate text-sm font-bold ${textPrimary}`}>BTS Admin</div>
                <div className={`truncate text-[10px] ${textMuted}`}>Management Panel</div>
              </div>
            )}
          </Link>
          <button
            type="button"
            onClick={closeMobileNav}
            className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition hover:bg-black/5 lg:hidden ${textMuted}`}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`hidden rounded-md p-1 transition hover:bg-black/5 lg:inline-flex ${textMuted}`}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {nav.map((item) => {
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active ? activeItem : inactiveItem,
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className={cn("h-[18px] w-[18px] flex-none", active && activeIcon)} />
                {(!sidebarCollapsed || mobileNavOpen) && <span className="truncate">{item.label}</span>}
                {(!sidebarCollapsed || mobileNavOpen) && active && (
                  <div className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${activeDot}`} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className={`shrink-0 border-t p-3 ${dividerBorder}`}>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-red-500/10 hover:text-red-500 ${textMuted}`}
            title={sidebarCollapsed ? "Sign out" : undefined}
          >
            <LogOut className="h-[18px] w-[18px] flex-none" />
            {(!sidebarCollapsed || mobileNavOpen) && <span>Sign out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

