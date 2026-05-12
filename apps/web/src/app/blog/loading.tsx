export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="ukride-section-charcoal py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between gap-3">
            <div className="h-9 w-48 animate-pulse rounded-md bg-[rgba(192,192,192,0.08)]" />
            <div className="h-4 w-40 animate-pulse rounded-md bg-[rgba(192,192,192,0.08)]" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[rgba(192,192,192,0.12)] bg-[linear-gradient(180deg,rgba(26,26,29,0.7)_0%,rgba(13,13,15,0.78)_100%)] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.6)]"
              >
                <div className="h-40 w-full animate-pulse bg-[rgba(192,192,192,0.05)]" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 animate-pulse rounded bg-[rgba(192,192,192,0.08)]" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-[rgba(192,192,192,0.1)]" />
                  <div className="h-3 w-9/12 animate-pulse rounded bg-[rgba(192,192,192,0.08)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
