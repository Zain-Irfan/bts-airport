import { authStaff } from "@/lib/auth";
import { assertActiveVehicleCategory } from "@/lib/vehicle-category-validation";
import { prisma } from "@/lib/prisma";
import { vehicleTypeToDTO } from "@/lib/vehicle-types";
import { NextRequest } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await req.json();

  const data: Record<string, unknown> = {};

  if (body.name != null) data.name = String(body.name).trim();
  if (body.subtitle !== undefined) data.subtitle = body.subtitle ? String(body.subtitle).trim() : null;
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl ? String(body.imageUrl).trim() : null;
  if (body.maxPassengers != null) data.maxPassengers = Math.min(16, Math.max(1, Number(body.maxPassengers)));
  if (body.maxHandLuggage != null) data.maxHandLuggage = Math.min(10, Math.max(0, Number(body.maxHandLuggage)));
  if (body.maxSuitcases != null) data.maxSuitcases = Math.min(10, Math.max(0, Number(body.maxSuitcases)));
  if (body.baseFareGbp != null) data.baseFareGbp = String(body.baseFareGbp);
  if (body.perMileGbp != null) data.perMileGbp = String(body.perMileGbp);
  if (body.minimumFareGbp != null) data.minimumFareGbp = String(body.minimumFareGbp);
  if (body.promoDiscountPercent != null) data.promoDiscountPercent = String(body.promoDiscountPercent);
  if (body.categoryKey != null) {
    const nextKey = String(body.categoryKey).trim().toLowerCase();
    const categoryErr = await assertActiveVehicleCategory(nextKey);
    if (categoryErr) {
      return Response.json({ error: categoryErr }, { status: 400 });
    }
    data.categoryKey = nextKey;
  }
  if (body.isActive != null) data.isActive = Boolean(body.isActive);

  if (body.slug != null) {
    const slugNorm = String(body.slug)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    if (slugNorm) data.slug = slugNorm;
  }

  try {
    const updated = await prisma.vehicleType.update({
      where: { id },
      data,
    });
    return Response.json(vehicleTypeToDTO(updated));
  } catch (e: unknown) {
    const code = typeof e === "object" && e && "code" in e ? (e as { code?: string }).code : "";
    if (code === "P2025") {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    if (code === "P2002") {
      return Response.json({ error: "Slug already in use" }, { status: 409 });
    }
    throw e;
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;

  try {
    await prisma.vehicleType.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch (e: unknown) {
    const code = typeof e === "object" && e && "code" in e ? (e as { code?: string }).code : "";
    if (code === "P2025") {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    throw e;
  }
}
