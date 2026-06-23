"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2, AlertTriangle, Loader2 } from "lucide-react";

export function DriverActions({
  driverId,
  driverName,
  showApproveReject = true,
}: {
  driverId: string;
  driverName?: string;
  showApproveReject?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handleAction(status: "APPROVED" | "REJECTED") {
    setLoading(true);
    await fetch("/api/admin/drivers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: driverId, status }),
    });
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    await fetch("/api/admin/drivers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: driverId }),
    });
    setShowModal(false);
    router.refresh();
  }

  return (
    <>
      <div className="mt-4 space-y-2">
        {showApproveReject && (
          <div className="flex gap-2">
            <button
              disabled={loading}
              onClick={() => handleAction("APPROVED")}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/25 disabled:opacity-50"
            >
              <Check className="h-3.5 w-3.5" />
              Approve
            </button>
            <button
              disabled={loading}
              onClick={() => handleAction("REJECTED")}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/25 disabled:opacity-50"
            >
              <X className="h-3.5 w-3.5" />
              Reject
            </button>
          </div>
        )}

        <button
          disabled={loading}
          onClick={() => setShowModal(true)}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
          style={{ borderColor: "rgba(239,68,68,0.25)" }}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete application
        </button>
      </div>

      {/* Confirmation modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => !loading && setShowModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border p-6 shadow-2xl"
            style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>

            <h3 className="mb-1 text-base font-bold" style={{ color: "var(--adm-text)" }}>
              Delete application?
            </h3>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--adm-text-muted)" }}>
              {driverName ? (
                <>This will permanently delete <span className="font-semibold" style={{ color: "var(--adm-text-sub)" }}>{driverName}</span>'s application. This action cannot be undone.</>
              ) : (
                "This will permanently delete the driver application. This action cannot be undone."
              )}
            </p>

            <div className="flex gap-3">
              <button
                disabled={loading}
                onClick={handleDelete}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Deleting…</>
                ) : (
                  <><Trash2 className="h-4 w-4" /> Yes, delete</>
                )}
              </button>
              <button
                disabled={loading}
                onClick={() => setShowModal(false)}
                className="inline-flex flex-1 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:opacity-80 disabled:opacity-50"
                style={{ borderColor: "var(--adm-border)", color: "var(--adm-text-muted)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
