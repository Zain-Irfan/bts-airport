import { authStaff } from "@/lib/auth";
import { saveUpload } from "@/lib/upload-image";

export const runtime = "nodejs";

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

  const saved = await saveUpload(file);
  if (!saved.ok) {
    return Response.json({ error: saved.error }, { status: 400 });
  }
  return Response.json({ url: saved.url });
}
