"use client";

import { CustomerPhoneField } from "@/components/auth/CustomerPhoneField";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
};

export function BookingPhoneField({ value = "", onChange, required }: Props) {
  return (
    <CustomerPhoneField
      variant="light"
      value={value}
      onChange={(v) => onChange?.(v)}
      required={required}
    />
  );
}
