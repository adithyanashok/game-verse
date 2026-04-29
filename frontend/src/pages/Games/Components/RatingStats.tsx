import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";

const RatingStats = () => {
  const { currentGame } = useAppSelector((state: RootState) => state.game);

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {currentGame?.rating.ratings.map((rating) => {
        return (
          <div
            key={rating.rating}
            className="flex min-w-0 items-center gap-3 text-white"
          >
            <h1 className="w-4 flex-shrink-0 text-sm font-bold text-white">
              {rating.rating}
            </h1>
            <progress
              className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full appearance-none bg-[#132033] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#132033] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[var(--color-blue)] [&::-moz-progress-bar]:bg-[var(--color-blue)]"
              value={rating.percent}
              max={100}
            />
            <p className="w-12 flex-shrink-0 text-right text-[13px] text-grey">
              {rating.percent}%
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStats;

