"use client";

import { useId } from "react";
import { Button } from "@/components/ui/button";

export type AdminConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pending?: boolean;
  onConfirm: () => void | Promise<void>;
};

export function AdminConfirmDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  pending = false,
  onConfirm,
}: AdminConfirmDialogProps) {
  const titleId = useId();
  const descId = useId();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[210] flex items-end justify-center bg-black/75 p-3 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClick={() => { if (!pending) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-xl border p-4 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.25)] sm:p-6"
        style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-bold tracking-tight" style={{ color: "var(--adm-text)" }}>
          {title}
        </h2>
        <p id={descId} className="mt-3 text-sm leading-relaxed" style={{ color: "var(--adm-text-muted)" }}>
          {description}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3 border-t pt-5" style={{ borderColor: "var(--adm-border)" }}>
          <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
            {cancelLabel}
          </Button>
          <Button type="button" variant="destructive" onClick={() => void onConfirm()} disabled={pending}>
            {pending ? "Please wait…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
