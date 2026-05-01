import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { useAppSelector } from "../../../store/hooks";

import Banner from "../../Games/Components/Banner";
import StickyHeader from "./Components/StickyHeader";
import ReviewSkeleton from "./Components/ReviewSkelton";
import ReviewError from "./Components/ReviewError";
import ReviewSnapshot from "./Components/ReviewSnapshot";
import RatingSection from "./Components/RatingSection";
import EngagementSection from "./Components/EngagementSection";
import AnalyticsSection from "./Components/AnalyticsSection";
import CommentsSection from "./Components/CommentSection";

import { useReviewMutations } from "./hooks/useReviewMutations";
import { useReviewData } from "./hooks/useReviewData";

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const reviewId = id ? Number(id) : null;

  const { review, comments, isLoading, error } = useReviewData(reviewId ?? 0);
  const currentUser = useAppSelector((state) => state.auth.user);
  const isOwner =
    review && currentUser ? review.user.id === currentUser.id : false;

  const { like, removeReview, createComment, removeComment, editComment } =
    useReviewMutations(reviewId ?? 0, navigate);

  if (!reviewId) return null;

  if (isLoading) return <ReviewSkeleton />;

  if (error) {
    return <ReviewError message={(error as Error).message} />;
  }

  if (!review) return null;

  return (
    <>
      <ToastContainer hideProgressBar theme="dark" />

      <StickyHeader
        review={review}
        visible
        onLike={() => like.mutate()}
        onShare={() => navigator.clipboard.writeText(window.location.href)}
      />

      <main className="min-h-screen px-3 pb-12 pt-6 sm:px-5 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <button
            type="button"
            onClick={() => navigate("/reviews")}
            className="inline-flex items-center gap-2"
          >
            <FiArrowLeft className="h-4 w-4" />
            Reviews
          </button>

          <div className="space-y-8">
            {/* Banner */}
            <section>
              <Banner
                game={review?.game ?? null} // ✅ defensive
                badgeLabel="Featured game"
                showWriteButton={Boolean(review?.game?.id)}
                actionLabel="Open game"
                onAction={() =>
                  review?.game?.id && navigate(`/games/${review.game.id}`)
                }
              />
            </section>

            {/* Review */}
            <section className="space-y-4">
              <ReviewSnapshot
                isOwner={isOwner}
                review={review}
                visibleCommentsCount={comments.length}
                loadingLike={like.isPending}
                onLike={() => like.mutate()}
                onDelete={() => removeReview.mutate()}
                onEdit={() =>
                  navigate(`/edit-review/${review.id}`, {
                    state: { currentReview: review },
                  })
                }
              />

              <RatingSection rating={review.rating} />

              <EngagementSection
                likeCount={review.likeCount ?? 0}
                viewCount={review.viewCount ?? 0}
                commentCount={comments.length}
              />

              <AnalyticsSection />
            </section>

            {/* Comments */}
            <section id="review-comments">
              <CommentsSection
                comments={comments} // ✅ correct shape
                loading={false}
                error={undefined}
                reviewId={reviewId}
                onAddComment={(text, parentId) =>
                  createComment.mutate({
                    reviewId,
                    comment: text,
                    parentCommentId: parentId,
                  })
                }
                onDeleteComment={(id) =>
                  removeComment.mutate({ reviewId, commentId: id })
                }
                onEditComment={(id, text) =>
                  editComment.mutate({ id, comment: text })
                }
              />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Review;
