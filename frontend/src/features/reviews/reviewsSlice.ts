import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";

import apiClient from "../../services/apiClient";
import type { RootState } from "../../store";
import {
  type ApiResponse,
  type CreateReviewPayload,
  type GetReviewsByIdPayload,
  type ReviewDetails,
  type ReviewComment,
  type ReviewLikeResponse,
  type ReviewSummary,
  type ReviewViewResponse,
  type SearchReviewsPayload,
  type UpdateReviewPayload,
  type CreateCommentPayload,
  type UpdateCommentPayload,
} from "./types";
import { API } from "../../services/endpoints";

type ReviewOperation =
  | "create"
  | "fetchOne"
  | "like"
  | "view"
  | "trending"
  | "recent"
  | "search"
  | "update"
  | "fetchByGame"
  | "fetchByUser"
  | "delete"
  | "fetchComments"
  | "addComment"
  | "updateComment"
  | "deleteComment";

type OperationState = Record<ReviewOperation, boolean>;
type OperationErrorState = Record<ReviewOperation, string | null>;

const createOperationState = (value: boolean): OperationState => ({
  create: value,
  fetchOne: value,
  like: value,
  view: value,
  trending: value,
  recent: value,
  search: value,
  update: value,
  delete: value,
  fetchByGame: value,
  fetchComments: value,
  addComment: value,
  updateComment: value,
  deleteComment: value,
  fetchByUser: value,
});

const createErrorState = (value: string | null): OperationErrorState => ({
  create: value,
  fetchOne: value,
  like: value,
  view: value,
  trending: value,
  recent: value,
  search: value,
  update: value,
  delete: value,
  fetchByGame: value,
  fetchComments: value,
  addComment: value,
  updateComment: value,
  deleteComment: value,
  fetchByUser: value,
});

const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    const errObj = error as {
      message?: unknown;
      response?: {
        data?: {
          message?: unknown;
        };
      };
    };

    const responseMessage = errObj.response?.data?.message;
    if (typeof responseMessage === "string") {
      return responseMessage;
    }

    if (typeof errObj.message === "string") {
      return errObj.message;
    }
  }

  return fallback;
};

export interface ReviewsState {
  trending: ReviewSummary[];
  reviews: ReviewSummary[];
  recent: ReviewSummary[];
  userReviews: ReviewSummary[];
  searchResults: ReviewSummary[];
  currentReview: ReviewDetails | null;
  createdReview: ReviewDetails | null;
  likedReviews: Record<number, boolean>;
  commentsByReviewId: Record<number, ReviewComment[]>;
  loading: OperationState;
  errors: OperationErrorState;
}

const initialState: ReviewsState = {
  trending: [],
  reviews: [],
  recent: [],
  userReviews: [],
  searchResults: [],
  currentReview: null,
  createdReview: null,
  likedReviews: {},
  commentsByReviewId: {},
  loading: createOperationState(false),
  errors: createErrorState(null),
};

const buildUrl = (path: string, searchParams?: Record<string, string>) => {
  const params = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, value);
      }
    });
  }

  const queryString = params.toString();
  return `${path}${queryString ? `?${queryString}` : ""}`;
};

export const createReview = createAsyncThunk<
  ReviewDetails,
  CreateReviewPayload,
  { rejectValue: string }
>("reviews/create", async (payload, thunkApi) => {
  try {
    const response = await apiClient.post<
      ApiResponse<{ savedReview: ReviewDetails }>
    >(buildUrl(API.REVIEWS.CREATE_REVIEW), payload);

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to create review"
      );
    }

    return response.data.data.savedReview;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to create review")
    );
  }
});

export const fetchReviewById = createAsyncThunk<
  ReviewDetails,
  number,
  { rejectValue: string }
>("reviews/fetchById", async (reviewId, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<ReviewDetails | null>>(
      buildUrl(API.REVIEWS.GET_REVIEW, { id: reviewId.toString() })
    );

    if (!response.data.status || !response.data.data) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Review not found"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to fetch review")
    );
  }
});

export const likeReview = createAsyncThunk<
  ReviewLikeResponse,
  number,
  { rejectValue: string; state: RootState }
>("reviews/like", async (reviewId, thunkApi) => {
  try {
    const response = await apiClient.post<ApiResponse<ReviewLikeResponse>>(
      buildUrl(API.REVIEWS.LIKE_REVIEW, { reviewId: reviewId.toString() })
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to like review"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to update like status")
    );
  }
});

export const updateReviewView = createAsyncThunk<
  ReviewViewResponse,
  number,
  { rejectValue: string }
