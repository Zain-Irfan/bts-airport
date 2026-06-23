"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserActions({
  userId,
  currentStatus,
}: {
  userId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, status: newStatus }),
    });
    router.refresh();
  }

  return (
    <button
      disabled={loading}
      onClick={toggleStatus}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
        currentStatus === "ACTIVE"
          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
          : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
      }`}
    >
      {currentStatus === "ACTIVE" ? "Deactivate" : "Activate"}
    </button>
  );
}
