import { useTopReviewers } from "../../../hooks/useUser";
import { Link } from "react-router-dom";
import ReviewerCard from "./ReviewerCard";
import HomeSectionState from "./HomeSectionState";

const TopReviewers = () => {
  const { data: reviewers = [], isLoading: loading, error } = useTopReviewers();

  if (loading && reviewers.length === 0) {
    return (
      <div className="scroll-row px-4 sm:px-6 lg:px-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="w-16 flex-shrink-0">
            <div className="h-14 w-14 animate-pulse rounded-full border border-[rgba(0,212,255,0.14)] bg-[#0d1424] sm:h-16 sm:w-16" />
            <div className="mt-3 h-3 w-14 animate-pulse rounded-full bg-[#0d1424]" />
          </div>
        ))}
      </div>
    );
  }

  if (error && reviewers.length === 0) {
    return (
      <HomeSectionState
        title="Top reviewers are unavailable"
        message={error instanceof Error ? error.message : "We couldn't load reviewer rankings right now."}
      />
    );
  }

  if (reviewers.length === 0) {
    return (
      <div className="mx-4 rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424]/80 px-4 py-6 text-center text-sm text-[#9aa7bd] sm:mx-6 lg:mx-8">
        No top reviewers found.
      </div>
    );
  }

  return (
    <div className="scroll-row px-4 sm:px-6 lg:px-8">
      {reviewers.map((reviewer) => {
        const reviewerName = reviewer.name?.trim() || "GameVera Player";

        return (
          <Link to={`/profile/${reviewer.id}`} key={reviewer.id}>
            <ReviewerCard
              name={reviewerName}
              image={reviewer.profileImage || ""}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default TopReviewers;
