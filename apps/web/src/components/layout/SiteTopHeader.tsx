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
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
        >
          <Image
            src="/assets/logo.png"
            alt="BTS Logo"
            width={160}
            height={56}
            className="h-14 w-auto object-contain"
          />
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
