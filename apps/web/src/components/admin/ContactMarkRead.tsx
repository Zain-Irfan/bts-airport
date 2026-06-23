"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCheck } from "lucide-react";

export function ContactMarkRead({ contactId }: { contactId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function markRead() {
    setLoading(true);
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: contactId }),
    });
    router.refresh();
  }

  return (
    <button
      disabled={loading}
      onClick={markRead}
      className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 px-2 py-1 text-[10px] font-semibold text-purple-400 transition hover:bg-purple-500/20 disabled:opacity-50"
    >
      <CheckCheck className="h-3 w-3" />
      Mark read
    </button>
  );
}
