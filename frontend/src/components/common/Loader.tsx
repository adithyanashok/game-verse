type SpinnerProps = {
  className?: string;
};

type AppLoaderProps = {
  label?: string;
  fullscreen?: boolean;
  className?: string;
  containerClassName?: string;
  spinnerClassName?: string;
};

export function Spinner({ className = "" }: SpinnerProps) {
  return (
    <div
      className={`w-12 h-12 border-4 border-[var(--color-blue)] border-t-transparent rounded-full animate-spin ${className}`}
    ></div>
  );
}

export function AppLoader({
  label = "Loading...",
  fullscreen = false,
  className = "",
  containerClassName = "",
  spinnerClassName = "",
}: AppLoaderProps) {
  return (
    <div
      className={`flex items-center justify-center ${fullscreen ? "fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm" : "w-full py-8"} ${containerClassName}`}
    >
      <div
        className={`flex flex-col items-center gap-4 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 px-6 py-5 shadow-xl shadow-black/20 ${className}`}
      >
        <Spinner className={spinnerClassName} />
        <p className="text-sm font-medium tracking-wide text-white/80">
          {label}
        </p>
      </div>
    </div>
  );
}

type RouteSkeletonProps = {
  title?: string;
  lines?: number;
};

export function RouteSkeleton({
  title = "Loading section...",
  lines = 3,
}: RouteSkeletonProps) {
  return (
    <div className="w-full px-3 py-6 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-4 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold text-[#c8d3e4]">{title}</p>
        <div className="h-40 animate-pulse rounded-[10px] bg-[linear-gradient(110deg,#0d1424_8%,#16243a_18%,#0d1424_33%)] bg-[length:200%_100%]" />
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 animate-pulse rounded-full bg-[linear-gradient(110deg,#0d1424_8%,#16243a_18%,#0d1424_33%)] bg-[length:200%_100%] ${
              index === lines - 1 ? "w-2/3" : "w-full"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ScreenLoader(props: Omit<AppLoaderProps, "fullscreen">) {
  return <AppLoader fullscreen {...props} />;
}
