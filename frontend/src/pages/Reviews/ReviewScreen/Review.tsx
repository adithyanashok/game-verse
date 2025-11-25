import { useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import ResponsiveNavbar from "../../../components/common/Navbar/ResponsiveNavbar";
import RatingBreakdown from "../Components/RatingBreakdown";
import CommentsSection from "./Components/CommentSection";
import {
  fetchReviewById,
  likeReview,
  resetCurrentReview,
  updateReviewView,
  fetchCommentsByReviewId,
  addComment,
  deleteReview,
  deleteComment,
} from "../../../features/reviews/reviewsSlice";
import type { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ReviewHeader from "./Components/ReviewHeader";
import ReviewActions from "./Components/ReviewActions";
import ViewCountChart from "../Components/Chart";

const Review = () => {
  const { id } = useParams<{ id: string }>();
  const reviewId = useMemo(() => Number(id), [id]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentReview, loading, errors, commentsByReviewId } = useAppSelector(
    (state: RootState) => state.reviews
  );

  const { accessToken, user } = useAppSelector(
    (state: RootState) => state.auth
  );

  // Fetch review + comments
  useEffect(() => {
    if (!reviewId || Number.isNaN(reviewId)) return;

    dispatch(fetchReviewById(reviewId));
    dispatch(fetchCommentsByReviewId(reviewId));

    if (accessToken) {
      dispatch(updateReviewView(reviewId));
    }

    return () => {
      dispatch(resetCurrentReview());
    };
  }, [accessToken, dispatch, reviewId]);

  const isLoading = loading.fetchOne;
  const errorMessage = errors.fetchOne;
  const comments = useMemo(
    () => commentsByReviewId[reviewId] ?? [],
    [commentsByReviewId, reviewId]
  );

  // Handlers
  const handleLike = useCallback(() => {
    if (!reviewId || Number.isNaN(reviewId)) return;

    if (!accessToken) {
      navigate("/login");
      return;
    }

    dispatch(likeReview(reviewId));
  }, [accessToken, dispatch, navigate, reviewId]);

  const handleDeleteReview = useCallback(async () => {
    const result = await dispatch(deleteReview(reviewId));

    if (deleteReview.fulfilled.match(result)) {
      navigate("/reviews");
    } else {
      const error = result.payload;
      toast(error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        style: { border: "1px solid #290d44" },
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "dark",
      });
    }
  }, [dispatch, navigate, reviewId]);

  const handleAddComment = useCallback(
    (content: string, parentCommentId?: number) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      if (!accessToken) {
        navigate("/login");
        return;
      }

      dispatch(addComment({ reviewId, comment: trimmed, parentCommentId }));
    },
    [accessToken, dispatch, navigate, reviewId]
  );

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      await dispatch(deleteComment({ reviewId, commentId }));
      // you can add toast/error handling here if needed
    },
    [dispatch, reviewId]
  );

  return (
    <>
      <ResponsiveNavbar />
      <ToastContainer hideProgressBar />

      <div className="xl:px-40 px-4 py-10 space-y-8">
        {isLoading && (
          <p className="text-gray-400 text-sm">Loading review details...</p>
        )}

        {!isLoading && errorMessage && (
          <p className="text-red-400 text-sm">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && currentReview && (
          <div className="space-y-8">
            <div className="shadow-lg px-5 md:p-10 rounded-2xl bg-dark border border-[#989fab1e]">
              {/* Header */}
              <ReviewHeader review={currentReview} LinkComponent={Link} />

              {/* Rating */}
              <section className="mt-6">
                <h2 className="text-white font-bold text-[16px]">
                  Rating Breakdown
                </h2>
                <RatingBreakdown rating={currentReview.rating} />
              </section>

              <hr className="mt-6 border-[#989fab1e]" />

              {/* Actions */}
              <ReviewActions
                liked={currentReview.isLiked}
                likeCount={currentReview.likeCount ?? 0}
                views={currentReview.viewCount ?? 0}
                loadingLike={loading.like}
                isOwner={user?.id === currentReview.userId}
                onLike={handleLike}
                onDelete={handleDeleteReview}
                onEdit={() =>
                  navigate(`/edit-review/${currentReview.id}`, {
                    state: { currentReview },
                  })
                }
              />
              {user?.id === currentReview.userId && <ViewCountChart />}
            </div>

            {/* Comments */}
            <section className="px-5 md:px-10">
              <CommentsSection
                onEditComment={(commentId, updatedText) => {
                  console.log(commentId, updatedText);
                }}
                comments={comments}
                loading={loading.fetchComments}
                error={errors.fetchComments}
                reviewId={reviewId}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
              />
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
