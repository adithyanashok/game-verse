import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FiCalendar, FiImage, FiUser } from "react-icons/fi";

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
  const [hasImageError, setHasImageError] = useState(false);

  const rating =
    review.rating?.overall !== undefined ? review.rating.overall.toFixed(1) : "0.0";
  const reviewerName = review.user?.name || "GameVera Player";
  const titleInitials = review.title?.slice(0, 2).toUpperCase() || "GV";
  const hasCoverImage = Boolean(review.imageUrl) && !hasImageError;

  const handleCardClick = () => {
    navigate(`/review/${review.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[rgba(0,212,255,0.36)] hover:bg-[#121a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,#10243a,#18102d)]">
        {hasCoverImage ? (
          <img
            src={review.imageUrl}
            alt={review.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <FiImage className="h-7 w-7 text-[var(--color-blue)]" />
            <span className="text-2xl font-black text-[var(--color-lime)]">
              {titleInitials}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa7bd]">
              Cover unavailable
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,11,22,0.88)_100%)]" />

        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-lime)] px-2.5 py-1 text-xs font-black text-[#07101a] shadow-lg shadow-black/20">
          <AiFillStar size={14} />
          {rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        <h3 className="line-clamp-2 min-h-[44px] text-base font-black leading-6 text-white">
          {review.title}
        </h3>

        <div className="mt-3 min-h-[58px] content-start flex flex-wrap items-start gap-2 text-xs font-semibold text-[#9aa7bd]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,212,255,0.12)] bg-white/5 px-2.5 py-1">
            <FiUser className="h-3.5 w-3.5 text-[var(--color-blue)]" />
            <span className="max-w-[130px] truncate">{reviewerName}</span>
          </span>

          {formatDate(review.createdAt) && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,212,255,0.12)] bg-white/5 px-2.5 py-1">
              <FiCalendar className="h-3.5 w-3.5 text-[var(--color-blue)]" />
              {formatDate(review.createdAt)}
            </span>
          )}
        </div>

        <p className="mt-auto pt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-blue)]">
          Read review
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
