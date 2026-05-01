import { useEffect } from "react";
import { useState } from "react";
import { useTopReviewers } from "../../../hooks/useUser";
import { FiUser } from "react-icons/fi";

type ReviewerAvatarProps = {
  name: string;
  image?: string;
};

const ReviewerAvatar = ({ name, image }: ReviewerAvatarProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const imageUrl = image?.startsWith("http") ? image : `https://${image}`;

  if (!image || hasImageError) {
    return (
      <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full border border-[rgba(0,212,255,0.22)] bg-[linear-gradient(135deg,#10243a,#18102d)] text-sm font-black text-[var(--color-lime)] shadow-lg shadow-black/20">
        {initials || <FiUser className="h-5 w-5" />}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      className="h-[60px] w-[60px] flex-shrink-0 rounded-full border border-[rgba(0,212,255,0.18)] object-cover"
      loading="lazy"
      alt={name}
      onError={() => setHasImageError(true)}
    />
  );
};

const TopReviewers = () => {
  const { data: reviewers = [], isLoading: loading, error } = useTopReviewers();

  return (
    <div>
      <h1 className="text-white font-bold text-[20px]">Top Reviewers</h1>
      <div className="flex flex-col gap-x-2 gap-y-2 mt-3">
        {loading && reviewers.length === 0 && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="mt-2 flex items-center gap-4">
                <div className="h-[60px] w-[60px] animate-pulse rounded-full border border-[rgba(0,212,255,0.14)] bg-[#0d1424]" />
                <div className="space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded-full bg-[#0d1424]" />
                  <div className="h-3 w-20 animate-pulse rounded-full bg-[#0d1424]" />
                </div>
              </div>
            ))}
          </>
        )}

        {error && reviewers.length === 0 && (
          <div className="rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424]/80 px-4 py-5 text-sm text-[#9aa7bd]">
            Top reviewers are unavailable right now.
          </div>
        )}

        {!loading && !error && reviewers.length === 0 && (
          <div className="rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424]/80 px-4 py-5 text-sm text-[#9aa7bd]">
            No top reviewers found.
          </div>
        )}

        {reviewers.map((review) => {
          const reviewerName = review.name?.trim() || "GameVera Player";

          return (
            <div key={review.id} className="flex gap-4 items-center mt-2">
              <ReviewerAvatar
                name={reviewerName}
                image={review.profileImage || ""}
              />{" "}
              <div>
                {" "}
                <p className="text-white font-bold text-1xl">
                  {reviewerName}
                </p>{" "}
                <p className="text-[var(--color-blue)] text-[14px]">
                  {review.followersCount} Followers
                </p>{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default TopReviewers;
