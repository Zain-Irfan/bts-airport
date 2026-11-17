// Server-only: uploaded files are stored in the DB (`uploads` table) because Vercel's filesystem is
// read-only — writing to public/ works locally but fails (500) when deployed.
import { prisma } from "@/lib/prisma";

export const IMAGE_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;

const IMAGE_TYPES = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

type SaveOptions = {
  /** Private files (driver licences) are only served to signed-in staff. */
  isPrivate?: boolean;
  allowPdf?: boolean;
};

/** Saves an uploaded image (or PDF) and returns the URL it is served from, e.g. /api/uploads/<id>.jpg */
export async function saveUpload(
  file: File,
  { isPrivate = false, allowPdf = false }: SaveOptions = {},
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (file.size === 0) {
    return { ok: false, error: "Empty file" };
  }
  if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
    return { ok: false, error: "File too large (max 5MB)" };
  }

  const ext = file.type === "application/pdf" && allowPdf ? ".pdf" : IMAGE_TYPES.get(file.type);
  if (!ext) {
    return {
      ok: false,
      error: allowPdf
        ? "Only JPEG, PNG, WebP, GIF, or PDF files are allowed"
        : "Only JPEG, PNG, WebP, or GIF images are allowed",
    };
  }

  const upload = await prisma.upload.create({
    data: {
      contentType: file.type === "image/jpg" ? "image/jpeg" : file.type,
      data: new Uint8Array(await file.arrayBuffer()),
      isPrivate,
    },
    select: { id: true },
  });

  // The extension is cosmetic (the admin UI checks for ".pdf"); the id identifies the file.
  return { ok: true, url: `/api/uploads/${upload.id}${ext}` };
}
