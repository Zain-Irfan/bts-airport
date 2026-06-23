import { authCustomer } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authCustomer();
  if (!session) {
    redirect("/login?callbackUrl=/account/bookings");
  }
  return <>{children}</>;
}
