export default function RootLoading() {
  return (
    <>
      {/* Slim top progress bar */}
      <div className="fixed inset-x-0 top-0 z-[9999] h-[3px] overflow-hidden">
        <div
          className="h-full w-full origin-left"
          style={{
            background: "linear-gradient(90deg, #333333, #999999, #C084FC)",
            animation: "adm-progress 1.4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Full screen backdrop */}
      <div className="flex min-h-screen items-center justify-center bg-background" />

      <style>{`
        @keyframes adm-progress {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}
