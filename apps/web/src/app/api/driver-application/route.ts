import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { savePublicImage } from "@/lib/upload-image";
import { sendDriverApplicationEmail, sendDriverApplicationAdminEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Use multipart/form-data" }, { status: 400 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const get = (key: string) => (form.get(key) as string | null)?.trim() ?? "";

  // Required
  const fullName   = get("fullName");
  const email      = get("email");
  const phone      = get("phone");
  const dob        = get("dob");
  const licenseNum = get("licenseNum");

  // Optional
  const address      = get("address");
  const drivenBefore = get("drivenBefore");
  const experience   = get("experience");
  const vehicleType  = get("vehicleType");
  const vehicleModel = get("vehicleModel");
  const vehiclePlate = get("vehiclePlate");

  if (!fullName || !email || !phone || !dob || !licenseNum) {
    return NextResponse.json(
      { error: "Full name, email, phone, date of birth and PCO licence number are required" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Duplicate check
  const existing = await prisma.driver.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An application with this email already exists" },
      { status: 409 },
    );
  }

  // Licence image / PDF (optional)
  let licenseImageUrl: string | undefined;
  const licenseFile = form.get("licenseImage");
  if (licenseFile instanceof File && licenseFile.size > 0) {
    const saved = await savePublicImage(licenseFile, "driver-licenses");
    if (!saved.ok) {
      return NextResponse.json({ error: saved.error }, { status: 400 });
    }
    licenseImageUrl = saved.url;
  }

  // Auto-generate a placeholder password — driver sets their own after approval
  const tempPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  const hashed = await bcrypt.hash(tempPassword, 12);

  // Store extra metadata that isn't a dedicated column into reviewNotes
  const noteParts = [
    dob          ? `Date of birth: ${dob}`          : null,
    drivenBefore ? `Driven before: ${drivenBefore}` : null,
  ].filter(Boolean);
  const reviewNotes = noteParts.length ? noteParts.join(" | ") : null;

  await prisma.driver.create({
    data: {
      fullName,
      email,
      phone,
      licenseNumber:  licenseNum,
      licenseImageUrl: licenseImageUrl ?? undefined,
      password:        hashed,
      vehicleType:     vehicleType  || undefined,
      vehicleModel:    vehicleModel || undefined,
      vehiclePlate:    vehiclePlate || undefined,
      experience:      experience   || undefined,
      address:         address      || undefined,
      reviewNotes:     reviewNotes  ?? undefined,
      status:          "PENDING",
    },
  });

  if (process.env.RESEND_API_KEY) {
    sendDriverApplicationEmail({ name: fullName, email }).catch(() => {});
    sendDriverApplicationAdminEmail({ name: fullName, email, phone }).catch(() => {});
  }

  return NextResponse.json(
    { ok: true, message: "Application submitted. Our team will contact you within 48 hours." },
    { status: 201 },
  );
}
