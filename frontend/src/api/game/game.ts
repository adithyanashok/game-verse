import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";
import type {
  ApiResponse,
  FetchGamesPayload,
  Game,
  PaginatedGamesResponse,
} from "./types";

export const getGames = async (payload?: FetchGamesPayload) => {
  const params = new URLSearchParams();

  if (payload?.page) params.append("page", payload.page.toString());
  if (payload?.limit) params.append("limit", payload.limit.toString());
  if (payload?.search) params.append("search", payload.search);

  const query = params.toString();
  const url = query ? `${API.GAME.GET_GAMES}?${query}` : API.GAME.GET_GAMES;

  const res = await apiClient.get<ApiResponse<PaginatedGamesResponse>>(url);

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to load games");
  }

  return res.data.data;
};

export const searchGames = async (payload: FetchGamesPayload) => {
  const params = new URLSearchParams();

  if (payload.page) params.append("page", payload.page.toString());
  if (payload.limit) params.append("limit", payload.limit.toString());
  if (payload.search) params.append("search", payload.search);

  const url = `${API.GAME.GET_GAMES}?${params.toString()}`;

  const res = await apiClient.get<ApiResponse<PaginatedGamesResponse>>(url);

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to search games");
  }

  return res.data.data;
};

export const getGame = async (id: string) => {
  const res = await apiClient.get<ApiResponse<Game>>(
    `${API.GAME.GET_GAME}?id=${id}`,
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to load game");
  }

  return res.data.data;
};

export const getTopRatedGames = async () => {
  const res = await apiClient.get<ApiResponse<Game[]>>(
    API.GAME.GET_TOP_RATED_GAMES,
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Failed to load top rated games");
  }

  return res.data.data;
};
