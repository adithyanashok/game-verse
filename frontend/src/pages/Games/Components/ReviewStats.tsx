import RatingStats from "./RatingStats";
import RatingCard from "./Rating";

const ReviewStats = () => {
  return (
    <div className="flex flex-col md:flex-row bg-dark p-5 justify-center items-center gap-6 rounded-2xl mt-10">
      {/* Rating */}
      <RatingCard />
      {/* Stats Bars */}
      <RatingStats />
    </div>
  );
};

export default ReviewStats;
