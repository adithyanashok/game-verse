import { useNavigate } from "react-router";
import { AiFillStar } from "react-icons/ai";

import type { ReviewSummary } from "../../../features/reviews/types";

interface ReviewCardProps {
  review: ReviewSummary;
}

const formatDate = (value: string) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/review/${review.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full  cursor-pointer bg-dark sm:rounded-[10px] md:rounded-[10px] overflow-hidden hover-card md:max-w-xs relative"
    >
      {review.imageUrl ? (
        <img
          src={review.imageUrl}
          alt={review.title}
          className="w-full h-32 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="bg-gradient-to-br from-[#331b57] to-[#1f1630] h-32 flex items-center justify-center">
          <span className="text-[var(--color-purple)] text-lg font-semibold">
            {review.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}

      <div className="px-4 py-3">
        <h3 className="text-white font-semibold lg:text-sm xl:text-lg line-clamp-2">
          {review.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3 min-h-[5px]">
          {review.user?.name}
        </p>
        <div className="flex items-center gap-1.5 my-2">
          <AiFillStar className="text-[#6711bf]" size={18} />
          <span className="text-white text-sm font-medium">
            {review.rating?.overall !== undefined
              ? review.rating.overall.toFixed(1)
              : 0.0}
          </span>
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
          {formatDate(review.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
