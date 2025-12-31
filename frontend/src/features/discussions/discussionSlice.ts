import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import type { ApiResponse, CreateDiscussionPayload, Discussion } from "./types";
import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";

type DiscussionOperation = "getOne" | "getAll" | "create";

type OperationState = Record<DiscussionOperation, boolean>;
type OperationErrorState = Record<DiscussionOperation, string | null>;

const createOperationState = (value: boolean): OperationState => ({
  getOne: value,
  getAll: value,
  create: value,
});

const createErrorState = (value: string | null): OperationErrorState => ({
  getOne: value,
  getAll: value,
  create: value,
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

export interface DiscussionState {
  discussions: Discussion[];
  currentDiscussion: Discussion | null;
  loading: OperationState;
  errors: OperationErrorState;
}

const initialState: DiscussionState = {
  discussions: [],
  currentDiscussion: null,
  loading: createOperationState(false),
  errors: createErrorState(null),
};

export const getDiscussions = createAsyncThunk<
  Discussion[],
  void,
  { rejectValue: string }
>("discussion/getDiscussions", async (_, thunkApi) => {
  try {
    const res = await apiClient.get<ApiResponse<Discussion[]>>(
      API.DISCUSSIONS.GET_ALL
    );

    if (!res.data.status) {
      return thunkApi.rejectWithValue(
        res.data.message ?? "Failed to load discussions"
      );
    }
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load discussions")
    );
  }
});

export const createDiscussion = createAsyncThunk<
  Discussion,
  CreateDiscussionPayload,
  { rejectValue: string }
>("discussion/createDiscussion", async (payload, thunkApi) => {
  try {
    const res = await apiClient.post<ApiResponse<Discussion>>(
      API.DISCUSSIONS.CREATE,
      payload
    );

    if (!res.data.status) {
      return thunkApi.rejectWithValue(
        res.data.message ?? "Failed to create discussion"
      );
    }
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to create discussionn")
    );
  }
});

export const getDiscussion = createAsyncThunk<
  Discussion,
  string,
  { rejectValue: string }
>("discussion/getDiscussion", async (id: string, thunkApi) => {
  try {
    const res = await apiClient.get<ApiResponse<Discussion>>(
      `/discussion/get-discussion?id=${id}`
    );

    if (!res.data.status) {
      return thunkApi.rejectWithValue(
        res.data.message ?? "Failed to load discussion"
      );
    }
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load discussion")
    );
  }
});

const discussionSlice = createSlice({
  initialState,
  name: "discussionSlice",
  reducers: {
    resetCurrentDiscussion: (state: DiscussionState) => {
      state.currentDiscussion = null;
      state.errors.getOne = null;
    },
  },
  extraReducers(builder: ActionReducerMapBuilder<DiscussionState>) {
    builder
      .addCase(getDiscussions.pending, (state) => {
        state.loading.getAll = true;
        state.errors.getAll = null;
      })
      .addCase(getDiscussions.fulfilled, (state, action) => {
        state.loading.getAll = false;
        state.discussions = action.payload;
      })
      .addCase(getDiscussions.rejected, (state, action) => {
        state.loading.getAll = false;
        state.errors.getAll = action.payload ?? "Failed to fetch discussions";
      })

      // GET A DISCUSSION
      .addCase(getDiscussion.pending, (state) => {
        state.loading.getOne = true;
        state.errors.getOne = null;
      })
      .addCase(getDiscussion.fulfilled, (state, action) => {
        state.loading.getOne = false;
        state.currentDiscussion = action.payload;
      })
      .addCase(getDiscussion.rejected, (state, action) => {
        state.loading.getOne = false;
        state.errors.getOne = action.payload ?? "Failed to fetch discussion";
      })

      // CREATE DISCUSSION
      .addCase(createDiscussion.pending, (state) => {
        state.loading.create = true;
        state.errors.create = null;
      })
      .addCase(createDiscussion.fulfilled, (state, action) => {
        state.loading.create = false;
        state.currentDiscussion = action.payload;
      })
      .addCase(createDiscussion.rejected, (state, action) => {
        state.loading.create = false;
        state.errors.create = action.payload ?? "Failed to search discussion";
      });
  },
});

export const { resetCurrentDiscussion } = discussionSlice.actions;

export default discussionSlice.reducer;
