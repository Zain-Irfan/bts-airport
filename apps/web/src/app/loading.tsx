export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        {/* Spinning ring with brand mark */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[rgba(155,81,224,0.25)]" style={{ animation: "ukride-ring-pulse 2s ease-in-out infinite" }} />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#9B51E0]" style={{ animation: "ukride-spin 0.9s linear infinite" }} />
          <span className="text-[10px] font-extrabold tracking-tight text-[#F8F8F8]">BTS</span>
        </div>

        {/* Dot pulse */}
        <div className="flex items-center gap-1.5">
          <span className="ukride-dot-pulse h-1 w-1 rounded-full bg-[#C0C0C0]" style={{ animationDelay: "0ms" }} />
          <span className="ukride-dot-pulse h-1 w-1 rounded-full bg-[#C0C0C0]" style={{ animationDelay: "160ms" }} />
          <span className="ukride-dot-pulse h-1 w-1 rounded-full bg-[#C0C0C0]" style={{ animationDelay: "320ms" }} />
        </div>
      </div>
    </div>
  );
}
