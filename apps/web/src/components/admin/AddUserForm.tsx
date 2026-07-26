"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminModal } from "@/components/admin/AdminModal";

const inputStyle: React.CSSProperties = {
  background: "var(--adm-input-bg)",
  borderColor: "var(--adm-input-border)",
  color: "var(--adm-input-text)",
};

const labelStyle: React.CSSProperties = {
  color: "var(--adm-text-muted)",
};

export function AddUserForm() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  function closeModal() {
    setModalOpen(false);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to create user");
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setRole("USER");
    closeModal();
    router.refresh();
  }

  return (
    <>
      <Button type="button" onClick={() => { setError(""); setModalOpen(true); }} className="gap-2">
        <Plus className="h-4 w-4" />
        Add user
      </Button>

      <AdminModal open={modalOpen} onClose={closeModal} title="Add user" panelClassName="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em]" style={labelStyle}>
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 w-full rounded-lg border px-3 text-sm outline-none transition focus:border-[rgba(153, 153, 153,0.5)]"
                style={inputStyle}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em]" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 w-full rounded-lg border px-3 text-sm outline-none transition focus:border-[rgba(153, 153, 153,0.5)]"
                style={inputStyle}
                placeholder="user@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em]" style={labelStyle}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-10 w-full rounded-lg border px-3 text-sm outline-none transition focus:border-[rgba(153, 153, 153,0.5)]"
                style={inputStyle}
                placeholder="Min 6 characters"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em]" style={labelStyle}>
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-10 w-full rounded-lg border px-3 text-sm outline-none transition focus:border-[rgba(153, 153, 153,0.5)]"
                style={inputStyle}
              >
                <option value="USER">User</option>
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating…" : "Create user"}
            </Button>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
