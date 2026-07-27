"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import {
  BadgeCheck, Headphones, MapPinned, ShieldCheck,
  Upload, CheckCircle2, AlertCircle, Loader2, X, FileText,
} from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

const perks = [
  {
    title: "Premium fares",
    desc: "Transparent rates and weekly payouts on every confirmed booking.",
    icon: BadgeCheck,
  },
  {
    title: "London-wide demand",
    desc: "Airport, station, and corporate jobs routed straight to your app.",
    icon: MapPinned,
  },
  {
    title: "Driver protection",
    desc: "Comprehensive screening, monitored journeys, and 24/7 support.",
    icon: ShieldCheck,
  },
  {
    title: "Real human support",
    desc: "Dedicated UK driver care team you can reach by phone or WhatsApp.",
    icon: Headphones,
  },
];

const VEHICLE_TYPES = [
  "Saloon",
  "Estate",
  "MPV / People Carrier",
  "Executive Saloon",
  "Executive MPV",
  "Minibus (8 seats)",
  "Other",
];

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

export default function DriveWithUsPage() {
  // Personal details
  const [fullName, setFullName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [dob, setDob]             = useState("");
  const [address, setAddress]     = useState("");

  // Experience
  const [drivenBefore, setDrivenBefore] = useState("");
  const [experience, setExperience]     = useState("");

  // Vehicle
  const [vehicleType, setVehicleType]   = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");

  // Licence
  const [licenseNum, setLicenseNum]     = useState("");
  const [licenseFile, setLicenseFile]   = useState<File | null>(null);
  const [fileError, setFileError]       = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [agreed, setAgreed]   = useState(false);
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFileError("");
    if (!file) { setLicenseFile(null); return; }
    if (file.size > MAX_FILE_BYTES) {
      setFileError("File is too large. Maximum size is 5 MB.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Only JPEG, PNG, WebP, or PDF files are accepted.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setLicenseFile(file);
  }

  function removeFile() {
    setLicenseFile(null);
    setFileError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setStatus("error");
      setMessage("Please tick the agreement checkbox before submitting.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const form = new FormData();
    form.append("fullName",     fullName);
    form.append("email",        email);
    form.append("phone",        phone);
    form.append("dob",          dob);
    form.append("address",      address);
    form.append("drivenBefore", drivenBefore);
    form.append("experience",   experience);
    form.append("vehicleType",  vehicleType);
    form.append("vehicleModel", vehicleModel);
    form.append("vehiclePlate", vehiclePlate);
    form.append("licenseNum",   licenseNum);
    if (licenseFile) form.append("licenseImage", licenseFile);

    try {
      const res  = await fetch("/api/driver-application", { method: "POST", body: form });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(json.message ?? "Application submitted successfully!");
      } else {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteTopHeader />
        <section className="BTS-hero-ambient BTS-luxury-section-3 BTS-grid-bg relative flex min-h-[70vh] items-center justify-center overflow-hidden py-20">
          <div className="container mx-auto max-w-lg px-4 text-center">
            <div className="BTS-card p-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(51, 51, 51,0.25)] ring-1 ring-[rgba(153, 153, 153,0.35)]">
                <CheckCircle2 className="h-10 w-10 text-[#999999]" />
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-[#F8F8F8]">Application Received!</h2>
              <p className="mb-8 text-sm leading-relaxed text-[#CFCFCF]">{message}</p>
              <a
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#404040_0%,#333333_55%,#262626_100%)] px-8 text-sm font-semibold text-[#F8F8F8] transition-all hover:-translate-y-[1px]"
              >
                Back to home
              </a>
            </div>
          </div>
        </section>
        <FullFooterSection />
      </div>
    );
  }

  /* ── Main form ── */
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <section className="BTS-hero-ambient BTS-luxury-section-3 BTS-grid-bg relative overflow-hidden py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">

            {/* Left — perks */}
            <div className="space-y-6">
              <span className="BTS-pill">Drive with London Airport Taxi Services</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] md:text-5xl">
                Come Drive With London Airport Taxi Services
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                Apply today to join London&apos;s premium pre-booked transfer
                network. Steady demand. Professional brand. Fair pay.
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
                Currently accepting drivers based in London
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={perk.title}
                      className="rounded-2xl border border-[rgba(192,192,192,0.28)] bg-[linear-gradient(135deg,rgba(192,192,192,0.07)_0%,rgba(26,26,29,0.65)_50%,rgba(13,13,15,0.78)_100%)] p-5 shadow-[inset_0_1px_0_rgba(192,192,192,0.12)] backdrop-blur-md"
                    >
                      <div className="BTS-icon-halo mb-3 h-10 w-10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#F8F8F8]">{perk.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#A5A7AA]">{perk.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — form */}
            <div className="BTS-card p-6 md:p-8">
              <div className="mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
                  Driver application
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#F8F8F8]">
                  Start your application
                </h2>
                <p className="mt-2 text-sm text-[#CFCFCF]">
                  Tell us about you — our driver team will reach out within 48 hours.
                </p>
              </div>

              {status === "error" && (
                <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* ── Section: Personal Details ── */}
                <SectionHeading>Personal Details</SectionHeading>

                <Field
                  id="full-name" label="Full name *" placeholder="Enter your full name"
                  value={fullName} onChange={(e) => setFullName(e.target.value)} required
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    id="email" type="email" label="Email *" placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} required
                  />
                  <Field
                    id="phone" type="tel" label="Phone *" placeholder="+44…"
                    value={phone} onChange={(e) => setPhone(e.target.value)} required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    id="dob" type="date" label="Date of birth *"
                    value={dob} onChange={(e) => setDob(e.target.value)} required
                  />
                  <SelectField
                    id="driven-before" label="Driven for London Airport Taxi Services before?"
                    value={drivenBefore} onChange={(e) => setDrivenBefore(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </SelectField>
                </div>

                <TextareaField
                  id="address" label="Home address" placeholder="Full home address"
                  value={address} onChange={(e) => setAddress(e.target.value)}
                />

                {/* ── Section: Experience ── */}
                <SectionHeading>Experience</SectionHeading>

                <TextareaField
                  id="experience" label="Driving experience"
                  placeholder="e.g. 5 years private hire in London, previously worked with Uber / Addison Lee…"
                  value={experience} onChange={(e) => setExperience(e.target.value)}
                />

                {/* ── Section: Vehicle ── */}
                <SectionHeading>Vehicle Details</SectionHeading>

                <SelectField
                  id="vehicle-type" label="Vehicle type"
                  value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="">Select vehicle type</option>
                  {VEHICLE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </SelectField>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    id="vehicle-model" label="Vehicle make & model"
                    placeholder="e.g. Mercedes E-Class 2022"
                    value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)}
                  />
                  <Field
                    id="vehicle-plate" label="Registration plate"
                    placeholder="e.g. AB12 CDE"
                    value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)}
                  />
                </div>

                {/* ── Section: Licence ── */}
                <SectionHeading>Licence & Documents</SectionHeading>

                <Field
                  id="pco" label="PCO licence number *"
                  placeholder="Enter your PCO licence number"
                  value={licenseNum} onChange={(e) => setLicenseNum(e.target.value)} required
                />

                {/* Licence file upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
                    Licence photo / document
                    <span className="ml-1.5 normal-case tracking-normal text-[#6B7280]">
                      (JPEG, PNG, WebP or PDF · max 5 MB)
                    </span>
                  </label>

                  {licenseFile ? (
                    <div className="flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-lg border border-[rgba(153, 153, 153,0.4)] bg-[rgba(153, 153, 153,0.08)] px-4 py-3">
                      <FileText className="h-5 w-5 flex-none text-[#999999]" />
                      <span className="w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#F8F8F8]">{licenseFile.name}</span>
                      <span className="flex-none text-xs text-[#A5A7AA]">
                        {(licenseFile.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        type="button" onClick={removeFile}
                        className="flex-none rounded p-0.5 text-[#A5A7AA] transition hover:text-[#F8F8F8]"
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="license-upload"
                      className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[rgba(192,192,192,0.25)] bg-[rgba(13,13,15,0.5)] px-4 py-8 transition hover:border-[rgba(153, 153, 153,0.5)] hover:bg-[rgba(153, 153, 153,0.06)]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(51, 51, 51,0.2)] ring-1 ring-[rgba(153, 153, 153,0.3)] transition group-hover:bg-[rgba(51, 51, 51,0.3)]">
                        <Upload className="h-5 w-5 text-[#999999]" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-[#F8F8F8]">Click to upload your licence</p>
                        <p className="mt-0.5 text-xs text-[#A5A7AA]">or drag and drop</p>
                      </div>
                      <input
                        id="license-upload" ref={fileRef} type="file"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        className="sr-only" onChange={handleFile}
                      />
                    </label>
                  )}

                  {fileError && <p className="text-xs text-red-400">{fileError}</p>}
                </div>

                {/* ── Agreement ── */}
                <label className="flex items-start gap-3 pt-1 text-xs leading-relaxed text-[#A5A7AA]">
                  <input
                    type="checkbox" name="agree"
                    checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border border-[rgba(192,192,192,0.22)] bg-[rgba(13,13,15,0.6)] accent-[#999999]"
                  />
                  <span>
                    I agree that London Airport Taxi Services may contact me using the details provided above for the
                    purpose of processing this application.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreed || status === "loading"}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#404040_0%,#333333_55%,#262626_100%)] text-sm font-semibold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),inset_0_0_0_1px_rgba(51, 51, 51,0.4),0_10px_32px_-10px_rgba(51, 51, 51,0.55)] transition-all duration-500 hover:-translate-y-[1px] hover:border-[rgba(192,192,192,0.4)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),inset_0_0_0_1px_rgba(153, 153, 153,0.5),0_18px_48px_-10px_rgba(51, 51, 51,0.7),0_0_0_4px_rgba(51, 51, 51,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</>
                  ) : (
                    "Submit application"
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}

/* ── Helpers ── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#999999]">
        {children}
      </span>
      <span className="h-px flex-1 bg-[rgba(153, 153, 153,0.25)]" />
    </div>
  );
}

function Field({
  id, label, type = "text", placeholder, value, onChange, required,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
        {label}
      </label>
      <input
        id={id} name={id} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required}
        className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
      />
    </div>
  );
}

function SelectField({
  id, label, value, onChange, children,
}: {
  id: string; label: string;
  value: string; onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
        {label}
      </label>
      <select
        id={id} name={id} value={value} onChange={onChange}
        className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
      >
        {children}
      </select>
    </div>
  );
}

function TextareaField({
  id, label, placeholder, value, onChange,
}: {
  id: string; label: string; placeholder?: string;
  value: string; onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
        {label}
      </label>
      <textarea
        id={id} name={id} placeholder={placeholder} value={value} onChange={onChange}
        rows={3}
        className="form-field-light w-full rounded-lg px-3 py-2.5 text-sm outline-none transition"
      />
    </div>
  );
}
