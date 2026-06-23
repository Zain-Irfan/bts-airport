import { auth } from "@/lib/auth";
import { isStaffRole } from "@/lib/auth-roles";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || !isStaffRole(session.user.role)) {
    redirect("/admin/login");
  }
  return <AdminShell>{children}</AdminShell>;
}