>("reviews/updateView", async (reviewId, thunkApi) => {
  try {
    const response = await apiClient.post<ApiResponse<ReviewViewResponse>>(
      buildUrl(API.REVIEWS.UPDATE_REVIEW_VIEW, {
        reviewId: reviewId.toString(),
      })
    );

    console.log("updateView: ", response);

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to update views"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to update views")
    );
  }
});

export const fetchTrendingReviews = createAsyncThunk<
  ReviewSummary[],
  void,
  { rejectValue: string }
>("reviews/fetchTrending", async (_, thunkApi) => {
  try {
    console.log(buildUrl("/trending-review"));
    const response = await apiClient.get<ApiResponse<ReviewSummary[]>>(
      buildUrl(API.REVIEWS.TRENDING_REVIEW)
    );

    console.log(response.data);

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to load trending reviews"
      );
    }

    return response.data.data ?? [];
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load trending reviews")
    );
  }
});

export const fetchRecentReviews = createAsyncThunk<
  ReviewSummary[],
  void,
  { rejectValue: string }
>("reviews/fetchRecent", async (_, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<ReviewSummary[]>>(
      buildUrl(API.REVIEWS.RECENT_REVIEW)
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to load recent reviews"
      );
    }

    return response.data.data ?? [];
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load recent reviews")
    );
  }
});

export const searchReviews = createAsyncThunk<
  ReviewSummary[],
  SearchReviewsPayload,
  { rejectValue: string }
>("reviews/search", async ({ query, page, limit }, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<ReviewSummary[]>>(
      buildUrl(API.REVIEWS.SEARCH_REVIEW, {
        query,
        page: page?.toString() ?? "1",
        limit: limit?.toString() ?? "20",
      })
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(response.data.message ?? "Search failed");
    }

    return response.data.data ?? [];
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to search reviews")
    );
  }
});

export const getByGameId = createAsyncThunk<
  ReviewSummary[],
  GetReviewsByIdPayload,
  { rejectValue: string }
>("reviews/getByGameId", async ({ id, page, limit }, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<ReviewSummary[]>>(
      buildUrl(API.REVIEWS.GET_BY_GAMEID, {
        id: id.toString(),
        page: page?.toString() ?? "1",
        limit: limit?.toString() ?? "20",
      })
    );

    console.log(response.data);

    if (!response.data.status) {
      return thunkApi.rejectWithValue(response.data.message ?? "Search failed");
    }

    return response.data.data ?? [];
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to search reviews")
    );
  }
});

export const getByUserId = createAsyncThunk<
  ReviewSummary[],
  GetReviewsByIdPayload,
  { rejectValue: string }
>("reviews/getByUserId", async ({ id, page, limit }, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<ReviewSummary[]>>(
      buildUrl(API.REVIEWS.GET_BY_USERID, {
        id: id.toString(),
        page: page?.toString() ?? "1",
        limit: limit?.toString() ?? "20",
      })
    );

    console.log(response.data);

    if (!response.data.status) {
      return thunkApi.rejectWithValue(response.data.message ?? "Fetch failed");
    }

    return response.data.data ?? [];
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to fetch reviews")
    );
  }
});

export const updateReview = createAsyncThunk<
  ReviewSummary,
  UpdateReviewPayload,
  { rejectValue: string }
>("reviews/update", async (payload, thunkApi) => {
  try {
    console.log(payload);
    const response = await apiClient.patch<ApiResponse<ReviewSummary>>(
      buildUrl(API.REVIEWS.UPDATE_REVIEW),
      payload
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(response.data.message ?? "Update failed");
    }
    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to update review")
    );
  }
});

export const deleteReview = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("reviews/delete", async (reviewId, thunkApi) => {
  try {
    const response = await apiClient.delete<ApiResponse<unknown>>(
      buildUrl(API.REVIEWS.DELETE_REVIEW, { reviewId: reviewId.toString() })
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(response.data.message ?? "Delete failed");
    }

    return reviewId;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to delete review")
    );
  }
});

// Comments: fetch list
export const fetchCommentsByReviewId = createAsyncThunk<
  { reviewId: number; comments: ReviewComment[] },
  number,
  { rejectValue: string }
>("reviews/fetchComments", async (reviewId, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<ReviewComment[]>>(
      buildUrl(API.REVIEWS.GET_COMMENTS, { reviewId: reviewId.toString() })
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to load comments"
      );
    }

    return { reviewId, comments: response.data.data ?? [] };
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load comments")
    );
  }
});

// Comments: add
export const addComment = createAsyncThunk<
  { reviewId: number; comment: ReviewComment },
  CreateCommentPayload,
  { rejectValue: string }
