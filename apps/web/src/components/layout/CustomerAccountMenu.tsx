"use client";

import { Calendar, ChevronDown, LogOut, Shield } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function getInitials(name?: string | null): string {
  if (!name?.trim()) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type Props = {
  onNavigate?: () => void;
  className?: string;
};

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#D1D5DB] transition-colors hover:bg-[rgba(75,0,130,0.22)] hover:text-[#F8F8F8]";

export function CustomerAccountMenu({ onNavigate, className }: Props) {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "Account";
  const email = session?.user?.email ?? "";
  const firstName = name.split(/\s+/)[0] ?? "Account";
  const initials = getInitials(name);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[rgba(192,192,192,0.22)]",
            "bg-[rgba(13,13,15,0.6)] px-2 py-1.5 text-sm font-semibold text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.08)]",
            "transition hover:border-[rgba(192,192,192,0.38)] hover:bg-[rgba(75,0,130,0.18)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highlight)/0.4)]",
            className,
          )}
          aria-label="Account menu"
        >
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_100%)] text-[11px] font-bold tracking-tight text-[#F8F8F8]"
            aria-hidden
          >
            {initials}
          </span>
          <span className="hidden max-w-[5.5rem] truncate lg:inline">{firstName}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="site-account-menu w-60 p-0"
      >
        <div className="border-b border-[rgba(192,192,192,0.12)] px-3 py-3">
          <p className="truncate text-sm font-semibold text-[#F8F8F8]">{name}</p>
          {email ? (
            <p className="mt-0.5 truncate text-xs text-[#A5A7AA]">{email}</p>
          ) : null}
        </div>
        <nav className="flex flex-col gap-0.5 p-2" aria-label="Account">
          <Link href="/account/bookings" onClick={onNavigate} className={menuItemClass}>
            <Calendar className="h-4 w-4 shrink-0 opacity-85" aria-hidden />
            My bookings
          </Link>
          <button
            type="button"
            onClick={() => {
              onNavigate?.();
              void signOut({ callbackUrl: "/" });
            }}
            className={menuItemClass}
          >
            <LogOut className="h-4 w-4 shrink-0 opacity-85" aria-hidden />
            Sign out
          </button>
        </nav>
      </PopoverContent>
    </Popover>
  );
}

export function StaffAccountMenu({ onNavigate, className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[rgba(192,192,192,0.22)]",
            "bg-[rgba(13,13,15,0.6)] px-3 py-1.5 text-sm font-semibold text-[#F8F8F8]",
            "transition hover:border-[rgba(192,192,192,0.38)] hover:bg-[rgba(75,0,130,0.18)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highlight)/0.4)]",
            className,
          )}
          aria-label="Staff menu"
        >
          <Shield className="h-4 w-4 shrink-0 text-[#C0C0C0]" aria-hidden />
          <span>Staff</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="site-account-menu w-52 p-2"
      >
        <nav className="flex flex-col gap-0.5" aria-label="Staff">
          <Link href="/admin" onClick={onNavigate} className={menuItemClass}>
            <Shield className="h-4 w-4 shrink-0 opacity-85" aria-hidden />
            Admin dashboard
          </Link>
          <button
            type="button"
            onClick={() => {
              onNavigate?.();
              void signOut({ callbackUrl: "/" });
            }}
            className={menuItemClass}
          >
            <LogOut className="h-4 w-4 shrink-0 opacity-85" aria-hidden />
            Sign out
          </button>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
