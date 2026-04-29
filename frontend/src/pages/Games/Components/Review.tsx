import { useMemo, useState, type SyntheticEvent } from "react";
import { Rating } from "@mui/material";
import {
  FiCalendar,
  FiEye,
  FiMessageSquare,
  FiThumbsUp,
  FiUser,
} from "react-icons/fi";
import type { ReviewSummary } from "../../../features/reviews/types";

interface Props {
  review: ReviewSummary;
}

const getProfileImageUrl = (profileImage?: string) => {
  if (!profileImage) return "";
  return profileImage.startsWith("http")
    ? profileImage
    : `https://${profileImage}`;
};

const getInitials = (name?: string) => {
  if (!name) return "U";

  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

const GameReview = ({ review }: Props) => {
  const [imageFailed, setImageFailed] = useState(false);

  const createdDate = useMemo(() => {
    const date = new Date(review.createdAt);
    if (Number.isNaN(date.getTime())) return review.createdAt;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [review.createdAt]);

  const profileImageUrl = getProfileImageUrl(review.user?.profileImage);
  const showProfileImage = Boolean(profileImageUrl) && !imageFailed;
  const reviewerName = review.user?.name || "Anonymous reviewer";
  const initials = getInitials(reviewerName);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = "none";
    setImageFailed(true);
  };

  return (
    <article className="group rounded-[10px] border border-[rgba(0,212,255,0.1)] bg-[linear-gradient(180deg,rgba(13,20,36,0.92),rgba(7,11,22,0.92))] p-4 shadow-lg shadow-black/10 transition duration-200 hover:border-[rgba(0,212,255,0.24)] hover:bg-[linear-gradient(180deg,rgba(16,25,43,0.96),rgba(8,13,25,0.96))] sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {showProfileImage ? (
              <img
                className="h-12 w-12 flex-shrink-0 rounded-full border border-[rgba(0,212,255,0.16)] object-cover shadow-lg shadow-black/20"
                src={profileImageUrl}
                alt={reviewerName}
                loading="lazy"
                onError={handleImageError}
              />
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.16),rgba(0,212,255,0.06))] text-sm font-black text-[#cbeafe] shadow-lg shadow-black/20">
                {initials === "U" ? <FiUser className="h-4 w-4" /> : initials}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="truncate text-sm font-black text-white sm:text-base">
                  {reviewerName}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#8ea0b9]">
                  <FiCalendar className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                  {createdDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="rounded-full border border-[rgba(0,212,255,0.12)] bg-[#07101a]/80 px-1 flex justify-center py-1">
              <Rating
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "rgba(255,255,255,0.24)",
                  },
                }}
                style={{ color: "var(--color-blue)", fontSize: "16px" }}
                name={`game-review-rating-${review.id}`}
                value={review.rating?.overall ?? 0}
                precision={0.1}
                readOnly
              />
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(182,255,59,0.14)] bg-[rgba(182,255,59,0.08)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-lime)]">
                <FiThumbsUp className="h-3.5 w-3.5" />
                {review.likeCount}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#cbeafe]">
                <FiEye className="h-3.5 w-3.5" />
                {review.viewCount}
              </span>
            </div>
          </div>
        </div>

        {review.title && (
          <p className="mt-1 line-clamp-1 text-sm font-semibold text-[#c8d3e4]">
            {review.title}
          </p>
        )}
        <p className="text-sm leading-7 text-[#9aa7bd] sm:text-[15px]">
          {review.text}
        </p>

        <div className="flex flex-wrap items-center gap-2 border-t border-[rgba(0,212,255,0.08)] pt-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(182,255,59,0.14)] bg-[rgba(182,255,59,0.08)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-lime)]">
            <FiThumbsUp className="h-3.5 w-3.5" />
            {review.likeCount} likes
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#cbeafe]">
            <FiEye className="h-3.5 w-3.5" />
            {review.viewCount} views
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#9aa7bd]">
            <FiMessageSquare className="h-3.5 w-3.5" />
            Open review
          </span>
        </div>
      </div>
    </article>
  );
};

export default GameReview;
