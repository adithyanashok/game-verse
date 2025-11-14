import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { HiThumbUp } from "react-icons/hi";
import { BiBookmark } from "react-icons/bi";

import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";
import RatingBreakdown from "./Components/RatingBreakdown";
import {
  fetchReviewById,
  likeReview,
  resetCurrentReview,
  updateReviewView,
  fetchCommentsByReviewId,
  addComment,
} from "../../features/reviews/reviewsSlice";
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Review = () => {
  const { id } = useParams<{ id: string }>();
  const reviewId = useMemo(() => Number(id), [id]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentReview, loading, errors, likedReviews, commentsByReviewId } =
    useAppSelector((state: RootState) => state.reviews);
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!reviewId || Number.isNaN(reviewId)) {
      return;
    }
    dispatch(fetchReviewById(reviewId));
    dispatch(fetchCommentsByReviewId(reviewId));
    if (accessToken) {
      dispatch(updateReviewView(reviewId));
    }
    return () => {
      dispatch(resetCurrentReview());
    };
  }, [accessToken, dispatch, reviewId]);

  const handleLike = () => {
    if (!reviewId || Number.isNaN(reviewId)) {
      return;
    }

    if (!accessToken) {
      navigate("/login");
      return;
    }

    dispatch(likeReview(reviewId));
  };

  const [commentText, setCommentText] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [openReplyBox, setOpenReplyBox] = useState<Record<number, boolean>>({});
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) {
      return;
    }
    if (!accessToken) {
      navigate("/login");
      return;
    }
    dispatch(addComment({ reviewId, comment: trimmed }));
    setCommentText("");
  };

  const liked = likedReviews[reviewId] ?? false;
  const isLoading = loading.fetchOne;
  const errorMessage = errors.fetchOne;

  const toggleReplyBox = (commentId: number) => {
    setOpenReplyBox((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const toggleShowReplies = (commentId: number) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyChange = (commentId: number, value: string) => {
    setReplyDrafts((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleReplySubmit = (commentId: number) => {
    const trimmed = (replyDrafts[commentId] ?? "").trim();
    if (!trimmed) return;
    if (!accessToken) {
      navigate("/login");
      return;
    }
    dispatch(
      addComment({ reviewId, comment: trimmed, parentCommentId: commentId })
    );
    setReplyDrafts((prev) => ({ ...prev, [commentId]: "" }));
    setOpenReplyBox((prev) => ({ ...prev, [commentId]: false }));
  };

  return (
    <>
      <ResponsiveNavbar />
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
              <h1 className="text-white font-bold text-2xl mb-4">
                {currentReview.title}
              </h1>
              <Link to={`/profile/${currentReview.userId}`}>
                <h1 className="text-white font-bold text-[12px] mb-4">
                  {currentReview.userName}
                </h1>
              </Link>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{`Review ID: #${currentReview.id}`}</span>
                <span>•</span>
                <span>
                  {new Date(currentReview.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-[13px] md:text-[16px] leading-7 text-white mt-5 whitespace-pre-line">
                {currentReview.text}
              </p>

              <section className="mt-6">
                <h2 className="text-white font-bold text-[16px]">
                  Rating Breakdown
                </h2>
                <RatingBreakdown rating={currentReview.rating} />
              </section>

              <hr className="mt-6 border-[#989fab1e]" />
              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  type="button"
                  onClick={handleLike}
                  disabled={loading.like}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                    liked
                      ? "bg-[var(--color-purple)] text-white border-transparent"
                      : "border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[var(--color-purple)] hover:text-white"
                  } ${loading.like ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <HiThumbUp />
                  <span>{liked ? "Liked" : "Like"}</span>
                  <span className="text-xs">
                    {currentReview.likeCount ?? 0}
                  </span>
                </button>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#989fab1e] text-gray-300">
                  <BiBookmark className="text-[var(--color-purple)]" />
                  Views {currentReview.viewCount ?? 0}
                </span>
              </div>
            </div>

            <section className="px-5 md:px-10">
              <h2 className="text-white text-2xl font-bold mb-4">Comments</h2>
              <form onSubmit={handleCommentSubmit} className="mb-6 space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full rounded-xl bg-[#1f1a2e] border border-[#989fab1e] text-white p-3 outline-none focus:border-[var(--color-purple)]"
                  rows={3}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      commentText.trim()
                        ? "bg-[var(--color-purple)] text-white border-transparent hover:opacity-90"
                        : "border-[#989fab1e] text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Post Comment
                  </button>
                </div>
              </form>
              <div className="space-y-4">
                {loading.fetchComments && (
                  <p className="text-gray-400 text-sm">Loading comments...</p>
                )}
                {!loading.fetchComments && errors.fetchComments && (
                  <p className="text-red-400 text-sm">{errors.fetchComments}</p>
                )}
                {!(commentsByReviewId[reviewId]?.length > 0) &&
                  !loading.fetchComments &&
                  !errors.fetchComments && (
                    <p className="text-gray-400 text-sm">No comments yet.</p>
                  )}
                {(commentsByReviewId[reviewId] ?? [])
                  .filter((c) => !c.parentCommentId)
                  .map((c) => (
                    <div key={c.id} className="flex gap-4 px-0 items-start">
                      <div className="shadow-lg p-4 rounded-[12px] border border-[#989fab1e] w-full">
                        <div className="flex justify-between">
                          <p className="text-white font-semibold text-[12px] md:text-[15px] ">
                            User #{c.userId}
                          </p>
                          <p className="text-[#989fab] text-[11px] md:text-[13px]">
                            {new Date(c.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-[#989fab] text-[12px] md:text-[14px] mt-2 whitespace-pre-line">
                          {c.comment}
                        </p>

                        {openReplyBox[c.id] && (
                          <div className="mt-3 space-y-2">
                            <textarea
                              value={replyDrafts[c.id] ?? ""}
                              onChange={(e) =>
                                handleReplyChange(c.id, e.target.value)
                              }
                              placeholder="Write a reply..."
                              className="w-full rounded-xl bg-[#1f1a2e] border border-[#989fab1e] text-white p-3 outline-none focus:border-[var(--color-purple)]"
                              rows={2}
                            />
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => handleReplySubmit(c.id)}
                                disabled={!(replyDrafts[c.id] ?? "").trim()}
                                className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                                  (replyDrafts[c.id] ?? "").trim()
                                    ? "bg-[var(--color-purple)] text-white border-transparent hover:opacity-90"
                                    : "border-[#989fab1e] text-gray-400 cursor-not-allowed"
                                }`}
                              >
                                Post Reply
                              </button>
                            </div>
                          </div>
                        )}

                        {(commentsByReviewId[reviewId] ?? []).some(
                          (r) => r.parentCommentId === c.id
                        ) && (
                          <button
                            type="button"
                            onClick={() => toggleShowReplies(c.id)}
                            className="mt-3 text-[var(--color-purple)] text-xs hover:underline"
                          >
                            {showReplies[c.id]
                              ? "Hide replies"
                              : "View replies"}
                          </button>
                        )}

                        {showReplies[c.id] && (
                          <div className="mt-4 pl-4 border-l border-[#989fab1e] space-y-3">
                            {(commentsByReviewId[reviewId] ?? [])
                              .filter((r) => r.parentCommentId === c.id)
                              .map((r) => (
                                <div key={r.id} className="text-sm">
                                  <div className="flex justify-between">
                                    <p className="text-white font-medium">
                                      User #{r.userId}
                                    </p>
                                    <p className="text-[#989fab] text-[11px] md:text-[12px]">
                                      {new Date(r.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                  <p className="text-[#989fab] mt-1 whitespace-pre-line">
                                    {r.comment}
                                  </p>
                                </div>
                              ))}
                          </div>
                        )}
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleReplyBox(c.id)}
                            className="text-[var(--color-purple)] text-xs hover:underline"
                          >
                            {openReplyBox[c.id] ? "Cancel" : "Reply"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
