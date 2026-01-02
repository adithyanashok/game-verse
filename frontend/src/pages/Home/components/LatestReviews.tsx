import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { fetchRecentReviews } from "../../../features/reviews/reviewsSlice";

import CustomCard from "../../../components/common/ScrollableRow";
import { Link } from "react-router-dom";
import { Spinner } from "../../../components/common/Loader";

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

  console.log(recent);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!recent || recent.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400">
        No recent reviews found.
      </div>
    );
  }
  return (
    <div className="scroll-row py-2 gap-1 sm:gap-2 px-4">
      {recent.map((review) => (
        <Link key={review.id} to={`/review/${review.id}`}>
          <CustomCard
            classes={{
              container: "rounded-[10px]",
              imageWrapper: "rounded-[8px]",
              title:
                "font-medium text-xs md:text-sm lg:text-[15px] 2xl:text-[16px] text-white mx-2 mt-2 line-clamp-2 overflow-hidden",
              subtitle: "text-xs ml-2 mt-1 text-grey",
              ratingWrapper: "mx-2 mt-1",
            }}
            padding="p-0"
            width="w-[125px] sm:w-[150px] md:w-[200px] xl:w-[230px]"
            height="h-42 sm:h-44 md:h-53 lg:h-54 xl:h-58 2xl:h-60"
            subtitle={`By ${review.user && review.user.name}`}
            image={
              <img
                className="w-full object-cover"
                src={review.imageUrl}
                alt={review.title || "Latest Review"}
                loading="lazy"
              />
            }
            title={review.title}
            showSubtitle
            rating={{
              value: review.rating?.overall ?? 0,
              size: "small",
              color: "#7c3aed",
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default LatestReviews;
