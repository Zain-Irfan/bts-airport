import type { Metadata } from "next";
import "./globals.css";
import { RouteLoadingBar } from "@/components/layout/RouteLoadingBar";
import { ScrollRevealAuto } from "@/components/motion/ScrollRevealAuto";
import { ThirdPartyStyles } from "@/components/motion/ThirdPartyStyles";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import { getSiteSettings } from "@/lib/site-settings";

function siteUrl(): URL {
  try {
    return new URL(process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://londonairporttaxiservices.co.uk");
  } catch {
    return new URL("https://londonairporttaxiservices.co.uk");
  }
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  // Pages set their own title; it becomes "<Page> | MRM Executive Voyage".
  title: {
    default: "MRM Executive Voyage | London Airport Transfers & Chauffeur Service 24/7",
    template: "%s | MRM Executive Voyage",
  },
  description:
    "Pre-booked London taxi and airport transfers with transparent pricing and premium vehicles.",
  openGraph: {
    siteName: "MRM Executive Voyage",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body suppressHydrationWarning className="flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
        <RouteLoadingBar />
        <ThirdPartyStyles />
        <ScrollRevealAuto />
        <SiteSettingsProvider settings={siteSettings}>
          <SessionProvider>{children}</SessionProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
