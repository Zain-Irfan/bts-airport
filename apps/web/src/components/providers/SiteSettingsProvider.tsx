"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/site-settings";

const SiteSettingsContext = createContext<SiteSettings>({
  whatsapp: "447700140900",
  phone: "+44 2080 5090 14",
  email: "support@BTS.uk",
});

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
