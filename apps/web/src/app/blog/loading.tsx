export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="ukride-section-charcoal py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between gap-3">
            <div className="ukride-shimmer h-9 w-48" />
            <div className="ukride-shimmer h-4 w-40" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-[rgba(192,192,192,0.08)] bg-[linear-gradient(180deg,rgba(26,26,29,0.7)_0%,rgba(13,13,15,0.78)_100%)]"
              >
                <div className="ukride-shimmer h-44 w-full !rounded-none" />
                <div className="space-y-3 p-5">
                  <div className="ukride-shimmer h-3 w-20" />
                  <div className="ukride-shimmer h-5 w-11/12" />
                  <div className="ukride-shimmer h-3 w-9/12" />
                  <div className="ukride-shimmer mt-2 h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
