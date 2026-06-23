import { authStaff } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeCategorySlug, vehicleCategoryToDTO } from "@/lib/vehicle-category";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.vehicleCategory.findMany({
    orderBy: [{ label: "asc" }],
  });

  return Response.json({ items: rows.map(vehicleCategoryToDTO) });
}

export async function POST(req: NextRequest) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slugRaw = body.slug;
  const label = body.label;

  if (!label || String(label).trim() === "") {
    return Response.json({ error: "Label is required" }, { status: 400 });
  }

  const slug = normalizeCategorySlug(String(slugRaw ?? ""));
  if (!slug) {
    return Response.json({ error: "Slug is required (letters, numbers, underscores)" }, { status: 400 });
  }

  try {
    const created = await prisma.vehicleCategory.create({
      data: {
        slug,
        label: String(label).trim(),
        isActive: body.isActive !== false,
      },
    });
    return Response.json(vehicleCategoryToDTO(created));
  } catch (e: unknown) {
    const code = typeof e === "object" && e && "code" in e ? (e as { code?: string }).code : "";
    if (code === "P2002") {
      return Response.json({ error: "Slug already in use" }, { status: 409 });
    }
    throw e;
  }
}
