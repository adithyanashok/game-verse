import { useEffect } from "react";
import HorizontalCard from "./HorizontalCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { fetchRecentReviews } from "../../../features/reviews/reviewsSlice";

const RecentReviews = () => {
  const dispatch = useAppDispatch();
  const { recent, loading, errors } = useAppSelector(
    (state: RootState) => state.reviews
  );

  // Fetch recent reviews once on mount
  useEffect(() => {
    dispatch(fetchRecentReviews());
  }, [dispatch]);

  // Handle loading and error states
  if (loading.recent) {
    return <div className="text-center py-4 text-gray-400">Loading...</div>;
  }

  if (errors.recent) {
    return <div className="text-center py-4 text-red-500">{errors.recent}</div>;
  }

  if (!recent || recent.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400">
        No recent reviews found.
      </div>
    );
  }
  return (
    <div className="scroll-row gap-6">
      {recent.map((review) => {
        return <HorizontalCard key={review.id} review={review} />;
      })}
    </div>
  );
};

export default RecentReviews;
