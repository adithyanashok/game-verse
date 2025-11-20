export interface Game {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  genre: Genre[];
  rating: Rating;
  releaseDate: string;
  overallRating:number;
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
