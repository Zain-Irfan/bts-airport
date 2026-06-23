"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VehicleCategoryDTO } from "@/lib/vehicle-category";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";

type Props = { initial: VehicleCategoryDTO[] };

const emptyAdd = { slug: "", label: "", isActive: true };

export function VehicleCategoriesAdminClient({ initial }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState(emptyAdd);
  const [adding, setAdding] = useState(false);
  const [editRow, setEditRow] = useState<VehicleCategoryDTO | null>(null);
  const [editSlug, setEditSlug] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [editActive, setEditActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VehicleCategoryDTO | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    setRows(initial);
  }, [initial]);

  useEffect(() => {
    if (!editRow) return;
    setEditSlug(editRow.slug);
    setEditLabel(editRow.label);
    setEditActive(editRow.isActive);
  }, [editRow]);

  const refresh = () => {
    router.refresh();
    setMsg(null);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setAddForm(emptyAdd);
  };

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/vehicle-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addForm, isActive: addForm.isActive }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "Could not create" });
        return;
      }
      closeAddModal();
      setMsg({ type: "ok", text: "Category created" });
      refresh();
    } finally {
      setAdding(false);
    }
  };

  const onSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRow) return;
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/vehicle-categories/${editRow.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: editSlug.trim(),
          label: editLabel.trim(),
          isActive: editActive,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "Could not save" });
        return;
      }
      setEditRow(null);
      setMsg({ type: "ok", text: "Saved" });
      refresh();
    } finally {
      setSaving(false);
    }
  };

  const executeDeleteCategory = async () => {
    if (!deleteTarget) return;
    setDeletePending(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/vehicle-categories/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      setDeleteTarget(null);
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "Delete failed" });
        return;
      }
      setMsg({ type: "ok", text: "Deleted" });
      refresh();
    } finally {
      setDeletePending(false);
    }
  };

  return (
    <div className="space-y-6">
      {msg && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            msg.type === "ok"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--adm-text-muted)" }}>
          {rows.length} categor{rows.length === 1 ? "y" : "ies"}
        </p>
        <Button
          type="button"
          onClick={() => {
            setAddForm(emptyAdd);
            setAddModalOpen(true);
            setMsg(null);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add category
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--adm-border)" }}>
              {["Slug", "Label", "Active", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>
                  No categories yet. Use <strong style={{ color: "var(--adm-text-sub)" }}>Add category</strong>, or run the seed script.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="transition" style={{ borderBottom: "1px solid var(--adm-border-soft)" }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--adm-text-sub)" }}>{r.slug}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--adm-text)" }}>{r.label}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.isActive ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500"}`}>
                      {r.isActive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setEditRow(r)}
                        className="rounded-md p-2 transition hover:bg-black/5 hover:text-purple-600"
                        style={{ color: "var(--adm-text-muted)" }}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(r)}
                        className="rounded-md p-2 transition hover:bg-red-500/10 hover:text-red-500"
                        style={{ color: "var(--adm-text-muted)" }}
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminModal open={addModalOpen} onClose={closeAddModal} title="Add category">
        <form onSubmit={onAdd} className="grid gap-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--adm-text-muted)" }}>
              Slug (key)
            </label>
            <Input
              required
              value={addForm.slug}
              onChange={(e) => setAddForm((f) => ({ ...f, slug: e.target.value }))}
              style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              placeholder="luxury_van"
            />
            <p className="mt-1 text-[10px]" style={{ color: "var(--adm-text-muted)" }}>
              Lowercase, numbers, underscores (auto-normalized on save)
            </p>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--adm-text-muted)" }}>
              Display label
            </label>
            <Input
              required
              value={addForm.label}
              onChange={(e) => setAddForm((f) => ({ ...f, label: e.target.value }))}
              style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              placeholder="Luxury van"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--adm-text-muted)" }}>
              Active
            </label>
            <Select
              value={addForm.isActive ? "true" : "false"}
              onValueChange={(v) => setAddForm((f) => ({ ...f, isActive: v === "true" }))}
            >
              <SelectTrigger style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={adding} className="gap-2">
              <Plus className="h-4 w-4" />
              {adding ? "Creating…" : "Create category"}
            </Button>
            <Button type="button" variant="outline" onClick={closeAddModal}>
              Cancel
            </Button>
          </div>
        </form>
      </AdminModal>

      <AdminModal open={!!editRow} onClose={() => setEditRow(null)} title="Edit category">
        {editRow && (
          <form onSubmit={onSaveEdit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--adm-text-muted)" }}>
                Slug (renames key; vehicle types using it are updated)
              </label>
              <Input
                value={editSlug}
                onChange={(e) => setEditSlug(e.target.value)}
                style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--adm-text-muted)" }}>
                Label
              </label>
              <Input
                required
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--adm-text-muted)" }}>
                Active
              </label>
              <Select value={editActive ? "true" : "false"} onValueChange={(v) => setEditActive(v === "true")}>
                <SelectTrigger style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditRow(null)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </AdminModal>

      <AdminConfirmDialog
        open={!!deleteTarget}
        onClose={() => {
          if (!deletePending) setDeleteTarget(null);
        }}
        title="Delete category?"
        description={
          deleteTarget
            ? `“${deleteTarget.label}” (${deleteTarget.slug}) will be removed. You can only delete a category if no vehicle type uses it as its category key.`
            : ""
        }
        confirmLabel="Delete category"
        pending={deletePending}
        onConfirm={executeDeleteCategory}
      />
    </div>
  );
}
