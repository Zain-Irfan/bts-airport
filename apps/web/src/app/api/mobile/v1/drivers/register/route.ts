import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  parseRegisterFormData,
} from "@/lib/mobile/driver-validation";
import { toDriverProfile } from "@/lib/mobile/driver-response";
import { savePublicImage } from "@/lib/upload-image";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      {
        error:
          "Use multipart/form-data with a licenseImage file and registration fields",
      },
      { status: 400 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const licenseFile = form.get("licenseImage");
  if (!(licenseFile instanceof File)) {
    return NextResponse.json(
      { error: "Driver licence photo is required (licenseImage file)" },
      { status: 400 },
    );
  }

  const parsed = parseRegisterFormData(form);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;

  const existing = await prisma.driver.findUnique({
    where: { email: data.email },
  });
  if (existing) {
    return NextResponse.json(
      { error: "An application with this email already exists" },
      { status: 409 },
    );
  }

  const saved = await savePublicImage(licenseFile, "driver-licenses");
  if (!saved.ok) {
    return NextResponse.json({ error: saved.error }, { status: 400 });
  }

  const hashed = await bcrypt.hash(data.password, 12);

  const driver = await prisma.driver.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      licenseNumber: data.licenseNumber,
      licenseImageUrl: saved.url,
      password: hashed,
      vehicleType: data.vehicleType,
      vehicleModel: data.vehicleModel,
      vehiclePlate: data.vehiclePlate,
      experience: data.experience,
      address: data.address,
      status: "PENDING",
    },
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Application submitted. You can log in after an admin approves your account.",
      driver: toDriverProfile(driver),
    },
    { status: 201 },
  );
}
