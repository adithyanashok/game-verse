import React, { useMemo, useState, type FC, type SyntheticEvent } from "react";
import dayjs from "dayjs";
import { FiUser } from "react-icons/fi";
import type { ReviewSummary } from "../../../../features/reviews/types";

interface ReviewHeaderProps {
  review: ReviewSummary;
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>;
}

const getProfileImageUrl = (profileImage?: string) => {
  if (!profileImage) return "";
  return profileImage.startsWith("http") ? profileImage : `https://${profileImage}`;
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

const ReviewHeader: FC<ReviewHeaderProps> = ({ review, LinkComponent }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const reviewerName = review.user?.name || "Anonymous reviewer";
  const profileImageUrl = useMemo(
    () => getProfileImageUrl(review.user?.profileImage),
    [review.user?.profileImage],
  );
  const showProfileImage = Boolean(profileImageUrl) && !imageFailed;
  const initials = getInitials(reviewerName);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = "none";
    setImageFailed(true);
  };

  return (
    <>
      <h1 className="mb-4 mt-3 text-[20px] font-bold text-white sm:text-2xl">
        {review.title}
      </h1>

      <LinkComponent to={`/profile/${review.user.id}`}>
        <div className="flex items-center gap-3">
          {showProfileImage ? (
            <div className="h-10 w-10 lg:h-10 lg:w-10">
              <img
                src={profileImageUrl}
                alt={reviewerName}
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
                onError={handleImageError}
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.16),rgba(0,212,255,0.06))] text-sm font-black text-[#cbeafe]">
              {initials === "U" ? <FiUser className="h-4 w-4" /> : initials}
            </div>
          )}

          <h1 className="ml-0 text-[14px] font-bold text-white sm:text-[18px]">
            {reviewerName}
          </h1>
        </div>
      </LinkComponent>

      <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-400 sm:text-[12px]">
        <span>{dayjs(review.createdAt).format("DD MMM YYYY")}</span>
      </div>

      <p className="mt-5 text-[14px] leading-6 text-white sm:text-[16px] md:text-[18px]">
        {review.text}
      </p>
    </>
  );
};

export default React.memo(ReviewHeader);
