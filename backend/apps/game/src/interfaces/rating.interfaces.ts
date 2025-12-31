export interface RatingInterface {
  overallRating: number;
  ratings: Rating[];
}

interface Rating {
  rating: number;
  percent: string;
}

export interface OverallRating {
  overall: number;
  gameId: number;
}

export type RatingItem = {
  gameId: number;
  overall: number;
};
