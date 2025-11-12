import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTrendingReviews } from "../../../features/reviews/reviewsSlice";
import type { RootState } from "../../../store";
import CustomCard from "../../../components/common/ScrollableRow";

const Trending = () => {
  const dispatch = useAppDispatch();
  const { trending, loading, errors } = useAppSelector(
    (state: RootState) => state.reviews
  );

  // Fetch trending reviews once on mount
  useEffect(() => {
    dispatch(fetchTrendingReviews());
  }, [dispatch]);

  // Handle loading and error states
  if (loading.trending) {
    return <div className="text-center py-4 text-gray-400">Loading...</div>;
  }

  if (errors.trending) {
    return (
      <div className="text-center py-4 text-red-500">{errors.trending}</div>
    );
  }

  if (!trending || trending.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400">
        No trending reviews found.
      </div>
    );
  }

  return (
    <div className="scroll-row flex gap-4 overflow-x-auto p-2">
      {trending.map((review) => (
        <CustomCard
          key={review.id}
          subtitle={`By ${review.userName}`}
          image={
            <img
              className="card-image object-cover w-[350px] h-45 rounded-lg"
              src={review.imageUrl}
              alt={review.title || "Trending Review"}
              loading="lazy"
            />
          }
          title={review.title}
          showSubtitle
          rating={review.rating?.overall}
        />
      ))}
    </div>
  );
};

export default Trending;
