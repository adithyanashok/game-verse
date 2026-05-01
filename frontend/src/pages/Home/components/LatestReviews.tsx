import { useRecentReviews } from "../../../pages/Reviews/hooks/useReviewQueries";
import { AppLoader } from "../../../components/common/Loader";
import ReviewCard from "../../Reviews/Components/ReviewCard";
import HomeSectionState from "./HomeSectionState";
import type { Review } from "../../../types/review.type";

const LatestReviews = () => {
  const { data: recent, isLoading: loading, error } = useRecentReviews();

  if (loading) {
    return <AppLoader label="Loading latest reviews..." />;
  }

  if (error) {
    return (
      <HomeSectionState
        title="Latest reviews are unavailable"
        message={error instanceof Error ? error.message : "Failed to load"}
      />
    );
  }

  if (!recent || recent.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400">
        No recent reviews found.
      </div>
    );
  }
  return (
    <div className="scroll-row flex gap-4 px-4 py-4 sm:px-6 lg:px-8">
      {recent.map((review: Review) => (
        <div
          key={review.id}
          className="h-[310px] w-[240px] flex-shrink-0 sm:h-[325px] sm:w-[260px]"
        >
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
};

export default LatestReviews;
