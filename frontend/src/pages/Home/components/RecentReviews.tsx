import React from "react";
import { dummy } from "../../../data";
import HorizontalCard from "./HorizontalCard";

const RecentReviews = () => {
  return (
    <div className="text-primary p-5 md:p-10">
      <h1 className="font-bold md:text-2xl">Recent Reviews</h1>
      <div className="scroll-row">
        {dummy.map((review) => {
          return <HorizontalCard key={review.id} />;
        })}
      </div>
    </div>
  );
};

export default RecentReviews;
