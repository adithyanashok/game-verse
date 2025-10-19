import React from "react";

const RatingStats = () => {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="text-white  flex flex-col items-center gap-1 ">
      {ratings.reverse().map((rating) => {
        return (
          <div key={rating} className="flex gap-2">
            <h1>{rating}</h1>
            <div className="flex items-center gap-3">
              <progress
                className="w-max lg:w-2xl xl:w-5xl h-3 rounded-full overflow-hidden appearance-none bg-dark-purple [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-[var(--color-purple)] [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-[var(--color-purple)]"
                value={90}
                max={100}
              />
              <p className="text-[13px] text-grey">43%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStats;
