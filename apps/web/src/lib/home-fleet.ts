// Server-only: the homepage "Our fleet" cards, from the vehicle types managed in Admin → Vehicle types.
import { prisma } from "@/lib/prisma";

export type HomeFleetVehicle = {
  name: string;
  note: string;
  pax: number;
  hand: number;
  lug: number;
  img: string;
};

const DEFAULT_IMAGE = "/images/saloon.jpeg";

/** Shown only if the DB can't be reached, so the homepage still renders. */
const FALLBACK_FLEET: HomeFleetVehicle[] = [
  { name: "Saloon", note: "Everyday comfort", pax: 4, hand: 1, lug: 2, img: "/images/saloon.jpeg" },
  { name: "Executive", note: "Business-class travel", pax: 4, hand: 1, lug: 1, img: "/images/vehicle-sclass-new.jpg" },
  { name: "Estate", note: "Extra boot space", pax: 4, hand: 2, lug: 3, img: "/images/vehicle-estate.jpg" },
  { name: "MPV", note: "Ideal for families", pax: 6, hand: 3, lug: 4, img: "/images/vehicle-vclass-8seater.jpg" },
  { name: "8 Seater Minibus", note: "Groups and tours", pax: 8, hand: 4, lug: 6, img: "/images/vehicle-transit.jpg" },
  { name: "Electric", note: "Zero-emission travel", pax: 4, hand: 2, lug: 1, img: "/images/saloon.jpeg" },
  { name: "Chauffeur", note: "Special occasions", pax: 4, hand: 1, lug: 2, img: "/images/vehicle-sclass-old.jpg" },
];

export async function getHomeFleet(): Promise<HomeFleetVehicle[]> {
  try {
    const rows = await prisma.vehicleType.findMany({
      where: { isActive: true },
      // Cheapest first: saloon → … → chauffeur
      orderBy: [{ minimumFareGbp: "asc" }, { name: "asc" }],
    });
    if (!rows.length) return FALLBACK_FLEET;
    return rows.map((v) => ({
      name: v.name,
      note: v.subtitle ?? "",
      pax: v.maxPassengers,
      hand: v.maxHandLuggage,
      lug: v.maxSuitcases,
      img: v.imageUrl || DEFAULT_IMAGE,
    }));
  } catch {
    return FALLBACK_FLEET;
  }
}
