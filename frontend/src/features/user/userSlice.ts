import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";

import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";
import type { ApiResponse } from "../../interfaces/api-response.interface";
import type { FollowStatusResponse, UserProfile, UserState } from "./types";

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

const initialState: UserState = {
  profile: null,
  topReviewers: [],
  loading: false,
  error: null,
  followLoading: false,
  followError: null,
};

export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  number,
  { rejectValue: string }
>("user/fetchProfile", async (userId, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      API.USER.FETCH_ONE(userId)
    );

    if (!response.data.status || !response.data.data) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to load user"
      );
    }

    const data = response.data.data;
    return {
      ...data,
      isFollowing: Boolean(data.isFollowing),
    };
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load user")
    );
  }
});

export const followUser = createAsyncThunk<
  FollowStatusResponse,
  number,
  { rejectValue: string }
>("user/follow", async (targetUserId, thunkApi) => {
  try {
    const response = await apiClient.post<ApiResponse<FollowStatusResponse>>(
      API.USER.FOLLOW(targetUserId)
    );

    console.log(response);

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to follow user"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to follow user")
    );
  }
});

export const unfollowUser = createAsyncThunk<
  FollowStatusResponse,
  number,
  { rejectValue: string }
>("user/unfollow", async (targetUserId, thunkApi) => {
  try {
    const response = await apiClient.delete<ApiResponse<FollowStatusResponse>>(
      API.USER.FOLLOW(targetUserId)
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to unfollow user"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to unfollow user")
    );
  }
});

export const getTopReviewers = createAsyncThunk<
  UserProfile[],
  void,
  { rejectValue: string }
>("user/getTopReviewers", async (_, thunkApi) => {
  try {
    const response = await apiClient.get<ApiResponse<UserProfile[]>>(
      API.USER.GET_TOP_REVIEWERS
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Failed to fetch reviewers"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to fetch reviewers")
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        fetchUserProfile.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to load user";
        }
      )
      .addCase(followUser.pending, (state) => {
        state.followLoading = true;
        state.followError = null;
      })
      .addCase(
        followUser.fulfilled,
        (state, action: PayloadAction<FollowStatusResponse>) => {
          state.followLoading = false;
          if (!state.profile) {
            return;
          }

          const wasFollowing = state.profile.isFollowing;
          state.profile.isFollowing = action.payload.isFollowing;

          if (!wasFollowing && action.payload.isFollowing) {
            state.profile.followersCount += 1;
          }
        }
      )
      .addCase(
        followUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.followLoading = false;
          state.followError =
            action.payload ?? "Failed to update follow status";
        }
      )
      .addCase(unfollowUser.pending, (state) => {
        state.followLoading = true;
        state.followError = null;
      })
      .addCase(
        unfollowUser.fulfilled,
        (state, action: PayloadAction<FollowStatusResponse>) => {
          state.followLoading = false;
          if (!state.profile) {
            return;
          }

          const wasFollowing = state.profile.isFollowing;
          state.profile.isFollowing = action.payload.isFollowing;

          if (wasFollowing && !action.payload.isFollowing) {
            state.profile.followersCount = Math.max(
              0,
              state.profile.followersCount - 1
            );
          }
        }
      )
      .addCase(
        unfollowUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.followLoading = false;
          state.followError =
            action.payload ?? "Failed to update follow status";
        }
      )

      // GET TOP REVIEWERS
      .addCase(getTopReviewers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopReviewers.fulfilled, (state, action) => {
        state.loading = false;
        state.topReviewers = action.payload;
      })
      .addCase(getTopReviewers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch reviewers";
      });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
