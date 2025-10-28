import React from "react";
import { dummy } from "../../../data";
import CustomCard from "../../../components/common/ScrollableRow";

const PopularGames = () => {
  return (
    <div className="text-primary p-5 md:p-10">
      <h1 className="font-bold md:text-2xl">Latest Reviews</h1>
      <div className="scroll-row">
        {dummy.map((review) => {
          return (
            <CustomCard
              key={review.id}
              subtitle={review.author}
              image={<img className="card-image" src={review.image} alt="" />}
              title={review.title}
              showSubtitle={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularGames;
