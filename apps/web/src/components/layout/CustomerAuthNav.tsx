"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { isCustomerRole, isStaffRole } from "@/lib/auth-roles";
import {
  CustomerAccountMenu,
  StaffAccountMenu,
} from "@/components/layout/CustomerAccountMenu";
import { cn } from "@/lib/utils";

const guestLinkClass =
  "inline-flex rounded-full px-3 py-2 text-sm font-semibold text-[#A5A7AA] transition-colors duration-300 hover:bg-[rgba(51, 51, 51,0.18)] hover:text-[#F8F8F8] sm:px-4";

type Props = {
  /** Wrapper: hidden on phones (menu has auth); visible from md up with main nav */
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

export function CustomerAuthNav({
  className,
  linkClassName,
  onNavigate,
}: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const customer = user && isCustomerRole(user.role);
  const staff = user && isStaffRole(user.role);

  const wrapClass =
    className ?? "hidden items-center md:flex";

  const linkClass = linkClassName ?? guestLinkClass;
  const isMobileStack = wrapClass.includes("flex-col");

  const guestNav = (
    <div
      className={cn(
        wrapClass,
        !isMobileStack && "gap-1 lg:gap-2",
      )}
    >
      <Link href="/login" onClick={onNavigate} className={linkClass}>
        Login
      </Link>
      <Link href="/signup" onClick={onNavigate} className={linkClass}>
        Sign up
      </Link>
    </div>
  );

  if (!user) {
    return guestNav;
  }

  if (customer) {
    if (isMobileStack) {
      return (
        <div className={wrapClass}>
          <Link
            href="/account/bookings"
            onClick={onNavigate}
            className={linkClass}
          >
            My bookings
          </Link>
          <button
            type="button"
            onClick={() => {
              onNavigate?.();
              void signOut({ callbackUrl: "/" });
            }}
            className={linkClass}
          >
            Sign out
          </button>
        </div>
      );
    }
    return (
      <div className={wrapClass}>
        <CustomerAccountMenu onNavigate={onNavigate} />
      </div>
    );
  }

  if (staff) {
    if (isMobileStack) {
      return (
        <div className={wrapClass}>
          <Link href="/admin" onClick={onNavigate} className={linkClass}>
            Admin dashboard
          </Link>
          <button
            type="button"
            onClick={() => {
              onNavigate?.();
              void signOut({ callbackUrl: "/" });
            }}
            className={linkClass}
          >
            Sign out
          </button>
        </div>
      );
    }
    return (
      <div className={wrapClass}>
        <StaffAccountMenu onNavigate={onNavigate} />
      </div>
    );
  }

  return guestNav;
}
