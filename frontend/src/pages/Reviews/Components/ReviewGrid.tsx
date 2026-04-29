import Pagination from "../../../components/common/Pagination";
import type { ReviewSummary } from "../../../features/reviews/types";
import ReviewCard from "./ReviewCard";
interface Meta {
  page: number;
  lastPage: number;
}

interface Props {
  reviews: ReviewSummary[];
  loading: boolean;
  error: string | null;
  meta: Meta | null;
  emptyMessage: string;
  onPageChange: (page: number) => void;
}

const ReviewGrid = ({
  reviews,
  loading,
  error,
  meta,
  emptyMessage,
  onPageChange,
}: Props) => {
  if (loading)
    return <p className="text-gray-400 text-sm">Loading reviews...</p>;
  if (error) return <p className="text-red-400 text-sm">{error}</p>;
  if (reviews.length === 0)
    return <p className="text-gray-400 text-sm">{emptyMessage}</p>;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 gap-3 px-1">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {meta && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.lastPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default ReviewGrid;
