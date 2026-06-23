/** Standard responsive padding for admin pages (below topbar). */
export function AdminPageContent({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0 p-3 sm:p-4 lg:p-6">{children}</div>;
}
