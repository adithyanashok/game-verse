import type { AnalyticsOverview } from "../../../features/reviews/types";
import { BiLike } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router";
interface TopReviewsProps {
  analytics: AnalyticsOverview;
}
const TopReviews = ({ analytics }: TopReviewsProps) => {
  return (
    <div className="p-6 rounded-xl border border-[#6711bf] text-white">
      <h3 className="text-lg font-semibold mb-4">Top Reviews</h3>

      <div className="space-y-4">
        {analytics?.topReviews.map((review) => (
          <Link to={`/review/${review.id}`}>
            <div
              key={review.id}
              className="flex gap-4 p-4 rounded-lg border border-[#6711bf]
              hover:bg-[#6711bf]/40 cursor-pointer transition-all duration-300"
            >
              <img
                src={review.imageUrl}
                alt="game"
                className="w-20 h-20 rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              />

              <div className="flex-1">
                <h4 className="text-md font-bold">{review.title}</h4>
                <p className="text-sm opacity-80">{review.text}</p>

                <div className="flex gap-4 text-sm mt-2 opacity-70">
                  <span className="flex items-center gap-1">
                    <BiLike /> {review.likeCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoEyeOutline /> {review.viewCount}
                  </span>
                </div>

                {review.rating && (
                  <div className="mt-2 text-xs opacity-70">
                    <p>Overall: {review.rating.overall}/10</p>
                    <p>
                      Graphics {review.rating.graphics} | Gameplay{" "}
                      {review.rating.gameplay} | Story {review.rating.story}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs opacity-60">
                {new Date(review.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopReviews;
