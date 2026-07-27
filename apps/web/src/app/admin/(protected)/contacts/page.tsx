export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { ContactMarkRead } from "@/components/admin/ContactMarkRead";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <>
      <AdminTopbar title="Messages" />
      <AdminPageContent>
        <p className="mb-4 text-sm sm:mb-6" style={{ color: "var(--adm-text-muted)" }}>
          {contacts.length} message{contacts.length !== 1 ? "s" : ""}
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full bg-zinc-500/15 px-2 py-0.5 text-[10px] font-bold text-zinc-500">
              {unreadCount} unread
            </span>
          )}
        </p>

        <div className="space-y-3">
          {contacts.length === 0 ? (
            <p className="py-12 text-center text-sm" style={{ color: "var(--adm-text-muted)" }}>No messages yet</p>
          ) : (
            contacts.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border p-5 transition"
                style={{
                  background: c.read ? "var(--adm-surface)" : "var(--adm-surface-2)",
                  borderColor: c.read ? "var(--adm-border)" : "rgba(153, 153, 153,0.25)",
                }}
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold"
                      style={{ background: "var(--adm-surface-2)", borderColor: "var(--adm-border)", color: "var(--adm-text)" }}
                    >
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--adm-text)" }}>{c.name}</p>
                      <p className="text-xs" style={{ color: "var(--adm-text-muted)" }}>{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]" style={{ color: "var(--adm-text-muted)" }}>
                      {c.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                    <a
                      href={`mailto:${c.email}?subject=Re: Your enquiry — London Airport Taxi Services&body=Hi ${c.name.split(" ")[0]},%0A%0AThank you for contacting London Airport Taxi Services.%0A%0A`}
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold transition hover:opacity-80"
                      style={{ borderColor: "var(--adm-border)", color: "var(--adm-text-muted)", background: "var(--adm-surface-2)" }}
                    >
                      ↩ Reply
                    </a>
                    {!c.read && <ContactMarkRead contactId={c.id} />}
                  </div>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed" style={{ color: "var(--adm-text-sub)" }}>{c.message}</p>
              </div>
            ))
          )}
        </div>
      </AdminPageContent>
    </>
  );
}
