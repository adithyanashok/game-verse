import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import type { RootState } from "../../../../store";
import {
  fetchReviewById,
  likeReview,
  updateReviewView,
  fetchCommentsByReviewId,
  addComment,
  deleteReview,
  deleteComment,
} from "../../../../features/reviews/reviewsSlice";
import type { ReviewComment } from "../../../../features/reviews/types";

export const useReview = () => {
  const { id } = useParams<{ id: string }>();
  const reviewId = useMemo(() => Number(id), [id]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ------------------ STORE ------------------
  const {
    currentReview,
    currentReviewId,
    currentReviewById,
    commentsByReviewId,
    loading,
    errors,
  } = useAppSelector((s: RootState) => s.reviews);

  const { accessToken, user } = useAppSelector((s: RootState) => s.auth);

  // ------------------ LOCAL STATE ------------------
  const [scrollY, setScrollY] = useState(0);
  const [optimisticComments, setOptimisticComments] = useState<ReviewComment[]>(
    [],
  );

  // prevent repeated calls
  const fetchedRef = useRef(false);
  const viewUpdatedRef = useRef(false);

  // ------------------ DERIVED ------------------
  const displayedReview =
    currentReviewId === reviewId
      ? currentReview
      : (currentReviewById[reviewId] ?? null);

  const comments = useMemo(
    () => commentsByReviewId[reviewId] ?? [],
    [commentsByReviewId, reviewId],
  );

  const visibleComments = useMemo(
    () => [...optimisticComments, ...comments],
    [optimisticComments, comments],
  );

  // ------------------ FETCH DATA (SAFE) ------------------
  useEffect(() => {
    if (!reviewId || Number.isNaN(reviewId)) return;

    if (!fetchedRef.current) {
      fetchedRef.current = true;

      dispatch(fetchReviewById(reviewId));
      dispatch(fetchCommentsByReviewId(reviewId));
    }
  }, [reviewId, dispatch]);

  // ------------------ UPDATE VIEW (ONLY ONCE) ------------------
  useEffect(() => {
    if (!reviewId || !accessToken) return;

    if (!viewUpdatedRef.current) {
      viewUpdatedRef.current = true;
      dispatch(updateReviewView(reviewId));
    }
  }, [reviewId, accessToken, dispatch]);

  // reset flags when review changes
  useEffect(() => {
    fetchedRef.current = false;
    viewUpdatedRef.current = false;
    setOptimisticComments([]);
  }, [reviewId]);

  // ------------------ SCROLL (OPTIMIZED) ------------------
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ------------------ ACTIONS ------------------

  const handleLike = useCallback(() => {
    if (!reviewId) return;

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
      toast(result.payload ?? "Delete failed", {
        type: "error",
        autoClose: 1200,
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

      const optimisticId = -Date.now();

      const optimisticComment: ReviewComment = {
        id: optimisticId,
        userId: user?.id ?? 0,
        username: user?.name ?? "You",
        comment: trimmed,
        parentCommentId: parentCommentId ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isYourComment: true,
      };

      setOptimisticComments((prev) => [optimisticComment, ...prev]);

      dispatch(addComment({ reviewId, comment: trimmed, parentCommentId }))
        .unwrap()
        .then(() => {
          setOptimisticComments((prev) =>
            prev.filter((c) => c.id !== optimisticId),
          );
        })
        .catch((err) => {
          setOptimisticComments((prev) =>
            prev.filter((c) => c.id !== optimisticId),
          );

          toast(err ?? "Failed to add comment", {
            type: "error",
            autoClose: 1200,
            theme: "dark",
          });
        });
    },
    [accessToken, dispatch, navigate, reviewId, user],
  );

  const handleDeleteComment = useCallback(
    (commentId: number) => {
      dispatch(deleteComment({ reviewId, commentId }));
    },
    [dispatch, reviewId],
  );

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    try {
      if (navigator.share && displayedReview) {
        await navigator.share({
          title: displayedReview.title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast("Link copied", { autoClose: 1000, theme: "dark" });
      }
    } catch {}
  }, [displayedReview]);

  // ------------------ RETURN ------------------
  return {
    reviewId,
    displayedReview,
    visibleComments,
    scrollY,
    showStickyHeader: scrollY > 420 && Boolean(displayedReview),

    isLoading: loading.fetchOne,
    errorMessage: errors.fetchOne,

    loadingLike: loading.like,
    loadingFetchComments: loading.fetchComments,
    errorFetchComments: errors.fetchComments,

    user,

    handleLike,
    handleShare,
    handleDeleteReview,
    handleAddComment,
    handleDeleteComment,

    navigate,
  };
};
