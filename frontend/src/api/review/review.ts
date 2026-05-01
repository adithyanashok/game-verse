import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";
import { buildUrl } from "../buildUrl";
import type {
  ApiResponse,
  CreateReviewPayload,
  GetReviewsByIdPayload,
  PaginatedReviewsResponse,
  ReviewAnalyticsPayload,
  ReviewDetails,
  SearchReviewsPayload,
  UpdateReviewPayload,
} from "./types";

export const createReview = async (payload: CreateReviewPayload) => {
  const res = await apiClient.post(
    buildUrl(API.REVIEWS.CREATE_REVIEW),
    payload,
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to create review");
  }

  return res.data.data;
};
export const getReviewById = async (id: number) => {
  const response = await apiClient.get<ApiResponse<ReviewDetails>>(
    buildUrl(API.REVIEWS.GET_REVIEW, { id: id.toString() }),
  );

  if (!response.data.status || !response.data.data) {
    throw new Error(response.data.message ?? "Review not found");
  }

  return response.data.data;
};

export const likeReview = async (reviewId: number) => {
  const res = await apiClient.post(
    buildUrl(API.REVIEWS.LIKE_REVIEW, { reviewId: reviewId.toString() }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to like review");
  }

  return res.data.data;
};

export const updateReviewView = async (reviewId: number) => {
  const res = await apiClient.post(
    buildUrl(API.REVIEWS.UPDATE_REVIEW_VIEW, {
      reviewId: reviewId.toString(),
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to update views");
  }

  return res.data.data;
};

export const fetchTrendingReviews = async () => {
  const res = await apiClient.get(buildUrl(API.REVIEWS.TRENDING_REVIEW));

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to load trending reviews");
  }

  return res.data.data;
};

export const fetchRecentReviews = async () => {
  const res = await apiClient.get(buildUrl(API.REVIEWS.RECENT_REVIEW));

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to load recent reviews");
  }

  return res.data.data || [];
};

export const searchReviews = async ({
  query,
  page = 1,
  limit = 20,
}: SearchReviewsPayload) => {
  const res = await apiClient.get(
    buildUrl(API.REVIEWS.SEARCH_REVIEW, {
      query,
      page: page.toString(),
      limit: limit.toString(),
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Search failed");
  }

  return res.data.data;
};

export const fetchFollowingReviews = async ({
  page = 1,
  limit = 20,
}: SearchReviewsPayload) => {
  const res = await apiClient.get(
    buildUrl(API.REVIEWS.GET_FOLLOWING_REVIEWS, {
      page: page.toString(),
      limit: limit.toString(),
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to fetch following reviews");
  }

  return res.data.data;
};

export const getReviewsByGameId = async ({
  id,
  page = 1,
  limit = 20,
}: GetReviewsByIdPayload): Promise<PaginatedReviewsResponse> => {
  const res = await apiClient.get(
    buildUrl(API.REVIEWS.GET_BY_GAMEID, {
      id: id.toString(),
      page: page.toString(),
      limit: limit.toString(),
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Fetch failed");
  }

  console.log(res.data);

  return res.data.data;
};

export const getReviewsByUserId = async ({
  id,
  page = 1,
  limit = 20,
}: GetReviewsByIdPayload) => {
  const res = await apiClient.get(
    buildUrl(API.REVIEWS.GET_BY_USERID, {
      id: id.toString(),
      page: page.toString(),
      limit: limit.toString(),
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Fetch failed");
  }

  return res.data.data;
};

export const updateReview = async (payload: UpdateReviewPayload) => {
  const res = await apiClient.patch(
    buildUrl(API.REVIEWS.UPDATE_REVIEW),
    payload,
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Update failed");
  }

  return res.data.data;
};

export const deleteReview = async (reviewId: number) => {
  const res = await apiClient.delete(
    buildUrl(API.REVIEWS.DELETE_REVIEW, {
      reviewId: reviewId.toString(),
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Delete failed");
  }

  return reviewId;
};

export const getAnalytics = async ({
  reviewId,
  range,
}: ReviewAnalyticsPayload) => {
  const res = await apiClient.get(
    buildUrl(API.REVIEWS.GET_REVIEW_ANALYTICS, {
      reviewId: reviewId.toString(),
      range,
    }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to load analytics");
  }

  return res.data.data;
};

export const getAnalyticsOverview = async ({
  range,
}: ReviewAnalyticsPayload) => {
  const res = await apiClient.get(
    buildUrl(API.REVIEWS.GET_ANALYTICS_OVERVIEW, { range }),
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to load analytics");
  }

  return res.data.data;
};
