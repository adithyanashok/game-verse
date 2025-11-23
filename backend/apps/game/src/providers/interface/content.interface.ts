export interface Content {
  title: string;
  text: string;
  rating: Rating;
}
export interface Rating {
  id: number;
  gameId: number;
  overall: number;
  graphics: number;
  gameplay: number;
  story: number;
  sound: number;
}
