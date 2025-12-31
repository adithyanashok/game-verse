import type { RatingBreakdown as Rating } from "../../../features/reviews/types";

interface RatingBreakdownProps {
  rating?: Rating;
}

const metrics: Array<keyof Rating> = ["graphics", "gameplay", "story", "sound"];

const RatingBreakdown = ({ rating }: RatingBreakdownProps) => {
  if (!rating) {
    return (
      <p className="text-gray-400 text-sm">
        Rating details will appear here once available.
      </p>
    );
  }

  return (
    <div className="text-white flex flex-col justify-between sm:p-4 mt-4 sm:border sm:border-[#989fab1e] rounded-[10px] gap-4">
      {metrics.map((metric) => {
        const value = rating[metric];
        return (
          <div
            key={metric}
            className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4"
          >
            {/* Metric Label */}
            <p className="text-[11px] sm:text-[14px] capitalize">{metric}</p>

            {/* Progress + Value */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <progress
                className="
                  w-full 
                  sm:w-48 
                  h-2
                  md:h-3 
                  rounded-full 
                  overflow-hidden 
                  appearance-none 
                  bg-dark-purple
                  [&::-webkit-progress-bar]:rounded-full 
                  [&::-webkit-progress-value]:bg-[var(--color-purple)] 
                  [&::-webkit-progress-value]:rounded-full 
                  [&::-moz-progress-bar]:bg-[var(--color-purple)]
                "
                value={value * 10}
                max={100}
              />
              <p className="text-[10px] sm:text-[14px] font-bold whitespace-nowrap">
                {value.toFixed(1)}/10
              </p>
            </div>
          </div>
        );
      })}

      {/* Overall Rating */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-2 pt-2 border-t border-[#989fab1e] gap-1">
        <p className="text-[12px] sm:text-[14px] font-semibold">Overall</p>
        <span className="text-[var(--color-purple)] font-bold sm:text-base text-[14px] sm:text-[16px]">
          {rating.overall.toFixed(1)} / 10
        </span>
      </div>
    </div>
  );
};
console.log(RatingBreakdown);

export default RatingBreakdown;
