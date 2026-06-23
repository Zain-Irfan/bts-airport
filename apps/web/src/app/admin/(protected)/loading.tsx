export default function AdminLoading() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--adm-bg, #0D0D0F)" }}>
      {/* Sidebar skeleton */}
      <div
        className="hidden w-60 shrink-0 border-r lg:flex lg:flex-col"
        style={{ background: "var(--adm-bg, #0D0D0F)", borderColor: "var(--adm-border, rgba(192,192,192,0.08))" }}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "var(--adm-border, rgba(192,192,192,0.08))" }}>
          <div className="h-9 w-9 rounded-xl animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))" }} />
          <div className="space-y-1.5">
            <div className="h-3 w-20 rounded animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))" }} />
            <div className="h-2 w-14 rounded animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))" }} />
          </div>
        </div>
        {/* Nav items */}
        <div className="flex flex-col gap-1 p-3 pt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
              <div className="h-4 w-4 rounded animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))", animationDelay: `${i * 60}ms` }} />
              <div className="h-3 rounded animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))", width: `${50 + (i % 3) * 20}px`, animationDelay: `${i * 60}ms` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar skeleton */}
        <div
          className="flex h-16 items-center justify-between border-b px-6"
          style={{ background: "var(--adm-bg, #0D0D0F)", borderColor: "var(--adm-border, rgba(192,192,192,0.08))" }}
        >
          <div className="h-5 w-36 rounded animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))" }} />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))" }} />
            <div className="h-8 w-8 rounded-full animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))" }} />
            <div className="h-8 w-24 rounded-lg animate-pulse" style={{ background: "var(--adm-surface, rgba(45,45,51,0.4))" }} />
          </div>
        </div>

        {/* Page content skeleton */}
        <div className="p-6 space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl border p-4 space-y-3 animate-pulse"
                style={{ background: "var(--adm-surface, rgba(45,45,51,0.2))", borderColor: "var(--adm-border, rgba(192,192,192,0.08))", animationDelay: `${i * 80}ms` }}
              >
                <div className="h-3 w-16 rounded" style={{ background: "var(--adm-border, rgba(192,192,192,0.1))" }} />
                <div className="h-7 w-12 rounded" style={{ background: "var(--adm-border, rgba(192,192,192,0.1))" }} />
              </div>
            ))}
          </div>

          {/* Table skeleton */}
          <div
            className="rounded-xl border overflow-hidden"
            style={{ background: "var(--adm-surface, rgba(45,45,51,0.2))", borderColor: "var(--adm-border, rgba(192,192,192,0.08))" }}
          >
            {/* Table header */}
            <div className="flex items-center gap-6 px-4 py-3 border-b" style={{ borderColor: "var(--adm-border, rgba(192,192,192,0.08))" }}>
              {[80, 140, 140, 80, 60, 60].map((w, i) => (
                <div key={i} className="h-2.5 rounded animate-pulse" style={{ width: w, background: "var(--adm-border, rgba(192,192,192,0.1))", animationDelay: `${i * 40}ms` }} />
              ))}
            </div>
            {/* Table rows */}
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="flex items-center gap-6 px-4 py-3.5 border-b"
                style={{ borderColor: "var(--adm-border-soft, rgba(192,192,192,0.05))", animationDelay: `${i * 50}ms` }}
              >
                <div className="space-y-1.5">
                  <div className="h-3 w-24 rounded animate-pulse" style={{ background: "var(--adm-border, rgba(192,192,192,0.1))" }} />
                  <div className="h-2.5 w-32 rounded animate-pulse" style={{ background: "var(--adm-border, rgba(192,192,192,0.07))" }} />
                </div>
                <div className="h-3 w-36 rounded animate-pulse" style={{ background: "var(--adm-border, rgba(192,192,192,0.08))" }} />
                <div className="h-3 w-36 rounded animate-pulse" style={{ background: "var(--adm-border, rgba(192,192,192,0.08))" }} />
                <div className="h-3 w-20 rounded animate-pulse" style={{ background: "var(--adm-border, rgba(192,192,192,0.08))" }} />
                <div className="h-5 w-16 rounded-full animate-pulse" style={{ background: "var(--adm-border, rgba(192,192,192,0.1))" }} />
                <div className="h-3 w-12 rounded animate-pulse" style={{ background: "var(--adm-border, rgba(192,192,192,0.08))" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
