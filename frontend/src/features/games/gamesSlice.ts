import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import type {
  ApiResponse,
  FetchGamesPayload,
  Game,
  PaginatedGamesResponse,
  PaginationMeta,
} from "./types";
import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";

type GameOperation = "getOne" | "getAll" | "search" | "getTopRatedGames";

type OperationState = Record<GameOperation, boolean>;
type OperationErrorState = Record<GameOperation, string | null>;

const createOperationState = (value: boolean): OperationState => ({
  getOne: value,
  getAll: value,
  search: value,
  getTopRatedGames: value,
});

const createErrorState = (value: string | null): OperationErrorState => ({
  getOne: value,
  getAll: value,
  search: value,
  getTopRatedGames: value,
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

export interface GameState {
  games: Game[];
  meta: PaginationMeta | null;
  searchResults: Game[];
  searchMeta: PaginationMeta | null;
  currentGame: Game | null;
  topRatedGames: Game[];
  loading: OperationState;
  errors: OperationErrorState;
}

const initialState: GameState = {
  games: [],
  meta: null,
  searchResults: [],
  searchMeta: null,
  currentGame: null,
  topRatedGames: [],
  loading: createOperationState(false),
  errors: createErrorState(null),
};

export const getGames = createAsyncThunk<
  PaginatedGamesResponse,
  FetchGamesPayload | void,
  { rejectValue: string }
>("games/getGames", async (payload, thunkApi) => {
  try {
    const params = new URLSearchParams();
    if (payload) {
      if (payload.page) params.append("page", payload.page.toString());
      if (payload.limit) params.append("limit", payload.limit.toString());
      if (payload.search) params.append("search", payload.search);
    }

    const query = params.toString();
    const url = query ? `${API.GAME.GET_GAMES}?${query}` : API.GAME.GET_GAMES;

    const res = await apiClient.get<ApiResponse<PaginatedGamesResponse>>(url);

    if (!res.data.status) {
      return thunkApi.rejectWithValue(
        res.data.message ?? "Failed to load games"
      );
    }
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load games")
    );
  }
});

export const searchGames = createAsyncThunk<
  PaginatedGamesResponse,
  FetchGamesPayload,
  { rejectValue: string }
>("games/searchGames", async (payload, thunkApi) => {
  try {
    const params = new URLSearchParams();
    if (payload.page) params.append("page", payload.page.toString());
    if (payload.limit) params.append("limit", payload.limit.toString());
    if (payload.search) params.append("search", payload.search);

    const query = params.toString();
    const url = `${API.GAME.GET_GAMES}?${query}`;

    const res = await apiClient.get<ApiResponse<PaginatedGamesResponse>>(url);

    if (!res.data.status) {
      return thunkApi.rejectWithValue(
        res.data.message ?? "Failed to search games"
      );
    }
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to search games")
    );
  }
});

export const getGame = createAsyncThunk<Game, string, { rejectValue: string }>(
  "games/getGame",
  async (id: string, thunkApi) => {
    try {
      const res = await apiClient.get<ApiResponse<Game>>(
        `${API.GAME.GET_GAME}?id=${id}`
      );

      if (!res.data.status) {
        return thunkApi.rejectWithValue(
          res.data.message ?? "Failed to load game"
        );
      }
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        extractErrorMessage(error, "Unable to load game")
      );
    }
  }
);

export const getTopRatedGames = createAsyncThunk<
  Game[],
  void,
  { rejectValue: string }
>("games/getTopRatedGames", async (_, thunkApi) => {
  try {
    const res = await apiClient.get<ApiResponse<Game[]>>(
      API.GAME.GET_TOP_RATED_GAMES
    );

    if (!res.data.status) {
      return thunkApi.rejectWithValue(
        res.data.message ?? "Failed to load top rated games"
      );
    }
    return res.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      extractErrorMessage(error, "Unable to load top rated games")
    );
  }
});

const gamesSlice = createSlice({
  initialState,
  name: "gameSlice",
  reducers: {
    clearSearchResults: (state: GameState) => {
      state.searchResults = [];
      state.searchMeta = null;
      state.errors.search = null;
    },
    resetCurrentGame: (state: GameState) => {
      state.currentGame = null;
      state.errors.getOne = null;
    },
  },
  extraReducers(builder: ActionReducerMapBuilder<GameState>) {
    builder
      .addCase(getGames.pending, (state) => {
        state.loading.getAll = true;
        state.errors.getAll = null;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.loading.getAll = false;
        state.games = action.payload.games;
        state.meta = action.payload.meta;
        console.log(action.payload);
      })
      .addCase(getGames.rejected, (state, action) => {
        state.loading.getAll = false;
        state.errors.getAll = action.payload ?? "Failed to fetch games";
      })

      // GET A GAME
      .addCase(getGame.pending, (state) => {
        state.loading.getOne = true;
        state.errors.getOne = null;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.loading.getOne = false;
        state.currentGame = action.payload;
        console.log(action.payload);
      })
      .addCase(getGame.rejected, (state, action) => {
        state.loading.getOne = false;
        state.errors.getOne = action.payload ?? "Failed to fetch game";
      })

      // GET TOP RATED GAMES
      .addCase(getTopRatedGames.pending, (state) => {
        state.loading.getTopRatedGames = true;
        state.errors.getTopRatedGames = null;
      })
      .addCase(getTopRatedGames.fulfilled, (state, action) => {
        state.loading.getTopRatedGames = false;
        state.topRatedGames = action.payload;
        console.log(action.payload);
      })
      .addCase(getTopRatedGames.rejected, (state, action) => {
        state.loading.getTopRatedGames = false;
        state.errors.getTopRatedGames =
          action.payload ?? "Failed to fetch top rated games";
      })

      // SEARCH GAMES
      .addCase(searchGames.pending, (state) => {
        state.loading.search = true;
        state.errors.search = null;
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload.games;
        state.searchMeta = action.payload.meta;
      })
      .addCase(searchGames.rejected, (state, action) => {
        state.loading.search = false;
        state.errors.search = action.payload ?? "Failed to search games";
      });
  },
});

export const { clearSearchResults, resetCurrentGame } = gamesSlice.actions;

export default gamesSlice.reducer;
