import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteReview, likeReview } from "../../../../api/review/review";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../../../api/comments/comment";

export const useReviewMutations = (
  reviewId: number,
  navigate: (path: string) => void,
) => {
  const queryClient = useQueryClient();

  // ❤️ Like
  const like = useMutation({
    mutationFn: () => likeReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", reviewId] });
    },
  });

  // 🗑️ Delete Review
  const removeReview = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      navigate("/reviews");
    },
    onError: () => toast("Delete failed"),
  });

  // 💬 Add Comment
  const createComment = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    },
  });

  // ❌ Delete Comment
  const removeComment = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    },
  });
  // 📝 Edit Comment
  const editComment = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    },
  });

  return {
    like,
    removeReview,
    createComment,
    removeComment,
    editComment,
  };
};
