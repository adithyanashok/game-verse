import { FiStar } from "react-icons/fi";
import type { Game } from "../../../api/game/types";
import { Rating } from "@mui/material";
interface Props {
  overallRating: number | undefined;
  currentGame: Game | null;
}
const OverallRating = ({ overallRating, currentGame }: Props) => {
  return (
    <div className="space-y-4 lg:flex lg:flex-col">
      {overallRating ? (
        <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20 lg:h-full">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
                Ratings
              </p>
              <h3 className="mt-1 text-xl font-black text-white">
                Community verdict
              </h3>
            </div>
            <FiStar className="h-5 w-5 text-(--color-lime)" />
          </div>
          <div className="flex w-full min-w-0 flex-col gap-5 rounded-[10px] border border-[rgba(0,212,255,0.1)] bg-[#070b16]/70 p-4 sm:p-5 lg:flex-row lg:items-center">
            {/* Rating */}
            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl text-white font-bold">
                {currentGame?.rating.overallRating}
              </h1>
              <Rating
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#989fab",
                  },
                }}
                style={{ color: "var(--color-blue)" }}
                name="simple-controlled"
                value={Number(currentGame?.rating.overallRating.toFixed(0))}
                readOnly={true}
              />
              <p className="text-grey text-[12px]">1,230 reviews</p>
            </div>
            {/* Stats Bars */}
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 flex-col gap-3">
                {currentGame?.rating.ratings.map((rating) => {
                  return (
                    <div
                      key={rating.rating}
                      className="flex min-w-0 items-center gap-3 text-white"
                    >
                      <h1 className="w-4 shrink-0 text-sm font-bold text-white">
                        {rating.rating}
                      </h1>
                      <progress
                        className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full appearance-none bg-[#132033] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#132033] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-(--color-blue) [&::-moz-progress-bar]:bg-(--color-blue)"
                        value={rating.percent}
                        max={100}
                      />
                      <p className="w-12 shrink-0 text-right text-[13px] text-grey">
                        {rating.percent}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-[10px] border border-dashed border-white/10 bg-[#0d1424]/70 p-5 text-center shadow-xl shadow-black/10 lg:h-full">
          <FiStar className="mx-auto h-6 w-6 text-[#9aa7bd]" />
          <h3 className="mt-3 text-lg font-black text-white">
            Ratings are still coming in
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#9aa7bd]">
            Once players start scoring this title, the full breakdown will show
            up here.
          </p>
        </section>
      )}
    </div>
  );
};

export default OverallRating;
