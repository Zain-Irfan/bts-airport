const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseRegisterBody(body: unknown):
  | { ok: true; data: RegisterInput }
  | { ok: false; error: string } {
  const b = body as Record<string, unknown>;
  const fullName = String(b.fullName ?? "").trim();
  const email = String(b.email ?? "").trim().toLowerCase();
  const password = String(b.password ?? "");
  const phone = String(b.phone ?? "").trim();
  const licenseNumber = String(b.licenseNumber ?? "").trim();
  const vehicleType = String(b.vehicleType ?? "").trim();
  const vehicleModel = String(b.vehicleModel ?? "").trim() || null;
  const vehiclePlate = String(b.vehiclePlate ?? "").trim() || null;
  const experience = String(b.experience ?? "").trim() || null;
  const address = String(b.address ?? "").trim() || null;

  if (fullName.length < 2) {
    return { ok: false, error: "Full name is required" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address" };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters" };
  }
  if (phone.length < 8) {
    return { ok: false, error: "Enter a valid phone number" };
  }
  if (!licenseNumber) {
    return { ok: false, error: "Driver licence number is required" };
  }
  if (licenseNumber.length < 3) {
    return { ok: false, error: "Enter a valid driver licence number" };
  }
  if (!vehicleType) {
    return { ok: false, error: "Vehicle type is required" };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      password,
      phone,
      licenseNumber,
      vehicleType,
      vehicleModel,
      vehiclePlate,
      experience,
      address,
    },
  };
}

export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  licenseNumber: string;
  vehicleType: string;
  vehicleModel: string | null;
  vehiclePlate: string | null;
  experience: string | null;
  address: string | null;
};

function formString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Mobile register: multipart/form-data with text fields + `licenseImage` file. */
export function parseRegisterFormData(form: FormData):
  | { ok: true; data: RegisterInput }
  | { ok: false; error: string } {
  return parseRegisterBody({
    fullName: formString(form.get("fullName")),
    email: formString(form.get("email")),
    password: formString(form.get("password")),
    phone: formString(form.get("phone")),
    licenseNumber: formString(form.get("licenseNumber")),
    vehicleType: formString(form.get("vehicleType")),
    vehicleModel: formString(form.get("vehicleModel")),
    vehiclePlate: formString(form.get("vehiclePlate")),
    experience: formString(form.get("experience")),
    address: formString(form.get("address")),
  });
}

export function parseProfilePatch(body: unknown):
  | { ok: true; data: ProfilePatchInput }
  | { ok: false; error: string } {
  const b = body as Record<string, unknown>;
  const data: ProfilePatchInput = {};

  if (b.phone !== undefined) {
    const phone = String(b.phone).trim();
    if (phone.length < 8) {
      return { ok: false, error: "Enter a valid phone number" };
    }
    data.phone = phone;
  }
  if (b.vehicleType !== undefined) {
    const vehicleType = String(b.vehicleType).trim();
    if (!vehicleType) {
      return { ok: false, error: "Vehicle type is required" };
    }
    data.vehicleType = vehicleType;
  }
  if (b.vehicleModel !== undefined) {
    data.vehicleModel = String(b.vehicleModel).trim() || null;
  }
  if (b.vehiclePlate !== undefined) {
    data.vehiclePlate = String(b.vehiclePlate).trim() || null;
  }
  if (b.experience !== undefined) {
    data.experience = String(b.experience).trim() || null;
  }
  if (b.address !== undefined) {
    data.address = String(b.address).trim() || null;
  }

  if (Object.keys(data).length === 0) {
    return { ok: false, error: "No fields to update" };
  }

  return { ok: true, data };
}

export type ProfilePatchInput = {
  phone?: string;
  vehicleType?: string;
  vehicleModel?: string | null;
  vehiclePlate?: string | null;
  experience?: string | null;
  address?: string | null;
};

export function parseJsonBody(body: unknown): { email?: string; password?: string; token?: string } {
  const b = body as Record<string, unknown>;
  return {
    email: b.email !== undefined ? String(b.email).trim().toLowerCase() : undefined,
    password: b.password !== undefined ? String(b.password) : undefined,
    token: b.token !== undefined ? String(b.token).trim() : undefined,
  };
}
