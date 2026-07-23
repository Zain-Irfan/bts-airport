export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { AddUserForm } from "@/components/admin/AddUserForm";
import { UserActions } from "@/components/admin/UserActions";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
  });

  return (
    <>
      <AdminTopbar title="Users" />
      <AdminPageContent>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6">
          <p className="text-sm" style={{ color: "var(--adm-text-muted)" }}>
            {users.length} user{users.length !== 1 ? "s" : ""}
          </p>
          <AddUserForm />
        </div>

        <div className="overflow-x-auto rounded-xl border" style={{ background: "var(--adm-surface)", borderColor: "var(--adm-border)" }}>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--adm-border)" }}>
                {["Name", "Email", "Role", "Status", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--adm-text-muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>
                    No users yet
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="transition" style={{ borderBottom: "1px solid var(--adm-border-soft)" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "var(--adm-text)" }}>{u.name}</td>
                    <td className="px-4 py-3" style={{ color: "var(--adm-text-sub)" }}>{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        u.role === "ADMIN" ? "bg-purple-500/15 text-purple-500"
                          : u.role === "STAFF" ? "bg-blue-500/15 text-blue-500"
                          : "bg-gray-500/15 text-gray-500"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        u.status === "ACTIVE" ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--adm-text-muted)" }}>
                      {u.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <UserActions userId={u.id} currentStatus={u.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminPageContent>
    </>
  );
}
