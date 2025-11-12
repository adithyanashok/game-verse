import React from "react";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";

const RatingStats = () => {
  const { currentGame } = useAppSelector((state: RootState) => state.game);

  return (
    <div className="text-white  flex flex-col items-center gap-1 ">
      {currentGame?.rating.ratings.map((rating) => {
        return (
          <div key={rating.rating} className="flex gap-2">
            <h1>{rating.rating}</h1>
            <div className="flex items-center gap-3">
              <progress
                className="w-max lg:w-2xl xl:w-5xl h-3 rounded-full overflow-hidden appearance-none bg-dark-purple [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-[var(--color-purple)] [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-[var(--color-purple)]"
                value={rating.percent}
                max={100}
              />
              <p className="text-[13px] text-grey">{rating.percent}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStats;
