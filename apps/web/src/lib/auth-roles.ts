export const STAFF_ROLES = ["ADMIN", "STAFF"] as const;
export const CUSTOMER_ROLE = "USER" as const;

export function isStaffRole(role: string | undefined): boolean {
  return role === "ADMIN" || role === "STAFF";
}

export function isCustomerRole(role: string | undefined): boolean {
  return role === CUSTOMER_ROLE;
}
