import type { Metadata } from "next";
import "./globals.css";
import { RouteLoadingBar } from "@/components/layout/RouteLoadingBar";
import { ScrollRevealAuto } from "@/components/motion/ScrollRevealAuto";
import { ThirdPartyStyles } from "@/components/motion/ThirdPartyStyles";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "London Airport Taxi Services | Book Airport Transfers 24/7",
  description:
    "Pre-booked London taxi and airport transfers with transparent pricing and premium vehicles.",
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
