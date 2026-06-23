"use client";

import { useEffect, useMemo, useState } from "react";
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
import type { VehicleTypeDTO } from "@/lib/vehicle-types";
import type { VehicleCategoryDTO } from "@/lib/vehicle-category";
import { VehicleTypeImageField } from "@/components/admin/VehicleTypeImageField";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminConfirmDialog } from "@/components/admin/AdminConfirmDialog";

type Props = { initial: VehicleTypeDTO[]; categories: VehicleCategoryDTO[] };

function pickDefaultCategory(cats: VehicleCategoryDTO[]) {
  return cats.find((c) => c.isActive)?.slug ?? cats[0]?.slug ?? "saloon";
}

const EMPTY_ADD_BASE = {
  slug: "",
  name: "",
  subtitle: "",
  imageUrl: "",
  maxPassengers: "4",
  maxHandLuggage: "1",
  maxSuitcases: "2",
  baseFareGbp: "15",
  perMileGbp: "1.35",
  minimumFareGbp: "40",
  promoDiscountPercent: "5",
  isActive: true,
};

function buildAddForm(categories: VehicleCategoryDTO[]) {
  return { ...EMPTY_ADD_BASE, categoryKey: pickDefaultCategory(categories) };
}

export function VehicleTypesAdminClient({ initial, categories }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [addForm, setAddForm] = useState(() => buildAddForm(categories));
  const [adding, setAdding] = useState(false);
  const [editRow, setEditRow] = useState<VehicleTypeDTO | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VehicleTypeDTO | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    setRows(initial);
  }, [initial]);

  useEffect(() => {
    setAddForm((f) => {
      const stillValid = categories.some((c) => c.slug === f.categoryKey && c.isActive);
      if (stillValid) return f;
      return { ...f, categoryKey: pickDefaultCategory(categories) };
    });
  }, [categories]);

  useEffect(() => {
    if (!editRow) return;
    setEditForm({
      slug: editRow.slug,
      name: editRow.name,
      subtitle: editRow.subtitle ?? "",
      imageUrl: editRow.imageUrl ?? "",
      maxPassengers: String(editRow.maxPassengers),
      maxHandLuggage: String(editRow.maxHandLuggage),
      maxSuitcases: String(editRow.maxSuitcases),
      baseFareGbp: editRow.baseFareGbp,
      perMileGbp: editRow.perMileGbp,
      minimumFareGbp: editRow.minimumFareGbp,
      promoDiscountPercent: editRow.promoDiscountPercent,
      categoryKey: editRow.categoryKey,
      isActive: editRow.isActive ? "true" : "false",
    });
  }, [editRow]);

  const refresh = () => {
    router.refresh();
    setMsg(null);
  };

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/vehicle-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          isActive: addForm.isActive,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "Could not create" });
        return;
      }
      setAddForm(buildAddForm(categories));
      setAddModalOpen(false);
      setMsg({ type: "ok", text: "Vehicle type created" });
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
      const res = await fetch(`/api/admin/vehicle-types/${editRow.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          isActive: editForm.isActive === "true",
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

  const executeDeleteVehicleType = async () => {
    if (!deleteTarget) return;
    setDeletePending(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/vehicle-types/${deleteTarget.id}`, { method: "DELETE" });
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

  const categoryLabel = (key: string) => categories.find((c) => c.slug === key)?.label ?? key;

  const activeCategories = categories.filter((c) => c.isActive);
  const editCategoryOptions = useMemo(() => {
    if (!editRow) return categories.filter((c) => c.isActive);
    return categories.filter((c) => c.isActive || c.slug === editRow.categoryKey);
  }, [categories, editRow]);

  return (
    <div className="space-y-8">
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
          {rows.length} vehicle type{rows.length !== 1 ? "s" : ""}
        </p>
        <Button
          type="button"
          onClick={() => {
            setAddForm(buildAddForm(categories));
            setAddModalOpen(true);
            setMsg(null);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add vehicle type
        </Button>
      </div>

      <AdminModal
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setAddForm(buildAddForm(categories));
        }}
        title="Add vehicle type"
        panelClassName="max-w-4xl"
      >
        <form onSubmit={onAdd} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Field label="Slug (unique)">
            <Input
              required
              value={addForm.slug}
              onChange={(e) => setAddForm((f) => ({ ...f, slug: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              placeholder="saloon"
            />
          </Field>
          <Field label="Display name">
            <Input
              required
              value={addForm.name}
              onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              placeholder="Saloon"
            />
          </Field>
          <Field label="Subtitle (optional)">
            <Input
              value={addForm.subtitle}
              onChange={(e) => setAddForm((f) => ({ ...f, subtitle: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              placeholder="Saloon — Sedan"
            />
          </Field>
          <Field label="Vehicle image" className="md:col-span-2 lg:col-span-3">
            <VehicleTypeImageField
              imageUrl={addForm.imageUrl}
              onImageUrlChange={(url) => setAddForm((f) => ({ ...f, imageUrl: url }))}
              onNotify={(m) => setMsg(m.text ? m : null)}
            />
          </Field>
          <Field label="Max passengers">
            <Input
              type="number"
              min={1}
              max={16}
              value={addForm.maxPassengers}
              onChange={(e) => setAddForm((f) => ({ ...f, maxPassengers: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
            />
          </Field>
          <Field label="Max hand luggage">
            <Input
              type="number"
              min={0}
              max={10}
              value={addForm.maxHandLuggage}
              onChange={(e) => setAddForm((f) => ({ ...f, maxHandLuggage: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
            />
          </Field>
          <Field label="Max suitcases">
            <Input
              type="number"
              min={0}
              max={10}
              value={addForm.maxSuitcases}
              onChange={(e) => setAddForm((f) => ({ ...f, maxSuitcases: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
            />
          </Field>
          <Field label="Base fare (£)">
            <Input
              value={addForm.baseFareGbp}
              onChange={(e) => setAddForm((f) => ({ ...f, baseFareGbp: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
            />
          </Field>
          <Field label="Per mile (£)">
            <Input
              value={addForm.perMileGbp}
              onChange={(e) => setAddForm((f) => ({ ...f, perMileGbp: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
            />
          </Field>
          <Field label="Minimum fare (£)">
            <Input
              value={addForm.minimumFareGbp}
              onChange={(e) => setAddForm((f) => ({ ...f, minimumFareGbp: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
            />
          </Field>
          <Field label="Promo discount (%)">
            <Input
              value={addForm.promoDiscountPercent}
              onChange={(e) => setAddForm((f) => ({ ...f, promoDiscountPercent: e.target.value }))}
              className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
              placeholder="0–100"
            />
          </Field>
          <Field label="Category (quote filter)">
            {activeCategories.length === 0 ? (
              <p className="text-xs text-amber-400">
                No active categories. Add some under{" "}
                <a href="/admin/vehicle-categories" className="underline">
                  Vehicle categories
                </a>
                .
              </p>
            ) : (
              <Select
                value={addForm.categoryKey}
                onValueChange={(v) => setAddForm((f) => ({ ...f, categoryKey: v }))}
              >
                <SelectTrigger className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activeCategories.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Field>
          <Field label="Active">
            <Select
              value={addForm.isActive ? "true" : "false"}
              onValueChange={(v) => setAddForm((f) => ({ ...f, isActive: v === "true" }))}
            >
              <SelectTrigger className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="flex flex-wrap items-end gap-3 md:col-span-2 lg:col-span-3">
            <Button type="submit" disabled={adding} className="gap-2">
              <Plus className="h-4 w-4" />
              {adding ? "Creating…" : "Create vehicle type"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setAddModalOpen(false);
                setAddForm(buildAddForm(categories));
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </AdminModal>

      <div className="adm-table-wrap overflow-x-auto rounded-xl border" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--adm-border)" }}>
              {["", "Name", "Slug", "Pax / hand / suit", "Base / mi / min £", "Promo %", "Category", "Active", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="adm-th px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--adm-text-muted)" }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>
                  No vehicle types yet. Use <strong style={{ color: "var(--adm-text-sub)" }}>Add vehicle type</strong> or run{" "}
                  <code style={{ color: "var(--adm-text-sub)" }}>npx prisma db push</code> and seed.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="adm-tr transition"
                  style={{ borderBottom: "1px solid var(--adm-border-soft)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--adm-row-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  <td className="px-3 py-2">
                    {r.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- admin may use external URLs
                      <img src={r.imageUrl} alt="" className="h-10 w-16 rounded object-cover" />
                    ) : (
                      <div className="adm-img-placeholder h-10 w-16 rounded" style={{ background: "var(--adm-img-placeholder)" }} />
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-medium" style={{ color: "var(--adm-text)" }}>{r.name}</div>
                    {r.subtitle && <div className="text-xs" style={{ color: "var(--adm-text-muted)" }}>{r.subtitle}</div>}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs" style={{ color: "var(--adm-text-sub)" }}>{r.slug}</td>
                  <td className="px-3 py-2" style={{ color: "var(--adm-text-sub)" }}>
                    {r.maxPassengers} / {r.maxHandLuggage} / {r.maxSuitcases}
                  </td>
                  <td className="px-3 py-2 text-xs" style={{ color: "var(--adm-text-sub)" }}>
                    {r.baseFareGbp} / {r.perMileGbp} / {r.minimumFareGbp}
                  </td>
                  <td className="px-3 py-2" style={{ color: "var(--adm-text-sub)" }}>{r.promoDiscountPercent}%</td>
                  <td className="px-3 py-2" style={{ color: "var(--adm-text-sub)" }}>{categoryLabel(r.categoryKey)}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.isActive ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500"}`}>
                      {r.isActive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
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

      <AdminModal
        open={!!editRow}
        onClose={() => setEditRow(null)}
        title="Edit vehicle type"
        panelClassName="max-w-2xl"
      >
        {editRow && (
            <form onSubmit={onSaveEdit} className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <Input
                  required
                  value={editForm.slug ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Display name">
                <Input
                  required
                  value={editForm.name ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Subtitle" className="sm:col-span-2">
                <Input
                  value={editForm.subtitle ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, subtitle: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Vehicle image" className="sm:col-span-2">
                <VehicleTypeImageField
                  imageUrl={editForm.imageUrl ?? ""}
                  onImageUrlChange={(url) => setEditForm((f) => ({ ...f, imageUrl: url }))}
                  onNotify={(m) => setMsg(m.text ? m : null)}
                />
              </Field>
              <Field label="Max passengers">
                <Input
                  type="number"
                  min={1}
                  max={16}
                  value={editForm.maxPassengers ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, maxPassengers: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Max hand luggage">
                <Input
                  type="number"
                  min={0}
                  max={10}
                  value={editForm.maxHandLuggage ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, maxHandLuggage: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Max suitcases">
                <Input
                  type="number"
                  min={0}
                  max={10}
                  value={editForm.maxSuitcases ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, maxSuitcases: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Base fare (£)">
                <Input
                  value={editForm.baseFareGbp ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, baseFareGbp: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Per mile (£)">
                <Input
                  value={editForm.perMileGbp ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, perMileGbp: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Minimum fare (£)">
                <Input
                  value={editForm.minimumFareGbp ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, minimumFareGbp: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Promo discount (%)">
                <Input
                  value={editForm.promoDiscountPercent ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, promoDiscountPercent: e.target.value }))}
                  className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}
                />
              </Field>
              <Field label="Category">
                <Select
                  value={editForm.categoryKey ?? "saloon"}
                  onValueChange={(v) => setEditForm((f) => ({ ...f, categoryKey: v }))}
                >
                  <SelectTrigger className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {editCategoryOptions.map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.label}
                        {!c.isActive ? " (inactive)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Active">
                <Select
                  value={editForm.isActive ?? "true"}
                  onValueChange={(v) => setEditForm((f) => ({ ...f, isActive: v }))}
                >
                  <SelectTrigger className="adm-input" style={{ background: "var(--adm-input-bg)", borderColor: "var(--adm-input-border)", color: "var(--adm-input-text)" }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <div className="mt-2 flex gap-3 sm:col-span-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
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
        title="Delete vehicle type?"
        description={
          deleteTarget
            ? `“${deleteTarget.name}” (${deleteTarget.slug}) will be removed permanently. It will no longer appear in quotes or the public vehicle list.`
            : ""
        }
        confirmLabel="Delete permanently"
        pending={deletePending}
        onConfirm={executeDeleteVehicleType}
      />
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--adm-text-muted)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
