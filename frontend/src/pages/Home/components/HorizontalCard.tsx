import { Link } from "react-router";
import Button from "../../../components/common/Button";
import type { ReviewSummary } from "../../../features/reviews/types";

interface HorizontalCardProps {
  review: ReviewSummary;
}

const HorizontalCard = ({ review }: HorizontalCardProps) => {
  return (
    <div className="flex gap-x-4 items-start shadow-md rounded-[8px]">
      <img
        className="card-image rounded-[10px] object-cover"
        loading="lazy"
        src={review.imageUrl || ""}
        alt={review.title}
      />
      <div className="flex w-[290px] md:w-[550px] flex-col gap-y-1">
        <h1 className="text-[12px] md:text-2xl font-bold text-white">
          {review.title}
        </h1>
        <h1 className="text-[10px] text-gray-500">{review.user.name}</h1>
        <Link to={`/review/${review.id}`}>
          <Button
            label="Read Review"
            className="text-[11px] px-1 py-1 md:px-3 md:py-2 rounded-[10px] mt-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default HorizontalCard;
