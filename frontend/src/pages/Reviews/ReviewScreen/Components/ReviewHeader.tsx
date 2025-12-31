// src/pages/Review/Components/ReviewHeader.tsx
import React, { type FC } from "react";
import type { ReviewSummary } from "../../../../features/reviews/types";
import dayjs from "dayjs";
interface ReviewHeaderProps {
  review: ReviewSummary;
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>;
}

const ReviewHeader: FC<ReviewHeaderProps> = ({ review, LinkComponent }) => {
  return (
    <>
      <h1 className="text-white font-bold text-[20px] sm:text-2xl mb-4 mt-3">
        {review.title}
      </h1>

      <LinkComponent to={`/profile/${review.user.id}`}>
        <div className="flex items-center">
          <div className="w-10 h-10 lg:w-10 lg:h-10">
            <img
              src={`https://${review.user.profileImage}`}
              alt="User"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h1 className="text-white font-bold text-[14px] sm:text-[18px] ml-2">
            {review.user.name}
          </h1>
        </div>
      </LinkComponent>

      <div className="flex items-center gap-3 text-[10px] sm:text-[12px] text-gray-400 mt-2">
        <span>{dayjs(review.createdAt).format("DD MMM YYYY")}</span>
      </div>

      <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-6 text-white mt-5">
        {review.text}
      </p>
    </>
  );
};

export default React.memo(ReviewHeader);
