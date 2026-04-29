import { FiChevronRight, FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import GameReview from "./Review";
import type { ReviewSummary } from "../../../features/reviews/types";
interface Props {
  displayedReviews: ReviewSummary[];
}
const CommunityReviews = ({ displayedReviews }: Props) => {
  return (
    <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 shadow-[0_22px_60px_rgba(0,0,0,0.2)] sm:p-6">
      {displayedReviews.length === 0 ? (
        <div className="flex min-h-65 flex-col items-center justify-center rounded-[10px] border border-dashed border-white/10 bg-[#070b16]/60 px-6  py-4 text-center">
          <FiFileText className="h-8 w-8 text-[#9aa7bd]" />
          <h2 className="mt-4 text-2xl font-black text-white">
            No reviews yet
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[#9aa7bd]">
            This game page is ready for the first detailed take. A strong
            opening review sets the tone for everyone who lands here next.
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-5  p-4 flex flex-wrap items-end justify-between gap-3 border-b border-[rgba(0,212,255,0.12)] pb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-lime)">
                Community feed
              </p>
              <h2 className="mt-1 text-2xl font-black text-white">
                Latest reviews
              </h2>
            </div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#9aa7bd]">
              Open a review
              <FiChevronRight className="h-4 w-4 text-(--color-blue)" />
            </p>
          </div>

          <div className="space-y-1  p-1">
            {displayedReviews.map((review) => (
              <Link key={review.id} to={`/review/${review.id}`}>
                <GameReview review={review} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityReviews;
