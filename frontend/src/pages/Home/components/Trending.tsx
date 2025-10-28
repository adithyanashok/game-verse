import React from "react";
import { dummy } from "../../../data";
import CustomCard from "../../../components/common/ScrollableRow";

const Trending = () => {
  return (
    <div className="text-primary p-5 md:p-10">
      <h1 className="font-bold text-2xl">Trending Reviews</h1>
      <div className="scroll-row">
        {dummy.map((review) => {
          return (
            <CustomCard
              key={review.id}
              subtitle={"By " + review.author}
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

export default Trending;
