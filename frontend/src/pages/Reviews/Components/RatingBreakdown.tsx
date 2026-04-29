import { useEffect, useState } from "react";
import type { RatingBreakdown as Rating } from "../../../features/reviews/types";

interface RatingBreakdownProps {
  rating?: Rating;
}

const metrics: Array<keyof Rating> = ["graphics", "gameplay", "story", "sound"];

const getScoreColor = (value: number) => {
  if (value < 2) return "#ef4444";
  if (value < 3.5) return "#facc15";
  return "var(--color-lime)";
};

const RatingBreakdown = ({ rating }: RatingBreakdownProps) => {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimateBars(true));
    return () => cancelAnimationFrame(frame);
  }, [rating]);

  if (!rating) {
    return (
      <p className="text-gray-400 text-sm">
        Rating details will appear here once available.
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col justify-between gap-4 rounded-[10px] text-white">
      {metrics.map((metric, index) => {
        const value = rating[metric];
        const percent = Math.min(100, Math.max(0, value * 20));
        const scoreColor = getScoreColor(value);

        return (
          <div
            key={metric}
            className="rounded-[8px] border border-[rgba(0,212,255,0.1)] bg-[#0d1424]/70 p-3 transition duration-150 hover:border-[rgba(0,212,255,0.26)]"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs font-bold capitalize tracking-wide text-[#d8e1ef] sm:text-sm">
                {metric}
              </p>
              <p className="whitespace-nowrap text-xs font-black sm:text-sm">
                {value.toFixed(1)}/5
              </p>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-[#070b16]">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width: animateBars ? `${percent}%` : "0%",
                  background: `linear-gradient(90deg, #ef4444 0%, #facc15 52%, ${scoreColor} 100%)`,
                  transitionDelay: `${index * 140}ms`,
                }}
              />
            </div>
          </div>
        );
      })}

      <div className="mt-1 flex flex-col gap-1 rounded-[8px] border border-[rgba(182,255,59,0.18)] bg-[rgba(182,255,59,0.08)] p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9aa7bd] sm:text-sm">
          Overall
        </p>
        <span className="text-base font-black text-[var(--color-lime)] sm:text-lg">
          {rating.overall.toFixed(1)} / 5
        </span>
      </div>
    </div>
  );
};

export default RatingBreakdown;
