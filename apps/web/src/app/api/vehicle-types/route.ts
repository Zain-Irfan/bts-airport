import { prisma } from "@/lib/prisma";
import { vehicleTypeToDTO } from "@/lib/vehicle-types";

/** Public list for quote UI (active tiers only). */
export async function GET() {
  const rows = await prisma.vehicleType.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  return Response.json({ items: rows.map(vehicleTypeToDTO) });
}
