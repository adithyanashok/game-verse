import { Link } from "react-router-dom";
import { FiEye, FiMessageCircle, FiThumbsUp } from "react-icons/fi";
import ReviewHeader from "./ReviewHeader";
import ReviewActions from "./ReviewActions";
import type { ReviewDetails } from "../../../../features/reviews/types";
import MetricHighlight from "./MetricHighlight";

interface Props {
  review: ReviewDetails;
  visibleCommentsCount: number;
  loadingLike: boolean;
  isOwner: boolean;
  onLike: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const ReviewSnapshot = ({
  review,
  visibleCommentsCount,
  loadingLike,
  isOwner,
  onLike,
  onDelete,
  onEdit,
}: Props) => {
  const stats = [
    {
      label: "Likes",
      value: review.likeCount ?? 0,
      icon: <FiThumbsUp className="h-4 w-4 text-(--color-lime)" />,
      accent:
        "border-[rgba(182,255,59,0.16)] bg-[linear-gradient(180deg,rgba(182,255,59,0.14),rgba(182,255,59,0.04))]",
    },
    {
      label: "Views",
      value: review.viewCount ?? 0,
      icon: <FiEye className="h-4 w-4 text-(--color-blue)" />,
      accent:
        "border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))]",
    },
    {
      label: "Comments",
      value: visibleCommentsCount,
      icon: <FiMessageCircle className="h-4 w-4 text-[#f8b84e]" />,
      accent:
        "border-[rgba(248,184,78,0.16)] bg-[linear-gradient(180deg,rgba(248,184,78,0.14),rgba(248,184,78,0.04))]",
    },
  ];

  return (
    <div
      id="review-overview"
      className="scroll-mt-24 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 shadow-xl shadow-black/20 sm:p-6"
    >
      <div className="mb-5 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
          Review snapshot
        </p>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
          Quick view
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9aa7bd]">
          A compact read on the review itself, the author, and how readers are
          responding.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 p-2">
        {stats.map((stat) => (
          <MetricHighlight key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 rounded-[10px] border border-[rgba(0,212,255,0.12)] sm:bg-[#070b16]/60 p-4 sm:p-5">
        <ReviewHeader review={review} LinkComponent={Link} />
        <div className="mt-6 border-t border-[rgba(0,212,255,0.12)] pt-4">
          <ReviewActions
            liked={review.isLiked}
            likeCount={review.likeCount ?? 0}
            views={review.viewCount ?? 0}
            loadingLike={loadingLike}
            isOwner={isOwner}
            onLike={onLike}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewSnapshot;
