export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { SettingsClient } from "@/components/admin/SettingsClient";
import { maskedStripeKey, stripeMode } from "@/lib/stripe";

export default async function SettingsPage() {
  const rows = await prisma.setting.findMany();
  const settings: Record<string, string> = {};
  for (const row of rows) settings[row.key] = row.value;

  // Only a masked summary goes to the browser — Stripe keys live in server env vars.
  const stripe = {
    mode: stripeMode(),
    maskedKey: maskedStripeKey(),
    webhookConfigured: Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim()),
  };

  return (
    <>
      <AdminTopbar title="Settings" />
      <AdminPageContent>
        <SettingsClient
          initial={settings}
          stripe={stripe}
        />
      </AdminPageContent>
    </>
  );
}
