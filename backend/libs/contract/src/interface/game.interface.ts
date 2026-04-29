export interface GameGenreResponse {
  id: number;
  name: string;
}

export interface GameRatingResponse {
  overallRating: number;
}

export interface GameResponse {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  releaseDate: string;
  genre: GameGenreResponse[];
  rating?: GameRatingResponse | null;
}
