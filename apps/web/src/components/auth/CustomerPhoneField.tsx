"use client";

import { ChevronDown } from "lucide-react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  buildPhoneValue,
  clampNationalDigits,
  isoToFlagEmoji,
  NATIONAL_PHONE_MAX_LENGTH,
  parsePhoneValue,
  PHONE_COUNTRIES,
  type PhoneCountry,
} from "@/lib/phone-countries";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  variant?: "dark" | "light";
  /** Max digits after country code (default 10 for UK mobile). */
  maxNationalLength?: number;
};

function CountryFlag({ iso2, label }: { iso2: string; label: string }) {
  const code = iso2.toLowerCase();
  return (
    <span
      className="phone-country-flag"
      role="img"
      aria-label={label}
      title={label}
    >
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
        alt=""
        width={24}
        height={18}
        className="phone-country-flag__img"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = "none";
          const fallback = img.nextElementSibling;
          if (fallback instanceof HTMLElement) {
            fallback.hidden = false;
          }
        }}
      />
      <span className="phone-country-flag__emoji" hidden aria-hidden>
        {isoToFlagEmoji(iso2)}
      </span>
    </span>
  );
}

export function CustomerPhoneField({
  value,
  onChange,
  required = true,
  variant = "dark",
  maxNationalLength = NATIONAL_PHONE_MAX_LENGTH,
}: Props) {
  const isLight = variant === "light";
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const fieldRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [menuWidth, setMenuWidth] = useState(300);

  const { country, national } = useMemo(
    () => parsePhoneValue(value),
    [value],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PHONE_COUNTRIES;
    const digits = q.replace(/\D/g, "");
    return PHONE_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.includes(q) ||
        (digits && c.dialCode.startsWith(digits)),
    );
  }, [search]);

  useLayoutEffect(() => {
    if (!open || !fieldRef.current) return;
    const measure = () => {
      const w = fieldRef.current?.getBoundingClientRect().width ?? 300;
      setMenuWidth(Math.max(280, Math.round(w)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  function selectCountry(next: PhoneCountry) {
    onChange(buildPhoneValue(next, national));
    setOpen(false);
    setSearch("");
  }

  function onNationalChange(raw: string) {
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith(country.dialCode)) {
      digits = digits.slice(country.dialCode.length);
    }
    onChange(buildPhoneValue(country, clampNationalDigits(digits, maxNationalLength)));
  }

  const boxClass = cn(
    "phone-field-box grid w-full min-w-0 grid-cols-[auto_1fr] overflow-hidden rounded-lg border text-sm transition",
    isLight
      ? "border-[#e5e7eb] bg-white"
      : "border-[rgba(192,192,192,0.25)] bg-[rgba(13,13,15,0.65)]",
    open &&
      (isLight
        ? "border-[#333333]/40 ring-2 ring-[#333333]/15"
        : "border-[hsl(var(--highlight-soft)/0.55)] ring-2 ring-[hsl(var(--highlight)/0.28)]"),
  );

  const triggerClass = cn(
    "phone-field-trigger inline-flex h-11 items-center gap-2 border-r px-3",
    isLight
      ? "border-[#e5e7eb] bg-[#f9fafb] text-[#111827] hover:bg-[#f3f4f6]"
      : "border-[rgba(192,192,192,0.25)] bg-[rgba(13,13,15,0.75)] text-[#f8f8f8] hover:bg-[rgba(26,26,29,0.85)]",
  );

  const inputClass = cn(
    "phone-field-input h-11 min-w-0 w-full border-0 bg-transparent px-3 text-sm outline-none",
    isLight
      ? "text-[#111827] placeholder:text-[#9ca3af]"
      : "text-[#f8f8f8] placeholder:text-[#A5A7AA]",
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div ref={fieldRef} className={boxClass} data-no-reveal>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`Country: ${country.name}, dial code +${country.dialCode}`}
            aria-expanded={open}
            aria-haspopup="listbox"
            className={triggerClass}
          >
            <CountryFlag iso2={country.iso2} label={country.name} />
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 opacity-70 transition-transform",
                open && "rotate-180",
              )}
            />
            <span className="shrink-0 text-sm font-semibold tabular-nums leading-none">
              +{country.dialCode}
            </span>
          </button>
        </PopoverTrigger>

        <input
          type="tel"
          name="phone-national"
          required={required}
          autoComplete="tel-national"
          value={national}
          onChange={(e) => onNationalChange(e.target.value)}
          onFocus={() => setOpen(false)}
          placeholder="7XXX XXX XXX"
          className={inputClass}
          inputMode="numeric"
          maxLength={maxNationalLength}
        />
      </div>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        collisionPadding={16}
        avoidCollisions
        style={{ width: menuWidth }}
        className={cn(
          "phone-field-popover",
          isLight ? "phone-field-popover--light" : "phone-field-popover--dark",
        )}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          searchRef.current?.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <div className="phone-field-popover__search">
          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country"
            className="phone-field-popover__search-input"
          />
        </div>
        <ul className="phone-field-popover__list" role="listbox" aria-label="Countries">
          {filtered.length === 0 ? (
            <li className="phone-field-popover__empty">No countries found</li>
          ) : (
            filtered.map((c) => {
              const selected = c.iso2 === country.iso2;
              return (
                <li key={c.iso2} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={cn(
                      "phone-country-row",
                      selected && "phone-country-row--selected",
                    )}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      selectCountry(c);
                    }}
                  >
                    <CountryFlag iso2={c.iso2} label={c.name} />
                    <span className="phone-country-row__name">{c.name}</span>
                    <span className="phone-country-row__code">+{c.dialCode}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
