import type { ReviewSummary } from "../../../features/reviews/types";
import { Rating } from "@mui/material";

const LatestReviewCard = ({ review }: { review: ReviewSummary }) => {
  return (
    <div
      key={review.createdAt}
      className="bg-dark w-full rounded-xl border border-[#989fab1e] hover:border-blue transition shadow-lg"
    >
      <img
        src={`${review.imageUrl}`}
        alt="game"
        className="w-full object-cover rounded-t-xl"
      />
      <div className="p-3">
        <h3 className="md:text-lg text-xs font-medium md:font-semibold line-clamp-2 overflow-hidden text-white">
          {review.title}
        </h3>
        <p className="text-grey text-xs mt-1">By {review.user?.name}</p>

        {review.rating !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            <Rating
              sx={{
                "& .MuiRating-iconEmpty": { color: "#989fab" },
              }}
              style={{ color: "#6711bf", fontSize: "12px" }}
              name="read-only"
              value={Number(review.rating?.overall.toFixed(1))}
              precision={0.1}
              readOnly
              size="small"
            />

            <span className="text-white text-xs md:text-sm font-medium">
              {review.rating?.overall.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestReviewCard;
