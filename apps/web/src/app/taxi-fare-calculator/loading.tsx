export default function TaxiFareCalculatorLoading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-5">
              <div className="h-7 w-44 animate-pulse rounded-full bg-foreground/15" />
              <div className="h-12 w-full max-w-xl animate-pulse rounded bg-foreground/15" />
              <div className="h-6 w-5/6 animate-pulse rounded bg-foreground/15" />
              <div className="h-5 w-40 animate-pulse rounded bg-foreground/15" />
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-card p-6 shadow-xl">
              <div className="space-y-4">
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
                <div className="h-11 w-full animate-pulse rounded bg-accent/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 animate-pulse rounded-full bg-muted" />
                <div className="mx-auto h-5 w-36 animate-pulse rounded bg-muted" />
                <div className="mx-auto mt-3 h-4 w-44 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 h-10 w-96 max-w-full animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 animate-pulse rounded-full bg-muted" />
                <div className="mx-auto h-6 w-52 animate-pulse rounded bg-muted" />
                <div className="mx-auto mt-4 h-4 w-11/12 animate-pulse rounded bg-muted" />
                <div className="mx-auto mt-2 h-4 w-10/12 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
