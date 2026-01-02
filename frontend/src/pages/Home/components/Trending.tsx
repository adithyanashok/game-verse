import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import CustomCard from "../../../components/common/ScrollableRow";
import { Link } from "react-router-dom";

const Trending = () => {
  const trending = useAppSelector((state: RootState) => state.reviews.trending);

  return (
    <div className="scroll-row py-2 flex sm:gap-3 px-4">
      {trending.map((review) => (
        <Link key={review.id} to={`/review/${review.id}`}>
          <CustomCard
            classes={{
              container: "rounded-[8px]",
              title:
                "mx-2 mt-2 font-medium text-[14px] lg:text-base 2xl:text-[18px] text-white",
              subtitle: "text-xs ml-2 mt-1 text-grey",
              ratingWrapper: "mx-2 mt-1",
            }}
            padding="p-1"
            height="h-54 sm:h-60 lg:h-66 2xl:h-68"
            subtitle={`By ${review.user && review.user.name}`}
            image={
              <img
                className="w-full h-25 sm:h-32 md:h-38 object-cover rounded-[5px]"
                src={review.imageUrl}
                alt={review.title || "Trending Review"}
                loading="lazy"
              />
            }
            title={review.title}
            showSubtitle
            rating={{
              value: review.rating?.overall ?? 0,
              size: "medium",
              color: "#7c3aed",
            }}
          />
        </Link>
      ))}
    </div>
  );
};

export default Trending;
