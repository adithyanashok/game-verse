export interface RatingInterface {
  overallRating: number;
  ratings: Rating[];
}

interface Rating {
  rating: number;
  percent: string;
}
