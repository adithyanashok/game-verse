// src/pages/Review/Components/ReviewHeader.tsx
import React, { type FC } from "react";

interface ReviewHeaderProps {
  review: {
    id: number;
    title: string;
    text: string;
    userId: number;
    userName: string;
    createdAt: string;
  };
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>;
}

const ReviewHeader: FC<ReviewHeaderProps> = ({ review, LinkComponent }) => {
  return (
    <>
      <h1 className="text-white font-bold text-2xl mb-4">{review.title}</h1>

      <LinkComponent to={`/profile/${review.userId}`}>
        <h1 className="text-white font-bold text-[12px] mb-4">
          {review.userName}
        </h1>
      </LinkComponent>

      <div className="flex items-center gap-3 text-sm text-gray-400">
        <span>{`Review ID: #${review.id}`}</span>
        <span>•</span>
        <span>{new Date(review.createdAt).toLocaleString()}</span>
      </div>

      <p className="text-[13px] md:text-[16px] leading-7 text-white mt-5 whitespace-pre-line">
        {review.text}
      </p>
    </>
  );
};

export default React.memo(ReviewHeader);
