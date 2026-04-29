import { FiStar } from "react-icons/fi";
import ReviewStats from "./ReviewStats";
interface Props {
  overallRating: number | undefined;
}
const OverallRating = ({ overallRating }: Props) => {
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
          <ReviewStats />
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
