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
    <div className="text-white flex flex-col justify-between p-4 mt-4 border border-[#989fab1e] rounded-[10px] gap-2">
      {metrics.map((metric) => {
        const value = rating[metric];
        return (
          <div
            key={metric}
            className="flex flex-row justify-between items-center gap-4"
          >
            <p className="text-[13px] capitalize">{metric}</p>
            <div className="flex items-center gap-3">
              <progress
                className="w-48 h-3 rounded-full overflow-hidden appearance-none bg-dark-purple [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-[var(--color-purple)] [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-[var(--color-purple)]"
                value={value * 10}
                max={100}
              />
              <p className="text-[13px] font-bold">{value.toFixed(1)}/10</p>
            </div>
          </div>
        );
      })}
      <div className="flex flex-row justify-between items-center mt-2 pt-2 border-t border-[#989fab1e]">
        <p className="text-[13px] font-semibold">Overall</p>
        <span className="text-[var(--color-purple)] font-bold text-base">
          {rating.overall.toFixed(1)} / 10
        </span>
      </div>
    </div>
  );
};

export default RatingBreakdown;
