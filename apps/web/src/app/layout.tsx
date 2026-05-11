import type { Metadata } from "next";
import "./globals.css";
import "react-phone-input-2/lib/style.css";
import { RouteLoadingBar } from "@/components/layout/RouteLoadingBar";
import { ScrollRevealAuto } from "@/components/motion/ScrollRevealAuto";

export const metadata: Metadata = {
  title: "UKride | London transfers",
  description:
    "Pre-booked London taxi and airport transfers with transparent pricing and premium vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <RouteLoadingBar />
        <ScrollRevealAuto />
        {children}
      </body>
    </html>
  );
}
