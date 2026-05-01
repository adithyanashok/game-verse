import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";
import { buildUrl } from "../buildUrl";
import type { ApiResponse } from "../review/types";
import type {
  CreateCommentPayload,
  ReviewComment,
  UpdateCommentPayload,
} from "./types";

export const addComment = async (payload: CreateCommentPayload) => {
  const res = await apiClient.post(buildUrl(API.REVIEWS.ADD_COMMENT), payload);

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to add comment");
  }

  return res.data.data;
};
export const getCommentsByReviewId = async (reviewId: number) => {
  const response = await apiClient.get<ApiResponse<ReviewComment[]>>(
    buildUrl(API.REVIEWS.GET_COMMENTS, { reviewId: reviewId.toString() }),
  );

  if (!response.data.status || !response.data.data) {
    throw new Error(response.data.message ?? "comments not found");
  }

  return { reviewId, comments: response.data.data ?? [] };
};

export const updateComment = async (payload: UpdateCommentPayload) => {
  const res = await apiClient.patch(
    buildUrl(API.REVIEWS.UPDATE_COMMENT),
    payload,
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to update comment");
  }

  return res.data.data;
};

export const deleteComment = async ({
  reviewId,
  commentId,
}: {
  reviewId: number;
  commentId: number;
}) => {
  const res = await apiClient.delete(
    buildUrl(API.REVIEWS.DELETE_COMMENT, {
      reviewId: reviewId.toString(),
      commentId: commentId.toString(),
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to delete comment");
  }

  return { reviewId, commentId };
};
