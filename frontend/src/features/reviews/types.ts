import type { UserProfile } from "../user/types";

export interface RatingBreakdown {
  graphics: number;
  gameplay: number;
  story: number;
  sound: number;
  overall: number;
}

export interface ReviewSummary {
  id: number;
  title: string;
  text: string;
  gameId: number;
  likeCount: number;
  viewCount: number;
  isLiked: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  user: UserProfile;
  rating?: RatingBreakdown;
}

export interface ReviewAnalytics {
  likeCount: number;
  viewCount: number;
  trend: number;
  chartData: ChartData[];
}

export interface ChartData {
  date: string;
  count: number;
}

export type ReviewDetails = ReviewSummary;

export enum AnalyticsRange {
  past_7_days = "past_7_days",
  past_14_days = "past_14_days",
  past_28_days = "past_28_days",
  past_90_days = "past_90_days",
}
export interface ReviewAnalyticsPayload {
  reviewId: number;
  range: AnalyticsRange;
}

export interface AnalyticsOverview {
  topReviews: ReviewSummary[];
  totalComment: number;
  totalLikes: number;
  totalViews: number;
  chartData: ChartData[];
  views: ViewsData;
}

export interface LikesData {
  pastLikes: number;
  currentLikes: number;
  likeTrend: number;
}

export interface ViewsData {
  pastViews: number;
  currentViews: number;
  viewsTrend: number;
}

export interface CreateReviewPayload {
  title: string;
  comment: string;
  gameId: number;
  rating: {
    graphics: number;
    gameplay: number;
    story: number;
    sound: number;
  };
}

export interface UpdateReviewPayload {
  id: number;
  title?: string;
  comment?: string;
  rating?: {
    graphics: number;
    gameplay: number;
    story: number;
    sound: number;
  };
}

export interface SearchReviewsPayload {
  query?: string | null;
  page?: number;
  limit?: number;
}

export interface GetReviewsByIdPayload {
  id: number;
  page: number;
  limit: number;
}

export interface ReviewLikeResponse {
  isLiked: boolean;
  reviewId: number;
  likeCount: number;
}

export interface ReviewViewResponse {
  viewed: boolean;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Comments
export interface ReviewComment {
  id: number;
  userId: number;
  comment: string;
  parentCommentId?: number | null;
  createdAt: string;
  updatedAt: string;
  isYourComment: boolean;
  username: string;
}

export interface CreateCommentPayload {
  reviewId: number;
  comment: string;
  parentCommentId?: number;
}

export interface UpdateCommentPayload {
  id: number;
  comment: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  lastPage: number;
}

export interface PaginatedReviewsResponse {
  reviews: ReviewSummary[];
  meta: PaginationMeta;
}
