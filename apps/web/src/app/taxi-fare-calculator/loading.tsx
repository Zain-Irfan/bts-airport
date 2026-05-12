export default function TaxiFareCalculatorLoading() {
  const shimmer = "animate-pulse rounded-md bg-[rgba(192,192,192,0.08)]";
  return (
    <div className="min-h-screen bg-background">
      <section className="ukride-luxury-section-1 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-5">
              <div className={`${shimmer} h-6 w-40 rounded-full`} />
              <div className={`${shimmer} h-12 w-full max-w-xl`} />
              <div className={`${shimmer} h-5 w-5/6`} />
              <div className={`${shimmer} h-4 w-40`} />
            </div>
            <div className="rounded-2xl border border-[rgba(192,192,192,0.12)] bg-[linear-gradient(180deg,rgba(26,26,29,0.7)_0%,rgba(13,13,15,0.78)_100%)] p-6 shadow-[0_28px_72px_-24px_rgba(0,0,0,0.7)]">
              <div className="space-y-4">
                <div className={`${shimmer} h-10 w-full`} />
                <div className={`${shimmer} h-10 w-full`} />
                <div className={`${shimmer} h-10 w-full`} />
                <div className={`${shimmer} h-10 w-full`} />
                <div className="h-11 w-full animate-pulse rounded-md bg-[rgba(75,0,130,0.35)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ukride-section-charcoal py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3 text-center">
                <div className={`${shimmer} mx-auto h-14 w-14 rounded-full`} />
                <div className={`${shimmer} mx-auto h-5 w-36`} />
                <div className={`${shimmer} mx-auto h-4 w-44`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
