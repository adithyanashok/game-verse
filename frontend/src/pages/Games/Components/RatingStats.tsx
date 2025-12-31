import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";

const RatingStats = () => {
  const { currentGame } = useAppSelector((state: RootState) => state.game);

  return (
    <div>
      {currentGame?.rating.ratings.map((rating) => {
        return (
          <div
            key={rating.rating}
            className="flex justify-center items-center gap-2 text-white px-4"
          >
            <h1>{rating.rating}</h1>
            <progress
              className="w-full lg:w-2xl h-3 rounded-full overflow-hidden appearance-none bg-dark-purple [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-[var(--color-purple)] [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-[var(--color-purple)]"
              value={rating.percent}
              max={100}
            />
            <p className="text-[13px] text-grey">{rating.percent}%</p>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStats;
