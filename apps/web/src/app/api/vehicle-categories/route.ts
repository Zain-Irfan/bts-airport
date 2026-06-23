import { prisma } from "@/lib/prisma";
import { vehicleCategoryToDTO } from "@/lib/vehicle-category";

/** Public list for quote filters (active categories only). */
export async function GET() {
  const rows = await prisma.vehicleCategory.findMany({
    where: { isActive: true },
    orderBy: { label: "asc" },
  });

  return Response.json({ items: rows.map(vehicleCategoryToDTO) });
}
