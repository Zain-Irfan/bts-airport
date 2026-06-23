import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { authStaff } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export async function POST(req: Request) {
  const session = await authStaff();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file field" }, { status: 400 });
  }

  if (file.size === 0) {
    return Response.json({ error: "Empty file" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return Response.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return Response.json({ error: "Only JPEG, PNG, WebP, or GIF images are allowed" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const name = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "vehicle-types");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buf);

  const url = `/uploads/vehicle-types/${name}`;
  return Response.json({ url });
}
