import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const IMAGE_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["application/pdf", ".pdf"],
]);

export async function savePublicImage(
  file: File,
  subdir: string,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (file.size === 0) {
    return { ok: false, error: "Empty file" };
  }
  if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
    return { ok: false, error: "File too large (max 5MB)" };
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return {
      ok: false,
      error: "Only JPEG, PNG, WebP, or PDF files are allowed",
    };
  }

  const name = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", subdir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return { ok: true, url: `/uploads/${subdir}/${name}` };
}
