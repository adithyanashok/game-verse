import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import ReviewCard from "../../Reviews/Components/ReviewCard";

const Trending = () => {
  const trending = useAppSelector((state: RootState) => state.reviews.trending);

  return (
    <div className="scroll-row flex gap-4 px-4 py-4 sm:px-6 lg:px-8">
      {trending.map((review) => (
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

export default Trending;
