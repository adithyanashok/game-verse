import { useQuery } from "@tanstack/react-query";
import { getReviewsByGameId } from "../../../api/review/review";
import { getGame } from "../../../api/game/game";

export const useGameData = (gameId: number | null) => {
  const gameQuery = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGame(String(gameId)),
    enabled: !!gameId,
    staleTime: 1000 * 60 * 5,
  });

  const reviewsQuery = useQuery({
    queryKey: ["gameReviews", gameId],
    queryFn: () =>
      getReviewsByGameId({
        id: gameId!,
        page: 1,
        limit: 20,
      }),
    enabled: !!gameId,
    staleTime: 1000 * 60 * 2,
  });
  console.log("dd", reviewsQuery.data);
  return {
    game: gameQuery.data,
    reviews: reviewsQuery.data?.reviews ?? [],
    totalReviews: reviewsQuery.data?.meta?.total ?? 0,
    isLoading: gameQuery.isLoading || reviewsQuery.isLoading,
    error: gameQuery.error || reviewsQuery.error,
  };
};
