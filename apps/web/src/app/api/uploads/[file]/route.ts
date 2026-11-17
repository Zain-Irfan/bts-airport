import type { NextRequest } from "next/server";
import { authStaff } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Serves files saved by saveUpload(). `file` is "<id>.<ext>"; private files need a staff session. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const id = file.replace(/\.[a-z0-9]+$/i, "");
  if (!/^[a-z0-9]{10,40}$/i.test(id)) {
    return new Response("Not found", { status: 404 });
  }

  const upload = await prisma.upload.findUnique({ where: { id } });
  if (!upload) {
    return new Response("Not found", { status: 404 });
  }
  if (upload.isPrivate && !(await authStaff())) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(upload.data, {
    headers: {
      "Content-Type": upload.contentType,
      "X-Content-Type-Options": "nosniff",
      // Uploads never change (a new upload gets a new id), so public ones can be cached for good.
      "Cache-Control": upload.isPrivate
        ? "private, no-store"
        : "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
