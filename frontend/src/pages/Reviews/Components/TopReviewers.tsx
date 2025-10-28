import React from "react";
import { dummy } from "../../../data";

const TopReviewers = () => {
  return (
    <div>
      <h1 className="text-white font-bold text-[20px]">Top Reviewers</h1>
      <div className="flex flex-col gap-x-2 gap-y-2 mt-3">
        {dummy.map((review) => {
          return (
            <div key={review.id} className="flex gap-4 items-center mt-2">
              <img
                src={review.image}
                className="w-[60px] h-[60px] rounded-full"
                alt=""
              />
              <div>
                <p className="text-white font-bold text-1xl">{review.author}</p>
                <p className="text-gray-700 text-[14px]">140 reviews</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopReviewers;
