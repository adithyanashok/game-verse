export interface Game {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  genre: Genre[];
  rating: Rating;
  overall: number;
  releaseDate: string;
  overallRating: number;
  overview: Overview;
}
export interface Overview {
  id: number;
  overview: string;
}
export interface Rating {
  overallRating: number;
  ratings: Ratings[];
}

export interface Ratings {
  rating: number;
  percent: number;
}
export interface Genre {
  id: number;
  name: string;
}
export interface Games {
  games: Game[];
}
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface FetchGamesPayload {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  lastPage: number;
}

export interface PaginatedGamesResponse {
  games: Game[];
  meta: PaginationMeta;
}
