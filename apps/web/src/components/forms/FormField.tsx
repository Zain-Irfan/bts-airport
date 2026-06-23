import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Label is not a wrapping <label> so complex inputs (phone country picker) receive clicks. */
export function FormField({ label, children, className }: Props) {
  return (
    <div className={className ?? "space-y-1.5"}>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
        {label}
      </span>
      {children}
    </div>
  );
}
