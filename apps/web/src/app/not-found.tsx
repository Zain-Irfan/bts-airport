import Link from "next/link";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { FullFooterSection } from "@/components/FullFooterSection";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteTopHeader />
      <main className="container mx-auto flex flex-col items-center px-4 py-24 text-center md:py-32">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-ink">Error 404</p>
        <h1 className="text-3xl tracking-tight text-foreground md:text-4xl">This page took a wrong turn</h1>
        <p className="mt-4 max-w-md text-body">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on route.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#quote"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-gold px-7 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold-hover"
          >
            Get a fixed quote
          </Link>
          <Link
            href="/airport-transfers"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border-strong px-7 text-sm font-semibold text-foreground transition-colors hover:border-gold"
          >
            View airport transfers
          </Link>
        </div>
      </main>
      <FullFooterSection />
    </div>
  );
}