>("reviews/addComment", async (payload, thunkApi) => {
  try {
    const response = await apiClient.post<ApiResponse<ReviewComment>>(
      buildUrl(API.REVIEWS.ADD_COMMENT),
      payload
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to add comment"
      );
    }

    return { reviewId: payload.reviewId, comment: response.data.data };
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to add comment")
    );
  }
});

// Comments: update
export const updateComment = createAsyncThunk<
  ReviewComment,
  UpdateCommentPayload,
  { rejectValue: string }
>("reviews/updateComment", async (payload, thunkApi) => {
  try {
    const response = await apiClient.patch<ApiResponse<ReviewComment>>(
      buildUrl(API.REVIEWS.UPDATE_COMMENT),
      payload
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to update comment"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to update comment")
    );
  }
});

// Comments: delete
export const deleteComment = createAsyncThunk<
  { reviewId: number; commentId: number },
  { reviewId: number; commentId: number },
  { rejectValue: string }
>("reviews/deleteComment", async ({ reviewId, commentId }, thunkApi) => {
  try {
    const response = await apiClient.delete<ApiResponse<unknown>>(
      buildUrl(API.REVIEWS.DELETE_COMMENT, {
        reviewId: reviewId.toString(),
        commentId: commentId.toString(),
      })
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to delete comment"
      );
    }

    return { reviewId, commentId };
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to delete comment")
    );
  }
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearSearchResults: (state: ReviewsState) => {
      state.searchResults = [];
      state.errors.search = null;
    },
    resetCurrentReview: (state: ReviewsState) => {
      state.currentReview = null;
      state.errors.fetchOne = null;
    },
    setLikedState: (
      state: ReviewsState,
      action: PayloadAction<{ reviewId: number; liked: boolean }>
    ) => {
      state.likedReviews[action.payload.reviewId] = action.payload.liked;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ReviewsState>) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading.create = true;
        state.errors.create = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading.create = false;
        state.createdReview = action.payload;
        state.recent = [action.payload, ...state.recent];
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading.create = false;
        state.errors.create = action.payload ?? "Failed to create review";
      })

      // Fetch review by id
      .addCase(fetchReviewById.pending, (state) => {
        state.loading.fetchOne = true;
        state.errors.fetchOne = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading.fetchOne = false;
        state.currentReview = action.payload;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading.fetchOne = false;
        state.errors.fetchOne = action.payload ?? "Failed to load review";
      })

      // Like review
      .addCase(likeReview.pending, (state) => {
        state.loading.like = true;
        state.errors.like = null;
      })
      .addCase(likeReview.fulfilled, (state, action) => {
        state.loading.like = false;
        state.likedReviews[action.payload.reviewId] = action.payload.isLiked;
        console.log(action.payload.likeCount);

        if (
          state.currentReview &&
          state.currentReview.id === action.payload.reviewId
        ) {
          state.currentReview.isLiked = action.payload.isLiked;
          state.currentReview.likeCount = action.payload.likeCount;
        }
      })
      .addCase(likeReview.rejected, (state, action) => {
        state.loading.like = false;
        state.errors.like = action.payload ?? "Failed to update like";
      })

      // Update view
      .addCase(updateReviewView.pending, (state) => {
        state.loading.view = true;
        state.errors.view = null;
      })
      .addCase(updateReviewView.fulfilled, (state) => {
        state.loading.view = false;
        if (state.currentReview) {
          state.currentReview.viewCount =
            (state.currentReview.viewCount ?? 0) + 1;
        }
      })
      .addCase(updateReviewView.rejected, (state, action) => {
        state.loading.view = false;
        state.errors.view = action.payload ?? "Failed to update views";
      })

      // Trending reviews
      .addCase(fetchTrendingReviews.pending, (state) => {
        state.loading.trending = true;
        state.errors.trending = null;
      })
      .addCase(fetchTrendingReviews.fulfilled, (state, action) => {
        state.loading.trending = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingReviews.rejected, (state, action) => {
        state.loading.trending = false;
        state.errors.trending = action.payload ?? "Failed to fetch trending";
      })

      // Recent reviews
      .addCase(fetchRecentReviews.pending, (state) => {
        state.loading.recent = true;
        state.errors.recent = null;
      })
      .addCase(fetchRecentReviews.fulfilled, (state, action) => {
        state.loading.recent = false;
        state.recent = action.payload;
      })
      .addCase(fetchRecentReviews.rejected, (state, action) => {
        state.loading.recent = false;
        state.errors.recent = action.payload ?? "Failed to fetch recent";
      })

      // Search reviews
      .addCase(searchReviews.pending, (state) => {
        state.loading.search = true;
        state.errors.search = null;
      })
      .addCase(searchReviews.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
      })
      .addCase(searchReviews.rejected, (state, action) => {
        state.loading.search = false;
        state.errors.search = action.payload ?? "Search failed";
      })

      // Get reviews By GameId
      .addCase(getByGameId.pending, (state) => {
        state.loading.fetchByGame = true;
        state.errors.fetchByGame = null;
      })
      .addCase(getByGameId.fulfilled, (state, action) => {
        state.loading.fetchByGame = false;
        state.reviews = action.payload;
      })
      .addCase(getByGameId.rejected, (state, action) => {
        state.loading.fetchByGame = false;
        state.errors.fetchByGame = action.payload ?? "Search failed";
      })

      // Get reviews By UserId
      .addCase(getByUserId.pending, (state) => {
        state.loading.fetchByUser = true;
        state.errors.fetchByUser = null;
      })
      .addCase(getByUserId.fulfilled, (state, action) => {
        state.loading.fetchByUser = false;
        state.userReviews = action.payload;
      })
      .addCase(getByUserId.rejected, (state, action) => {
        state.loading.fetchByUser = false;
        state.errors.fetchByUser = action.payload ?? "Fetch failed";
      })

      // Update review
      .addCase(updateReview.pending, (state) => {
        state.loading.update = true;
        state.errors.update = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading.update = false;

        if (
          state.currentReview &&
          state.currentReview.id === action.payload.id
        ) {
          state.currentReview = action.payload;
        }

        state.recent = state.recent.map((review) =>
          review.id === action.payload.id ? action.payload : review
        );
        state.trending = state.trending.map((review) =>
          review.id === action.payload.id ? action.payload : review
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading.update = false;
        state.errors.update = action.payload ?? "Failed to update review";
      })

      // Delete review
      .addCase(deleteReview.pending, (state) => {
        state.loading.delete = true;
        state.errors.delete = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.recent = state.recent.filter(
          (review) => review.id !== action.payload
        );
        state.trending = state.trending.filter(
          (review) => review.id !== action.payload
        );
        state.searchResults = state.searchResults.filter(
          (review) => review.id !== action.payload
        );
        if (state.currentReview?.id === action.payload) {
          state.currentReview = null;
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading.delete = false;
        state.errors.delete = action.payload ?? "Failed to delete review";
      })

      // Fetch comments
      .addCase(fetchCommentsByReviewId.pending, (state) => {
        state.loading.fetchComments = true;
        state.errors.fetchComments = null;
      })
      .addCase(fetchCommentsByReviewId.fulfilled, (state, action) => {
        state.loading.fetchComments = false;
        state.commentsByReviewId[action.payload.reviewId] =
          action.payload.comments;
      })
      .addCase(fetchCommentsByReviewId.rejected, (state, action) => {
        state.loading.fetchComments = false;
        state.errors.fetchComments =
          action.payload ?? "Failed to load comments";
      })

      // Add comment
      .addCase(addComment.pending, (state) => {
        state.loading.addComment = true;
        state.errors.addComment = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading.addComment = false;
        const list = state.commentsByReviewId[action.payload.reviewId] ?? [];
        state.commentsByReviewId[action.payload.reviewId] = [
          action.payload.comment,
          ...list,
        ];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading.addComment = false;
        state.errors.addComment = action.payload ?? "Failed to add comment";
      })

      // Update comment
      .addCase(updateComment.pending, (state) => {
        state.loading.updateComment = true;
        state.errors.updateComment = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading.updateComment = false;
        const reviewIdKeys = Object.keys(state.commentsByReviewId);
        for (const key of reviewIdKeys) {
          const id = Number(key);
          state.commentsByReviewId[id] = (
            state.commentsByReviewId[id] ?? []
          ).map((c) => (c.id === action.payload.id ? action.payload : c));
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading.updateComment = false;
        state.errors.updateComment =
          action.payload ?? "Failed to update comment";
      })

      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading.deleteComment = true;
        state.errors.deleteComment = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading.deleteComment = false;
        const list = state.commentsByReviewId[action.payload.reviewId] ?? [];
        state.commentsByReviewId[action.payload.reviewId] = list.filter(
          (c) => c.id !== action.payload.commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading.deleteComment = false;
        state.errors.deleteComment =
          action.payload ?? "Failed to delete comment";
      });
  },
});

export const { clearSearchResults, resetCurrentReview, setLikedState } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
