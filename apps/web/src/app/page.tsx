import type { Metadata } from "next";
import { getHomeFleet } from "@/lib/home-fleet";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: {"absolute":"MRM Executive Voyage | London Airport Transfers & Chauffeur Service"},
  description: "Pre-book fixed-price London airport transfers and chauffeur journeys 24/7. Flight monitoring, free waiting time and licensed, professional drivers.",
};

export default async function HomePage() {
  // Cached with the page; admin edits to vehicle types refresh it (see refreshPublicPages).
  return <HomePageClient fleet={await getHomeFleet()} />;
}
