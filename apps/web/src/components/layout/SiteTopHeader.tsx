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
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        dark
          ? "border-b border-white/[0.08] bg-primary text-primary-foreground"
          : "ukride-glass-nav text-foreground"
      }`}
    >
      <div className={`container mx-auto flex items-center justify-between px-4 ${dark ? "h-16" : "h-20"}`}>
        <Link href="/" className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center rounded-md ${
              dark
                ? "h-8 w-8 bg-highlight/90 text-highlight-foreground"
                : "h-10 w-10 rounded-lg bg-highlight text-highlight-foreground"
            }`}
          >
            <Plane className={dark ? "h-4 w-4" : "h-6 w-6"} />
          </div>
          <span className={`font-bold tracking-tight ${dark ? "text-2xl text-primary-foreground" : "text-2xl text-foreground"}`}>
            BTS
          </span>
        </Link>

        <MainNav />

        <div className="flex items-center gap-4">
          <Button
            asChild
            className={
              dark
                ? "h-8 rounded-sm border border-highlight/50 bg-accent px-4 text-xs font-bold text-accent-foreground hover:bg-accent/90"
                : "hidden border border-highlight/40 sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
            }
          >
            <Link href="/login">{loginLabel}</Link>
          </Button>
          {!dark && (
            <Button
              asChild
              className="border border-highlight/40 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

