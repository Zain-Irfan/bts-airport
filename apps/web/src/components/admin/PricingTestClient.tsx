"use client";

import { useState } from "react";
import { Calculator, Car, Users } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

type VehicleType = {
  id: string;
  name: string;
  baseFareGbp: number;
  perMileGbp: number;
  minimumFareGbp: number;
  promoDiscountPercent: number;
  maxPassengers: number;
};

export function PricingTestClient({ vehicleTypes }: { vehicleTypes: VehicleType[] }) {
  const { theme } = useAdminLayout();
  const isLight = theme === "light";
  const inputBg     = isLight ? "#FFFFFF" : "#0D0D0F";
  const inputBorder = isLight ? "#D1D5DB" : "rgba(192,192,192,0.18)";
  const inputColor  = isLight ? "#111827" : "#F8F8F8";
  const labelColor  = isLight ? "#6B7280" : "#A5A7AA";

  const [distance, setDistance] = useState("10");
  const [passengers, setPassengers] = useState("2");

  const distanceMiles = parseFloat(distance) || 0;

  const results = vehicleTypes
    .filter((v) => {
      const p = parseInt(passengers) || 1;
      return v.maxPassengers >= p;
    })
    .map((v) => {
      const raw = v.baseFareGbp + distanceMiles * v.perMileGbp;
      const fare = Math.max(raw, v.minimumFareGbp);
      const discounted = v.promoDiscountPercent > 0
        ? fare * (1 - v.promoDiscountPercent / 100)
        : null;
      return { ...v, fare, discounted };
    })
    .sort((a, b) => a.fare - b.fare);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-6" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="flex items-center gap-2 mb-5">
          <Calculator className="h-4 w-4" style={{ color: "#9B51E0" }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>Fare Calculator</h2>
        </div>
        <p className="text-xs mb-5" style={{ color: labelColor }}>
          Enter a journey distance in miles and number of passengers to preview fares for all active vehicle types.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 max-w-md">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: labelColor }}>
              Distance (miles)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="h-10 w-full rounded-lg border px-3 text-sm outline-none"
              style={{ background: inputBg, borderColor: inputBorder, color: inputColor }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: labelColor }}>
              Passengers
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="h-10 w-full rounded-lg border px-3 text-sm outline-none"
              style={{ background: inputBg, borderColor: inputBorder, color: inputColor }}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl border" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <div className="border-b px-5 py-4" style={{ borderColor: "var(--adm-border)" }}>
          <h3 className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>
            Results — {distanceMiles.toFixed(1)} miles, {passengers} passenger{parseInt(passengers) !== 1 ? "s" : ""}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--adm-border)" }}>
                {["Vehicle", "Max Pax", "Base Fare", "Per Mile", "Calculated", "After Promo", "Min Fare"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: labelColor }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm" style={{ color: labelColor }}>
                    No vehicles can accommodate {passengers} passengers
                  </td>
                </tr>
              ) : (
                results.map((v) => (
                  <tr key={v.id} style={{ borderBottom: "1px solid var(--adm-border-soft)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 shrink-0" style={{ color: labelColor }} />
                        <span className="font-medium" style={{ color: "var(--adm-text)" }}>{v.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" style={{ color: labelColor }} />
                        <span style={{ color: "var(--adm-text-sub)" }}>{v.maxPassengers}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--adm-text-sub)" }}>£{v.baseFareGbp.toFixed(2)}</td>
                    <td className="px-4 py-3" style={{ color: "var(--adm-text-sub)" }}>£{v.perMileGbp.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-base" style={{ color: "#10B981" }}>
                        £{v.fare.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {v.discounted !== null ? (
                        <span className="font-semibold" style={{ color: "#9B51E0" }}>
                          £{v.discounted.toFixed(2)}
                          <span className="ml-1 text-[10px]" style={{ color: labelColor }}>(-{v.promoDiscountPercent}%)</span>
                        </span>
                      ) : (
                        <span style={{ color: labelColor }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: labelColor }}>
                      £{v.minimumFareGbp.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formula explainer */}
      <div className="rounded-xl border p-5" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: labelColor }}>Fare Formula</p>
        <p className="text-sm font-mono" style={{ color: "var(--adm-text-sub)" }}>
          fare = max( baseFare + (distance × perMile), minimumFare )
        </p>
        <p className="mt-1 text-xs" style={{ color: labelColor }}>
          If promoDiscountPercent &gt; 0, the displayed price is reduced by that percentage.
        </p>
      </div>
    </div>
  );
}
