import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { SettingsClient } from "@/components/admin/SettingsClient";

export default async function SettingsPage() {
  const rows = await prisma.setting.findMany();
  const settings: Record<string, string> = {};
  for (const row of rows) settings[row.key] = row.value;

  // Tell the client which key is actually active and where it came from
  const dbKey  = settings["revolut_secret_key"]?.trim() ?? "";
  const envKey = process.env.REVOLUT_MERCHANT_SECRET_KEY?.trim() ?? "";
  const revolutActiveKey    = dbKey || envKey;
  const revolutActiveSource = dbKey ? "db" : envKey ? "env" : "none";

  return (
    <>
      <AdminTopbar title="Settings" />
      <AdminPageContent>
        <SettingsClient
          initial={settings}
          revolutActiveKey={revolutActiveKey}
          revolutActiveSource={revolutActiveSource as "db" | "env" | "none"}
        />
      </AdminPageContent>
    </>
  );
}
