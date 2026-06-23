import { authStaff } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  const contact = await prisma.contact.update({
    where: { id },
    data: { read: true },
  });

  return Response.json(contact);
}
