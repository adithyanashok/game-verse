import RatingStats from "./RatingStats";
import RatingCard from "./Rating";

const ReviewStats = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-5 rounded-[10px] border border-[rgba(0,212,255,0.1)] bg-[#070b16]/70 p-4 sm:p-5 lg:flex-row lg:items-center">
      {/* Rating */}
      <RatingCard />
      {/* Stats Bars */}
      <div className="min-w-0 flex-1">
        <RatingStats />
      </div>
    </div>
  );
};

export default ReviewStats;
