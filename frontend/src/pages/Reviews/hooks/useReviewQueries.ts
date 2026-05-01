import { useQuery } from "@tanstack/react-query";
import {
  fetchRecentReviews,
  fetchTrendingReviews,
  searchReviews,
  fetchFollowingReviews,
  getReviewsByUserId,
  getAnalyticsOverview,
  getAnalytics,
} from "../../../api/review/review";
import type { ReviewAnalyticsPayload } from "../../../api/review/types";

export const useRecentReviews = () => {
  return useQuery({
    queryKey: ["reviews", "recent"],
    queryFn: fetchRecentReviews,
  });
};

export const useTrendingReviews = () => {
  return useQuery({
    queryKey: ["reviews", "trending"],
    queryFn: fetchTrendingReviews,
  });
};

export const useSearchReviews = (query: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["reviews", "search", query, page, limit],
    queryFn: () => searchReviews({ query, page, limit }),
  });
};

export const useFollowingReviews = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["reviews", "following", page, limit],
    queryFn: () => fetchFollowingReviews({ page, limit }),
  });
};

export const useUserReviews = (userId: number, page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ["reviews", "user", userId, page, limit],
    queryFn: () => getReviewsByUserId({ id: userId, page, limit }),
    enabled: !!userId,
  });
};

export const useReviewAnalyticsOverview = (range: ReviewAnalyticsPayload["range"]) => {
  return useQuery({
    queryKey: ["reviews", "analytics-overview", range],
    queryFn: () => getAnalyticsOverview({ range, reviewId: 0 }),
  });
};

export const useReviewAnalytics = (reviewId: number, range: ReviewAnalyticsPayload["range"]) => {
  return useQuery({
    queryKey: ["reviews", "analytics", reviewId, range],
    queryFn: () => getAnalytics({ reviewId, range }),
    enabled: !!reviewId,
  });
};
