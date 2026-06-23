import { auth } from "@/lib/auth";
import { isStaffRole } from "@/lib/auth-roles";
import { redirect } from "next/navigation";

export default async function AdminGuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user && isStaffRole(session.user.role)) {
    redirect("/admin");
  }
  return <>{children}</>;
}
