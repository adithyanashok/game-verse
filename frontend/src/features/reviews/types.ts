export interface RatingBreakdown {
  graphics: number;
  gameplay: number;
  story: number;
  sound: number;
  overall: number;
}

export interface ReviewSummary {
  id: number;
  userName: string;
  title: string;
  text: string;
  userId: number;
  gameId: number;
  likeCount: number;
  viewCount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  rating?: RatingBreakdown;
}

export type ReviewDetails = ReviewSummary;

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
}

export interface SearchReviewsPayload {
  query: string;
  page?: number;
  limit?: number;
}

export interface GetReviewsByGameIdPayload {
  gameId: number;
  page: number;
  limit: number;
}

export interface ReviewLikeResponse {
  liked: boolean;
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
