import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { fetchRecentReviews } from "../../../features/reviews/reviewsSlice";
import { AppLoader } from "../../../components/common/Loader";
import ReviewCard from "../../Reviews/Components/ReviewCard";
import HomeSectionState from "./HomeSectionState";

const LatestReviews = () => {
  const dispatch = useAppDispatch();
  const recent = useAppSelector((state: RootState) => state.reviews.recent);
  const loading = useAppSelector(
    (state: RootState) => state.reviews.loading.recent
  );
  const error = useAppSelector(
    (state: RootState) => state.reviews.errors.recent
  );

  useEffect(() => {
    if (!recent || recent.length === 0) {
      dispatch(fetchRecentReviews());
    }
  }, [dispatch, recent]);

  if (loading) {
    return <AppLoader label="Loading latest reviews..." />;
  }

  if (error) {
    return (
      <HomeSectionState
        title="Latest reviews are unavailable"
        message={error}
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
      {recent.map((review) => (
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
