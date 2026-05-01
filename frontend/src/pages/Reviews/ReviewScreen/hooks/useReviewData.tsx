import { useQuery } from "@tanstack/react-query";
import { getReviewById } from "../../../../api/review/review";
import { getCommentsByReviewId } from "../../../../api/comments/comment";

export const useReviewData = (reviewId: number) => {
  const reviewQuery = useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => getReviewById(reviewId),
    enabled: !!reviewId,
  });

  const commentsQuery = useQuery({
    queryKey: ["comments", reviewId],
    queryFn: () => getCommentsByReviewId(reviewId),
    enabled: !!reviewId,
  });

  return {
    review: reviewQuery.data,
    comments: commentsQuery.data?.comments ?? [],
    isLoading: reviewQuery.isLoading || commentsQuery.isLoading,
    error: reviewQuery.error || commentsQuery.error,
    reviewQuery,
    commentsQuery,
  };
};
