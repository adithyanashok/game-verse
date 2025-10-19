import React from "react";
import { dummy } from "../../../data";

const TrendingGenres = () => {
  return (
    <div>
      <h1 className="text-white font-bold text-[20px]">Trending Genres</h1>
      <div className="flex flex-wrap gap-x-2 gap-y-2 mt-3">
        {dummy.map((review) => {
          return (
            <p
              key={review.id}
              className="bg-dark-purple py-1.5 px-2 text-[var(--color-purple)] rounded-full text-[12px] font-bold"
            >
              Adventure
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingGenres;
