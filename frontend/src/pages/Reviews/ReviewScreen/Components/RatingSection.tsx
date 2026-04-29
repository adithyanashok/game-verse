import type { RatingBreakdown as Rating } from "../../../../features/reviews/types";
import RatingBreakdown from "../../Components/RatingBreakdown";

interface Props {
  rating?: Rating;
}

const RatingSection = ({ rating }: Props) => (
  <section
    id="rating-breakdown"
    className="scroll-mt-24 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20"
  >
    <div className="mb-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
        Ratings
      </p>
      <h3 className="mt-1 text-xl font-black text-white">Score breakdown</h3>
    </div>
    <RatingBreakdown rating={rating} />
  </section>
);

export default RatingSection;
