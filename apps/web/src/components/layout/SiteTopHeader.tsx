import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/MainNav";
import { CustomerAuthNav } from "@/components/layout/CustomerAuthNav";
import { SiteMobileNav } from "@/components/layout/SiteMobileNav";
import { SiteUtilityBar } from "@/components/layout/SiteUtilityBar";

export function SiteTopHeader() {
  return (
    <>
      <SiteUtilityBar />
      <header className="BTS-glass-nav sticky top-0 z-50">
        <div className="container mx-auto flex h-[4.25rem] w-full items-center gap-3 px-4 lg:h-[4.5rem] lg:gap-6">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="grid shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-[1.04]">
              <Image
                src="/assets/logo-mrm.png"
                alt="MRM Executive Voyage Logo"
                width={200}
                height={200}
                className="h-12 w-12 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                priority
              />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-base font-bold tracking-tight text-foreground">
                MRM Executive
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-ink">
                Voyage
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <MainNav />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0 lg:gap-3">
            <CustomerAuthNav />
            <Link
              href="/#quote"
              className="hidden h-10 items-center rounded-lg bg-gold px-5 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-hover sm:inline-flex"
            >
              Book now
            </Link>
            <SiteMobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
