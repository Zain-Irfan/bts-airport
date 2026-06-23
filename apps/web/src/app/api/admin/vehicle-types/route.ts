import { authStaff } from "@/lib/auth";
import { assertActiveVehicleCategory } from "@/lib/vehicle-category-validation";
import { prisma } from "@/lib/prisma";
import { vehicleTypeToDTO } from "@/lib/vehicle-types";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.vehicleType.findMany({
    orderBy: { name: "asc" },
  });

  return Response.json({ items: rows.map(vehicleTypeToDTO) });
}

export async function POST(req: NextRequest) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    slug,
    name,
    subtitle,
    imageUrl,
    maxPassengers,
    maxHandLuggage,
    maxSuitcases,
    baseFareGbp,
    perMileGbp,
    minimumFareGbp,
    promoDiscountPercent,
    categoryKey,
    isActive,
  } = body;

  if (!slug || !name) {
    return Response.json({ error: "Slug and name are required" }, { status: 400 });
  }

  const slugNorm = String(slug)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  if (!slugNorm) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }

  const categoryKeyNorm = categoryKey ? String(categoryKey).trim().toLowerCase() : "saloon";
  const categoryErr = await assertActiveVehicleCategory(categoryKeyNorm);
  if (categoryErr) {
    return Response.json({ error: categoryErr }, { status: 400 });
  }

  try {
    const created = await prisma.vehicleType.create({
      data: {
        slug: slugNorm,
        name: String(name).trim(),
        subtitle: subtitle ? String(subtitle).trim() : null,
        imageUrl: imageUrl ? String(imageUrl).trim() : null,
        maxPassengers: Math.min(16, Math.max(1, Number(maxPassengers) || 4)),
        maxHandLuggage: Math.min(10, Math.max(0, Number(maxHandLuggage) || 0)),
        maxSuitcases: Math.min(10, Math.max(0, Number(maxSuitcases) || 0)),
        baseFareGbp: String(baseFareGbp ?? "0"),
        perMileGbp: String(perMileGbp ?? "0"),
        minimumFareGbp: String(minimumFareGbp ?? "0"),
        promoDiscountPercent: String(promoDiscountPercent ?? "0"),
        categoryKey: categoryKeyNorm,
        isActive: Boolean(isActive),
      },
    });

    return Response.json(vehicleTypeToDTO(created));
  } catch (e: unknown) {
    const code = typeof e === "object" && e && "code" in e ? (e as { code?: string }).code : "";
    if (code === "P2002") {
      return Response.json({ error: "Slug already in use" }, { status: 409 });
    }
    throw e;
  }
}
