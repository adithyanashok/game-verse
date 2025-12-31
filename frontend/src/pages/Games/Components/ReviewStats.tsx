import RatingStats from "./RatingStats";
import RatingCard from "./Rating";

const ReviewStats = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center bg-dark p-5  gap-6 sm:rounded-2xl sm:mt-10">
      {/* Rating */}
      <RatingCard />
      {/* Stats Bars */}
      <RatingStats />
    </div>
  );
};

export default ReviewStats;
