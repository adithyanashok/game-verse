import React from "react";
import { dummy } from "../../../data";

const RatingBreakdown = () => {
  const arr = new Array(4).fill(1);
  return (
    <div className="text-white md:flex md:flex-col justify-between p-2 mt-2 border-1 border-[var(--color-grey)] rounded-[10px]">
      {arr.map((e) => {
        return (
          <div className="md:flex md:flex-row justify-between p-2">
            <p className="text-[13px]">Graphics</p>
            <div className="flex items-center gap-3">
              <progress
                className="w-64 h-3 rounded-full overflow-hidden appearance-none bg-dark-purple [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-[var(--color-purple)] [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-[var(--color-purple)]"
                value={90}
                max={100}
              />
              <p className="text-[13px] font-bold">9/10</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
