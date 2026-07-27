import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  return _resend;
}
const FROM = process.env.EMAIL_FROM || "London Airport Taxi Services Transfers <bookings@bts.uk>";

export type BookingEmailData = {
  customerName: string;
  customerEmail: string;
  bookingId: string;
  pickup: string;
  dropoff: string;
  date: string;   // formatted e.g. "12 June 2026"
  time: string;
  passengers: number;
  luggage: number;
  vehicleType?: string | null;
  fare?: number | null;
  flightNumber?: string | null;
  meetGreet?: boolean;
};

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const fareStr = data.fare ? `£${Number(data.fare).toFixed(2)}` : null;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Booking Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#404040,#333333);padding:32px 32px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">London Airport Taxi Services Transfers</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">London's Premium Transfer Service</p>
            </td>
          </tr>

          <!-- Success banner -->
          <tr>
            <td style="background:#ecfdf5;padding:20px 32px;border-bottom:1px solid #d1fae5;text-align:center;">
              <p style="margin:0;color:#065f46;font-size:15px;font-weight:700;">✅ Booking Confirmed!</p>
              <p style="margin:4px 0 0;color:#047857;font-size:13px;">Your transfer has been successfully booked.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 20px;color:#374151;font-size:14px;">Hi <strong>${data.customerName}</strong>,</p>
              <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">
                Thank you for booking with London Airport Taxi Services Transfers. Here are your booking details:
              </p>

              <!-- Booking ref -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;margin-bottom:20px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Booking Reference</p>
                    <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#111827;font-family:monospace;">${data.bookingId}</p>
                  </td>
                </tr>
              </table>

              <!-- Journey details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;margin-bottom:20px;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:16px 18px 12px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Journey Details</p>
                  </td>
                </tr>
                ${row("📍 Pickup", data.pickup)}
                ${row("🏁 Drop-off", data.dropoff)}
                ${row("📅 Date", `${data.date} at ${data.time}`)}
                ${row("👥 Passengers", String(data.passengers))}
                ${row("🧳 Luggage", String(data.luggage))}
                ${data.vehicleType ? row("🚗 Vehicle", data.vehicleType) : ""}
                ${data.flightNumber ? row("✈️ Flight", data.flightNumber) : ""}
                ${data.meetGreet ? row("🤝 Meet & Greet", "Included") : ""}
                ${fareStr ? row("💷 Total Paid", fareStr) : ""}
              </table>

              <p style="margin:0 0 8px;color:#374151;font-size:13px;line-height:1.6;">
                Your driver will be in touch before your journey. If you have any questions, reply to this email or contact us via WhatsApp.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">London Airport Taxi Services Transfers · London, United Kingdom</p>
              <p style="margin:6px 0 0;color:#9ca3af;font-size:11px;">This is an automated confirmation email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await getResend().emails.send({
    from: FROM,
    to: data.customerEmail,
    subject: `Booking Confirmed – ${data.pickup} → ${data.dropoff} on ${data.date}`,
    html,
  });
}

/* ─── Contact form: notify admin ─────────────────────────────────────────── */
export async function sendContactNotificationEmail(data: {
  name: string; email: string; phone?: string | null; message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM?.match(/<(.+)>/)?.[1] || process.env.EMAIL_FROM || "";
  if (!adminEmail) return;

  await getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New contact message from ${data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
        <h2 style="color:#333333;margin-bottom:16px;">New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;border-left:4px solid #333333;">
          <p style="margin:0;white-space:pre-wrap;">${data.message}</p>
        </div>
      </div>`,
  });
}

/* ─── Contact form: confirm to sender ───────────────────────────────────── */
export async function sendContactConfirmationEmail(data: { name: string; email: string }) {
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: "We received your message — London Airport Taxi Services Transfers",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
        <h2 style="color:#333333;">Thanks for getting in touch, ${data.name}!</h2>
        <p>We've received your message and will get back to you within <strong>24 hours</strong>.</p>
        <p style="color:#6b7280;font-size:13px;">London Airport Taxi Services Transfers · London, United Kingdom</p>
      </div>`,
  });
}

/* ─── Driver application: confirm to applicant ──────────────────────────── */
export async function sendDriverApplicationEmail(data: { name: string; email: string }) {
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: "Application received — London Airport Taxi Services Transfers",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
        <h2 style="color:#333333;">Hi ${data.name}, we've received your application!</h2>
        <p>Thank you for applying to drive with London Airport Taxi Services Transfers. Our team will review your details and contact you within <strong>48 hours</strong>.</p>
        <p style="color:#6b7280;font-size:13px;">London Airport Taxi Services Transfers · London, United Kingdom</p>
      </div>`,
  });
}

/* ─── Driver application: notify admin ──────────────────────────────────── */
export async function sendDriverApplicationAdminEmail(data: { name: string; email: string; phone: string }) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM?.match(/<(.+)>/)?.[1] || process.env.EMAIL_FROM || "";
  if (!adminEmail) return;

  await getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New driver application from ${data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
        <h2 style="color:#333333;">New Driver Application</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p style="margin-top:16px;"><a href="${process.env.NEXT_PUBLIC_APP_URL || ""}/admin/drivers" style="background:#333333;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">Review in Admin →</a></p>
      </div>`,
  });
}

/* ─── Driver approved / rejected ─────────────────────────────────────────── */
export async function sendDriverStatusEmail(data: {
  name: string; email: string; status: "APPROVED" | "REJECTED"; reviewNotes?: string | null;
}) {
  const approved = data.status === "APPROVED";
  await getResend().emails.send({
    from: FROM,
    to: data.email,
    subject: approved ? "Your application has been approved — London Airport Taxi Services Transfers" : "Update on your London Airport Taxi Services Transfers application",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
        <h2 style="color:${approved ? "#065f46" : "#991b1b"};">${approved ? "🎉 Congratulations, you're approved!" : "Application update"}</h2>
        <p>Hi ${data.name},</p>
        ${approved
          ? `<p>Your driver application has been <strong>approved</strong>. Welcome to London Airport Taxi Services Transfers! Our team will be in touch with next steps.</p>`
          : `<p>Unfortunately your application was <strong>not approved</strong> at this time.</p>`
        }
        ${data.reviewNotes ? `<div style="margin-top:12px;padding:12px;background:#f9fafb;border-radius:8px;"><strong>Notes:</strong> ${data.reviewNotes}</div>` : ""}
        <p style="color:#6b7280;font-size:13px;margin-top:24px;">London Airport Taxi Services Transfers · London, United Kingdom</p>
      </div>`,
  });
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 18px;border-bottom:1px solid #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:130px;font-size:12px;color:#6b7280;font-weight:600;vertical-align:top;">${label}</td>
            <td style="font-size:13px;color:#111827;font-weight:500;">${value}</td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}
