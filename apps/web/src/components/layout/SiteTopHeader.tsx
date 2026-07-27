import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/MainNav";
import { CustomerAuthNav } from "@/components/layout/CustomerAuthNav";
import { SiteMobileNav } from "@/components/layout/SiteMobileNav";

export function SiteTopHeader() {
  return (
    <header className="BTS-glass-nav sticky top-0 z-50">
      <div className="container mx-auto flex h-[4.25rem] w-full items-center gap-3 px-4 sm:h-16 lg:gap-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)] ring-1 ring-[rgba(192,192,192,0.25)] transition-transform duration-300 group-hover:scale-[1.03]">
            <Image
              src="/assets/logo.jpeg"
              alt="London Airport Taxi Services Logo"
              width={200}
              height={200}
              className="h-12 w-12 object-contain sm:h-[52px] sm:w-[52px]"
              priority
            />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[15px] font-bold tracking-tight text-[#F8F8F8]">
              London Airport Taxi
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A5A7AA]">
              Executive travel · 24/7
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <MainNav />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 border-[rgba(192,192,192,0.12)] md:gap-2.5 md:border-l md:pl-3 lg:gap-3 lg:pl-4">
          <CustomerAuthNav />
          <SiteMobileNav />
        </div>
      </div>
    </header>
  );
}
