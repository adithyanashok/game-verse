import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type AsyncThunkPayloadCreator,
  type PayloadAction,
} from "@reduxjs/toolkit";

import apiClient from "../../services/apiClient";
import {
  clearPersistedAuth,
  loadPersistedAuth,
  persistAuthState,
  type PersistedAuthState,
} from "./storage";
import type { ApiResponse, AuthSuccessPayload, User } from "./types";

const syncPersistedAuth = (state: AuthState) => {
  persistAuthState({
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  });
};

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

export interface AuthState extends PersistedAuthState {
  loading: boolean;
  error: string | null;
}

const persisted = loadPersistedAuth();

const initialState: AuthState = {
  user: persisted?.user ?? null,
  accessToken: persisted?.accessToken ?? null,
  refreshToken: persisted?.refreshToken ?? null,
  loading: false,
  error: null,
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  bio: string;
  email: string;
  password: string;
}

const loginUserPayloadCreator: AsyncThunkPayloadCreator<
  AuthSuccessPayload,
  LoginPayload,
  { rejectValue: string }
> = async (credentials, thunkApi) => {
  try {
    const response = await apiClient.post<ApiResponse<AuthSuccessPayload>>(
      "/auth/login",
      credentials
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(response.data.message ?? "Login failed");
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to login at this time")
    );
  }
};

const signupUserPayloadCreator: AsyncThunkPayloadCreator<
  AuthSuccessPayload,
  SignupPayload,
  { rejectValue: string }
> = async (payload, thunkApi) => {
  try {
    const response = await apiClient.post<ApiResponse<AuthSuccessPayload>>(
      "/auth/signup",
      payload
    );

    console.log(response);

    if (!response.data.status) {
      return thunkApi.rejectWithValue(response.data.message ?? "Signup failed");
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to signup at this time")
    );
  }
};

const refreshTokensPayloadCreator: AsyncThunkPayloadCreator<
  AuthSuccessPayload,
  { refreshToken: string },
  { rejectValue: string }
> = async (payload, thunkApi) => {
  try {
    const response = await apiClient.post<ApiResponse<AuthSuccessPayload>>(
      "/auth/refresh",
      payload
    );

    if (!response.data.status) {
      return thunkApi.rejectWithValue(
        response.data.message ?? "Refresh failed"
      );
    }

    return response.data.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to refresh session")
    );
  }
};

export const loginUser = createAsyncThunk<
  AuthSuccessPayload,
  LoginPayload,
  { rejectValue: string }
>("auth/login", loginUserPayloadCreator);

export const signupUser = createAsyncThunk<
  AuthSuccessPayload,
  SignupPayload,
  { rejectValue: string }
>("auth/signup", signupUserPayloadCreator);

export const refreshTokens = createAsyncThunk<
  AuthSuccessPayload,
  { refreshToken: string },
  { rejectValue: string }
>("auth/refresh", refreshTokensPayloadCreator);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.loading = false;
      clearPersistedAuth();
    },
    setUser: (state: AuthState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      syncPersistedAuth(state);
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(loginUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state: AuthState, action: PayloadAction<AuthSuccessPayload>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          syncPersistedAuth(state);
        }
      )
      .addCase(
        loginUser.rejected,
        (state: AuthState, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Login failed";
        }
      )
      .addCase(signupUser.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state: AuthState, action: PayloadAction<AuthSuccessPayload>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          syncPersistedAuth(state);
        }
      )
      .addCase(
        signupUser.rejected,
        (state: AuthState, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Signup failed";
        }
      )
      .addCase(refreshTokens.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        refreshTokens.fulfilled,
        (state: AuthState, action: PayloadAction<AuthSuccessPayload>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          syncPersistedAuth(state);
        }
      )
      .addCase(
        refreshTokens.rejected,
        (state: AuthState, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unable to refresh session";
        }
      );
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
