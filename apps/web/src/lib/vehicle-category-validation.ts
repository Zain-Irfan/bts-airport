import { prisma } from "@/lib/prisma";

/** For new / updated vehicle types: category must exist and be active. */
export async function assertActiveVehicleCategory(categoryKey: string): Promise<string | null> {
  const key = String(categoryKey || "saloon").trim().toLowerCase();
  const cat = await prisma.vehicleCategory.findUnique({ where: { slug: key } });
  if (!cat) {
    return "Unknown category. Add it under Admin → Vehicle categories first.";
  }
  if (!cat.isActive) {
    return "That category is inactive. Choose another or re-activate the category.";
  }
  return null;
}
