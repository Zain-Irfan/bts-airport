import Link from "next/link";
import { Plane } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { Button } from "@/components/ui/button";

type SiteTopHeaderProps = {
  dark?: boolean;
  loginLabel?: string;
};

export function SiteTopHeader({
  dark = false,
  loginLabel = "Log In",
}: SiteTopHeaderProps) {
  return (
    <header
      className={`ukride-glass-nav sticky top-0 z-50 w-full text-[#F8F8F8] transition-colors duration-300 ${
        dark ? "" : ""
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 ${
          dark ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <div
            className={`flex items-center justify-center rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#4B0082_0%,#2A1238_100%)] text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_8px_24px_-8px_rgba(75,0,130,0.55)] transition-all duration-300 group-hover:border-[rgba(192,192,192,0.4)] group-hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),0_12px_32px_-8px_rgba(75,0,130,0.75)] ${
              dark ? "h-9 w-9" : "h-10 w-10"
            }`}
          >
            <Plane className={dark ? "h-4 w-4" : "h-5 w-5"} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#F8F8F8]">
            BTS
          </span>
        </Link>

        <MainNav />

        <div className="flex items-center gap-3">
          <Button asChild size={dark ? "sm" : "default"}>
            <Link href="/login">{loginLabel}</Link>
          </Button>
          {!dark && (
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

