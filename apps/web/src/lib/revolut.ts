import { requireAppBaseUrl } from "@/lib/app-url";
import { paymentSuccessPath } from "@/lib/payment-session-param";
import { prisma } from "@/lib/prisma";

const API_VERSION = process.env.REVOLUT_API_VERSION?.trim() || "2024-09-01";

function revolutApiBase(): string {
  const env = process.env.REVOLUT_ENV?.trim()?.toLowerCase();
  if (env === "production" || env === "live") {
    return "https://merchant.revolut.com";
  }
  return "https://sandbox-merchant.revolut.com";
}

/** Returns the Revolut secret key — DB setting takes priority over env var. */
export function getRevolutSecretKey(): string | undefined {
  return process.env.REVOLUT_MERCHANT_SECRET_KEY?.trim();
}

/** Async version: checks DB first, falls back to env var. */
export async function getRevolutSecretKeyAsync(): Promise<string | undefined> {
  try {
    const row = await prisma.setting.findUnique({ where: { key: "revolut_secret_key" } });
    if (row?.value?.trim()) return row.value.trim();
  } catch { /* fall through */ }
  return process.env.REVOLUT_MERCHANT_SECRET_KEY?.trim();
}

export type RevolutCreateOrderInput = {
  amountMinor: number;
  currency: string;
  description: string;
  redirectUrl: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  metadata?: Record<string, string>;
};

export type RevolutOrder = {
  id: string;
  token: string;
  state: string;
  amount: number;
  currency: string;
  checkout_url?: string;
};

export async function createRevolutOrder(input: RevolutCreateOrderInput): Promise<RevolutOrder> {
  const secret = await getRevolutSecretKeyAsync();
  if (!secret) {
    throw new Error("REVOLUT_MERCHANT_SECRET_KEY is not configured");
  }

  const res = await fetch(`${revolutApiBase()}/api/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      "Revolut-Api-Version": API_VERSION,
    },
    body: JSON.stringify({
      amount: input.amountMinor,
      currency: input.currency.toUpperCase(),
      description: input.description.slice(0, 250),
      redirect_url: input.redirectUrl,
      customer: {
        email: input.customerEmail,
        full_name: input.customerName,
        ...(input.customerPhone
          ? { phone: normalisePhoneE164(input.customerPhone) }
          : {}),
      },
      metadata: input.metadata,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as RevolutOrder & {
    message?: string;
    code?: string;
  };

  if (!res.ok) {
    const detail = data.message || data.code || JSON.stringify(data);
    throw new Error(detail || `Revolut create order failed (${res.status})`);
  }

  if (!data.checkout_url || !data.id) {
    throw new Error("Revolut did not return a checkout URL");
  }

  return data;
}

export async function retrieveRevolutOrder(orderId: string): Promise<RevolutOrder> {
  const secret = await getRevolutSecretKeyAsync();
  if (!secret) {
    throw new Error("REVOLUT_MERCHANT_SECRET_KEY is not configured");
  }

  const res = await fetch(`${revolutApiBase()}/api/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${secret}`,
      "Revolut-Api-Version": API_VERSION,
    },
    signal: AbortSignal.timeout(20_000),
  });

  const data = (await res.json().catch(() => ({}))) as RevolutOrder & { message?: string };
  if (!res.ok) {
    throw new Error(data.message || `Revolut retrieve order failed (${res.status})`);
  }
  return data;
}

export function gbpToMinorUnits(amountGbp: number): number {
  return Math.max(1, Math.round(amountGbp * 100));
}

export function buildPaymentRedirectUrl(sessionId: string, request?: Request): string {
  const base = requireAppBaseUrl(request);
  return `${base}${paymentSuccessPath(sessionId)}`;
}

/** Normalise phone for Revolut (E.164). */
export function normalisePhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return phone;
  if (phone.trim().startsWith("+")) return `+${digits}`;
  if (digits.startsWith("44")) return `+${digits}`;
  if (digits.startsWith("0")) return `+44${digits.slice(1)}`;
  return `+${digits}`;
}
