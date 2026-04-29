import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import Banner from "../../Games/Components/Banner";

import { useReview } from "./hooks/useReview";
import StickyHeader from "./Components/StickyHeader";
import ReviewSkeleton from "./Components/ReviewSkelton";
import ReviewError from "./Components/ReviewError";
import ReviewSnapshot from "./Components/ReviewSnapshot";
import RatingSection from "./Components/RatingSection";
import EngagementSection from "./Components/EngagementSection";
import AnalyticsSection from "./Components/AnalyticsSection";
import CommentsSection from "./Components/CommentSection";
const Review = () => {
  const navigate = useNavigate();
  const {
    reviewId,
    displayedReview,
    visibleComments,
    showStickyHeader,
    isLoading,
    errorMessage,
    loadingLike,
    loadingFetchComments,
    errorFetchComments,
    user,
    handleLike,
    handleShare,
    handleDeleteReview,
    handleAddComment,
    handleDeleteComment,
  } = useReview();

  return (
    <>
      <ToastContainer hideProgressBar theme="dark" />

      {displayedReview && (
        <StickyHeader
          review={displayedReview}
          visible={showStickyHeader}
          onLike={handleLike}
          onShare={handleShare}
        />
      )}

      <main className="min-h-screen bg-[radial-gradient(circle_at_18%_0%,rgba(0,212,255,0.16),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(182,255,59,0.08),transparent_28%),linear-gradient(180deg,#070b16_0%,#0d1424_45%,#070b16_100%)] px-3 pb-12 pt-6 sm:px-5 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <button
            type="button"
            onClick={() => navigate("/reviews")}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[#0d1424]/80 px-4 py-2 text-sm font-bold text-[#c8d3e4] transition hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.1)] hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Reviews
          </button>

          {isLoading && <ReviewSkeleton />}
          {!isLoading && errorMessage && <ReviewError message={errorMessage} />}

          {!isLoading && !errorMessage && displayedReview && (
            <div className="space-y-8">
              <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/82 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur">
                <Banner
                  game={displayedReview.game ?? null}
                  badgeLabel="Featured game"
                  showWriteButton={Boolean(displayedReview.game?.id)}
                  actionLabel="Open game"
                  onAction={() =>
                    displayedReview.game?.id &&
                    navigate(`/games/${displayedReview.game.id}`)
                  }
                />
              </section>

              <section className="space-y-4">
                <ReviewSnapshot
                  review={displayedReview}
                  visibleCommentsCount={visibleComments.length}
                  loadingLike={loadingLike}
                  isOwner={user?.id === displayedReview.user.id}
                  onLike={handleLike}
                  onDelete={handleDeleteReview}
                  onEdit={() =>
                    navigate(`/edit-review/${displayedReview.id}`, {
                      state: { currentReview: displayedReview },
                    })
                  }
                />

                <RatingSection rating={displayedReview.rating} />

                <EngagementSection
                  likeCount={displayedReview.likeCount ?? 0}
                  viewCount={displayedReview.viewCount ?? 0}
                  commentCount={visibleComments.length}
                />

                {user?.id === displayedReview.user.id && <AnalyticsSection />}
              </section>

              <section
                id="review-comments"
                className="scroll-mt-24 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.2)] sm:p-6 md:p-8"
              >
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[rgba(0,212,255,0.12)] pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-lime)">
                      Community feed
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-white">
                      Comments
                    </h2>
                  </div>
                  <p className="text-sm font-semibold text-[#9aa7bd]">
                    Join the discussion
                  </p>
                </div>
                <CommentsSection
                  onEditComment={(commentId, updatedText) =>
                    console.log(commentId, updatedText)
                  }
                  comments={visibleComments}
                  loading={loadingFetchComments}
                  error={errorFetchComments}
                  reviewId={reviewId}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                />
              </section>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Review;
