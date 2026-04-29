import { FiShare2, FiThumbsUp } from "react-icons/fi";
import type { ReviewDetails } from "../../../../features/reviews/types";

interface Props {
  review: ReviewDetails;
  visible: boolean;
  onLike: () => void;
  onShare: () => void;
}

const StickyHeader = ({ review, visible, onLike, onShare }: Props) => (
  <div
    className={`fixed inset-x-0 top-0 z-60 border-b border-[rgba(0,212,255,0.14)] bg-[#070b16]/92 px-3 py-3 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-150 ${
      visible
        ? "translate-y-0 opacity-100"
        : "pointer-events-none -translate-y-full opacity-0"
    }`}
  >
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
          Now reading
        </p>
        <h2 className="truncate text-sm font-black text-white sm:text-base">
          {review.title}
        </h2>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {review.rating && (
          <span className="hidden rounded-full bg-(--color-lime) px-3 py-1 text-xs font-black text-[#07101a] sm:inline-flex">
            {review.rating.overall.toFixed(1)}
          </span>
        )}
        <button
          type="button"
          onClick={onLike}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-blue) ${
            review.isLiked
              ? "border-transparent bg-(--color-lime) text-[#07101a]"
              : "border-[rgba(0,212,255,0.22)] text-(--color-blue) hover:bg-[rgba(0,212,255,0.1)]"
          }`}
          aria-label="Like review"
        >
          <FiThumbsUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,212,255,0.22)] text-(--color-blue) transition duration-150 hover:bg-[rgba(0,212,255,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-blue)"
          aria-label="Share review"
        >
          <FiShare2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export default StickyHeader;
