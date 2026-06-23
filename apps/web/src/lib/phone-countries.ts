export type PhoneCountry = {
  iso2: string;
  name: string;
  dialCode: string;
};

/** Regional indicator emoji from ISO 3166-1 alpha-2 (e.g. gb → 🇬🇧). */
export function isoToFlagEmoji(iso2: string): string {
  const code = iso2.toUpperCase();
  if (code.length !== 2) return "🏳️";
  const base = "A".charCodeAt(0);
  const regionalA = 0x1f1e6;
  return String.fromCodePoint(
    regionalA + code.charCodeAt(0) - base,
    regionalA + code.charCodeAt(1) - base,
  );
}

/** Sorted for display; preferred countries pinned first. */
const PREFERRED_ISO = ["gb", "pk", "us", "ae", "in"] as const;

const RAW: PhoneCountry[] = [
  { name: "Afghanistan", iso2: "af", dialCode: "93" },
  { name: "Albania", iso2: "al", dialCode: "355" },
  { name: "Algeria", iso2: "dz", dialCode: "213" },
  { name: "Argentina", iso2: "ar", dialCode: "54" },
  { name: "Australia", iso2: "au", dialCode: "61" },
  { name: "Austria", iso2: "at", dialCode: "43" },
  { name: "Bahrain", iso2: "bh", dialCode: "973" },
  { name: "Bangladesh", iso2: "bd", dialCode: "880" },
  { name: "Belgium", iso2: "be", dialCode: "32" },
  { name: "Brazil", iso2: "br", dialCode: "55" },
  { name: "Canada", iso2: "ca", dialCode: "1" },
  { name: "China", iso2: "cn", dialCode: "86" },
  { name: "Colombia", iso2: "co", dialCode: "57" },
  { name: "Croatia", iso2: "hr", dialCode: "385" },
  { name: "Cyprus", iso2: "cy", dialCode: "357" },
  { name: "Czech Republic", iso2: "cz", dialCode: "420" },
  { name: "Denmark", iso2: "dk", dialCode: "45" },
  { name: "Egypt", iso2: "eg", dialCode: "20" },
  { name: "Finland", iso2: "fi", dialCode: "358" },
  { name: "France", iso2: "fr", dialCode: "33" },
  { name: "Germany", iso2: "de", dialCode: "49" },
  { name: "Greece", iso2: "gr", dialCode: "30" },
  { name: "Hong Kong", iso2: "hk", dialCode: "852" },
  { name: "Hungary", iso2: "hu", dialCode: "36" },
  { name: "India", iso2: "in", dialCode: "91" },
  { name: "Indonesia", iso2: "id", dialCode: "62" },
  { name: "Iran", iso2: "ir", dialCode: "98" },
  { name: "Iraq", iso2: "iq", dialCode: "964" },
  { name: "Ireland", iso2: "ie", dialCode: "353" },
  { name: "Israel", iso2: "il", dialCode: "972" },
  { name: "Italy", iso2: "it", dialCode: "39" },
  { name: "Japan", iso2: "jp", dialCode: "81" },
  { name: "Jordan", iso2: "jo", dialCode: "962" },
  { name: "Kenya", iso2: "ke", dialCode: "254" },
  { name: "Kuwait", iso2: "kw", dialCode: "965" },
  { name: "Lebanon", iso2: "lb", dialCode: "961" },
  { name: "Malaysia", iso2: "my", dialCode: "60" },
  { name: "Mexico", iso2: "mx", dialCode: "52" },
  { name: "Morocco", iso2: "ma", dialCode: "212" },
  { name: "Netherlands", iso2: "nl", dialCode: "31" },
  { name: "New Zealand", iso2: "nz", dialCode: "64" },
  { name: "Nigeria", iso2: "ng", dialCode: "234" },
  { name: "Norway", iso2: "no", dialCode: "47" },
  { name: "Oman", iso2: "om", dialCode: "968" },
  { name: "Pakistan", iso2: "pk", dialCode: "92" },
  { name: "Philippines", iso2: "ph", dialCode: "63" },
  { name: "Poland", iso2: "pl", dialCode: "48" },
  { name: "Portugal", iso2: "pt", dialCode: "351" },
  { name: "Qatar", iso2: "qa", dialCode: "974" },
  { name: "Romania", iso2: "ro", dialCode: "40" },
  { name: "Russia", iso2: "ru", dialCode: "7" },
  { name: "Saudi Arabia", iso2: "sa", dialCode: "966" },
  { name: "Singapore", iso2: "sg", dialCode: "65" },
  { name: "South Africa", iso2: "za", dialCode: "27" },
  { name: "South Korea", iso2: "kr", dialCode: "82" },
  { name: "Spain", iso2: "es", dialCode: "34" },
  { name: "Sri Lanka", iso2: "lk", dialCode: "94" },
  { name: "Sweden", iso2: "se", dialCode: "46" },
  { name: "Switzerland", iso2: "ch", dialCode: "41" },
  { name: "Thailand", iso2: "th", dialCode: "66" },
  { name: "Turkey", iso2: "tr", dialCode: "90" },
  { name: "Ukraine", iso2: "ua", dialCode: "380" },
  { name: "United Arab Emirates", iso2: "ae", dialCode: "971" },
  { name: "United Kingdom", iso2: "gb", dialCode: "44" },
  { name: "United States", iso2: "us", dialCode: "1" },
  { name: "Vietnam", iso2: "vn", dialCode: "84" },
];

const byIso = new Map(RAW.map((c) => [c.iso2, c]));

const preferredSet = new Set<string>(PREFERRED_ISO);

const preferred = PREFERRED_ISO.map((iso) => byIso.get(iso)).filter(
  (c): c is PhoneCountry => Boolean(c),
);

const rest = RAW.filter((c) => !preferredSet.has(c.iso2)).sort((a, b) =>
  a.name.localeCompare(b.name),
);

export const PHONE_COUNTRIES: PhoneCountry[] = [...preferred, ...rest];

export const DEFAULT_PHONE_COUNTRY =
  PHONE_COUNTRIES.find((c) => c.iso2 === "gb") ?? PHONE_COUNTRIES[0];

/** Max digits after country code (UK mobile: 7XXXXXXXXX). */
export const NATIONAL_PHONE_MAX_LENGTH = 10;

export function clampNationalDigits(
  national: string,
  maxLength = NATIONAL_PHONE_MAX_LENGTH,
): string {
  return national.replace(/\D/g, "").slice(0, maxLength);
}

const byDialLength = [...PHONE_COUNTRIES].sort(
  (a, b) => b.dialCode.length - a.dialCode.length,
);

export function parsePhoneValue(
  value: string,
  defaultCountry: PhoneCountry = DEFAULT_PHONE_COUNTRY,
): { country: PhoneCountry; national: string } {
  const digits = value.replace(/\D/g, "");
  if (!digits) {
    return { country: defaultCountry, national: "" };
  }

  for (const country of byDialLength) {
    if (digits.startsWith(country.dialCode)) {
      return {
        country,
        national: digits.slice(country.dialCode.length),
      };
    }
  }

  return { country: defaultCountry, national: digits };
}

export function buildPhoneValue(country: PhoneCountry, national: string): string {
  const n = national.replace(/\D/g, "");
  if (!n) return country.dialCode;
  return `${country.dialCode}${n}`;
}
