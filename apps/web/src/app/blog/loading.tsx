export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-secondary py-16 md:py-24 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div className="h-10 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-56 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-md border border-white/[0.08] bg-card shadow-sm"
              >
                <div className="h-36 w-full animate-pulse bg-muted" />
                <div className="space-y-3 p-3">
                  <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-8/12 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-10/12 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
