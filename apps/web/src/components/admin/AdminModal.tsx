"use client";

import { useId } from "react";
import { X } from "lucide-react";
import { useAdminLayout } from "@/components/admin/AdminLayoutContext";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  panelClassName?: string;
};

export function AdminModal({ open, onClose, title, children, panelClassName = "max-w-md" }: Props) {
  const titleId = useId();
  const { theme } = useAdminLayout();
  const isLight = theme === "light";

  const panelBg = isLight ? "#FFFFFF" : "#1E1E23";
  const panelBorder = isLight ? "#E5E7EB" : "rgba(192,192,192,0.12)";
  const titleColor = isLight ? "#111827" : "#F8F8F8";
  const closeColor = isLight ? "#6B7280" : "#A5A7AA";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className={`relative w-full ${panelClassName} max-h-[92vh] overflow-y-auto rounded-t-xl border p-4 shadow-2xl sm:max-h-[90vh] sm:rounded-xl sm:p-6`}
        style={{ background: panelBg, borderColor: panelBorder }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-2 transition hover:bg-black/5"
          style={{ color: closeColor }}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 id={titleId} className="mb-4 pr-10 text-lg font-bold" style={{ color: titleColor }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
