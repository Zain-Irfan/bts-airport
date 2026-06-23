import { authStaff } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeCategorySlug, vehicleCategoryToDTO } from "@/lib/vehicle-category";
import { NextRequest } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await req.json();

  const existing = await prisma.vehicleCategory.findUnique({ where: { id } });
  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const newSlug =
    body.slug != null ? normalizeCategorySlug(String(body.slug)) : null;
  if (newSlug !== null && newSlug !== "" && newSlug !== existing.slug) {
    const clash = await prisma.vehicleCategory.findUnique({ where: { slug: newSlug } });
    if (clash) {
      return Response.json({ error: "Slug already in use" }, { status: 409 });
    }
    await prisma.$transaction([
      prisma.vehicleType.updateMany({
        where: { categoryKey: existing.slug },
        data: { categoryKey: newSlug },
      }),
      prisma.vehicleCategory.update({
        where: { id },
        data: { slug: newSlug },
      }),
    ]);
  }

  const data: { label?: string; isActive?: boolean } = {};
  if (body.label != null) data.label = String(body.label).trim();
  if (body.isActive != null) data.isActive = Boolean(body.isActive);

  if (Object.keys(data).length > 0) {
    await prisma.vehicleCategory.update({ where: { id }, data });
  }

  const updated = await prisma.vehicleCategory.findUniqueOrThrow({ where: { id } });
  return Response.json(vehicleCategoryToDTO(updated));
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;

  const existing = await prisma.vehicleCategory.findUnique({ where: { id } });
  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const inUse = await prisma.vehicleType.count({
    where: { categoryKey: existing.slug },
  });
  if (inUse > 0) {
    return Response.json(
      {
        error: `Cannot delete: ${inUse} vehicle type(s) use this category. Reassign them first or deactivate the category.`,
      },
      { status: 409 },
    );
  }

  await prisma.vehicleCategory.delete({ where: { id } });
  return Response.json({ ok: true });
}
