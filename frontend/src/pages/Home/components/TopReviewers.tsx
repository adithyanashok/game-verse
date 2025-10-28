import React from "react";
import CustomCard from "../../../components/common/ScrollableRow";
import { dummy } from "../../../data";

const TopReviewers = () => {
  return (
    <div className="text-primary p-5 md:p-10">
      <h1 className="font-bold md:text-2xl">Top Reviewers</h1>
      <div className="scroll-row">
        {dummy.map((review) => {
          return (
            <CustomCard
              key={review.id}
              subtitle={review.author}
              image={
                <img
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full object-cover"
                  src={review.image}
                  alt=""
                />
              }
              title={review.author}
              showSubtitle={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopReviewers;
