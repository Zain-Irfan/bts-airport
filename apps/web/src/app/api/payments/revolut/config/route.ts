import { NextResponse } from "next/server";
import { getAppBaseUrl } from "@/lib/app-url";
import { getRevolutSecretKey } from "@/lib/revolut";

/** Dev helper: verify Revolut env without exposing secrets. */
export async function GET(req: Request) {
  const redirectBase = getAppBaseUrl(req);
  return NextResponse.json({
    revolutKeyConfigured: Boolean(getRevolutSecretKey()),
    redirectBase: redirectBase || null,
    redirectOk: Boolean(redirectBase),
    env: process.env.REVOLUT_ENV ?? "sandbox",
    hint: !redirectBase
      ? "Set REVOLUT_REDIRECT_BASE_URL (ngrok) or NEXT_PUBLIC_APP_URL (e.g. http://BTS.test). Revolut rejects localhost."
      : undefined,
  });
}
