import { useEffect } from "react";
import Trending from "./Trending";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { fetchTrendingReviews } from "../../../features/reviews/reviewsSlice";
import { Spinner } from "../../../components/common/Loader";

const TrendingSection = () => {
  const dispatch = useAppDispatch();

  const trending = useAppSelector((state: RootState) => state.reviews.trending);
  const loading = useAppSelector(
    (state: RootState) => state.reviews.loading.trending
  );
  const error = useAppSelector(
    (state: RootState) => state.reviews.errors.trending
  );

  useEffect(() => {
    if (!trending || trending.length === 0) {
      dispatch(fetchTrendingReviews());
    }
  }, [dispatch, trending]);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Failed to load trending reviews
      </div>
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
    <section id="features" className="py-10 bg-dark text-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-1">
        Trending Reviews
      </h2>
      <p className="text-[#989fab] text-sm md:text-base mb-6 text-center">
        Discover what the community is talking about
      </p>

      <Trending />
    </section>
  );
};

export default TrendingSection;
