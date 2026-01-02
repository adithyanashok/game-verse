export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-12 h-12 border-4 border-[#6711bf] border-t-transparent rounded-full animate-spin ${className}`}
    ></div>
  );
}

export default function ScreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-[9999]">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        {/* Optional text */}
        <p className="text-white text-sm font-medium tracking-wide opacity-80">
          Loading...
        </p>
      </div>
    </div>
  );
}
