const ReviewSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-[rgba(0,212,255,0.14)] bg-[#0d1424]/86 shadow-2xl shadow-black/25">
    <div className="h-56 animate-pulse bg-[linear-gradient(110deg,#0d1424_8%,#16243a_18%,#0d1424_33%)] bg-size-[200%_100%] sm:h-80" />
    <div className="space-y-4 p-5 md:p-8">
      {["w-28", "w-3/4", "w-full", "w-2/3"].map((w) => (
        <div
          key={w}
          className={`h-${w === "w-28" ? 5 : w === "w-3/4" ? 8 : 4} ${w} animate-pulse rounded-full bg-[linear-gradient(110deg,#0d1424_8%,#16243a_18%,#0d1424_33%)] bg-[length:200%_100%]`}
        />
      ))}
    </div>
  </div>
);

export default ReviewSkeleton;
