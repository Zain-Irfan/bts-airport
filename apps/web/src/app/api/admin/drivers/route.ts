import { authStaff } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { sendDriverStatusEmail } from "@/lib/email";

export async function DELETE(req: NextRequest) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  await prisma.driver.delete({ where: { id } });
  return Response.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, status, reviewNotes } = body;

  if (!id || !["APPROVED", "REJECTED"].includes(status)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const driver = await prisma.driver.update({
    where: { id },
    data: {
      status,
      reviewNotes: reviewNotes || null,
      reviewedAt: new Date(),
    },
  });

  if (process.env.RESEND_API_KEY) {
    sendDriverStatusEmail({
      name: driver.fullName,
      email: driver.email,
      status: status as "APPROVED" | "REJECTED",
      reviewNotes: reviewNotes || null,
    }).catch(() => {});
  }

  return Response.json(driver);
}
