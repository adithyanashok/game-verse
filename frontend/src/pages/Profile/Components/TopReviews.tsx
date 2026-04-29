import type { AnalyticsOverview } from "../../../features/reviews/types";
import { BiLike } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";

interface TopReviewsProps {
  analytics: AnalyticsOverview;
}

const TopReviews = ({ analytics }: TopReviewsProps) => {
  return (
    <div className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/60 p-4 text-white sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-blue)]">
            Highlights
          </p>
          <h3 className="mt-1 text-xl font-black text-white">Top reviews</h3>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)]">
          <FiFileText className="h-4 w-4 text-[var(--color-blue)]" />
        </span>
      </div>

      <div className="space-y-3">
        {analytics.topReviews.map((review) => (
          <Link key={review.id} to={`/review/${review.id}`}>
            <div className="flex flex-col gap-4 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-4 transition duration-300 hover:border-[rgba(0,212,255,0.28)] hover:bg-[#111a2d] sm:flex-row sm:items-start">
              <img
                src={review.imageUrl}
                alt={review.title}
                className="h-28 w-full rounded-[8px] object-cover sm:h-24 sm:w-28"
              />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-base font-black text-white">{review.title}</h4>
                  <span className="text-xs font-semibold text-[#9aa7bd]">
                    {new Date(review.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <p className="line-clamp-2 text-sm leading-6 text-[#c8d3e4]">
                  {review.text}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(182,255,59,0.14)] bg-[rgba(182,255,59,0.08)] px-2.5 py-1 text-[var(--color-lime)]">
                    <BiLike /> {review.likeCount}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)] px-2.5 py-1 text-[#cbeafe]">
                    <IoEyeOutline /> {review.viewCount}
                  </span>
                  {review.rating && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[#9aa7bd]">
                      Overall {review.rating.overall.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>

              <FiArrowUpRight className="hidden h-4 w-4 flex-shrink-0 text-[var(--color-blue)] sm:block" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopReviews;

