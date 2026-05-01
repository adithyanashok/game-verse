import { useQuery } from "@tanstack/react-query";
import { getGames, searchGames, getTopRatedGames } from "../../../api/game/game";
import type { FetchGamesPayload } from "../../../api/game/types";

export const useGames = (payload?: FetchGamesPayload) => {
  return useQuery({
    queryKey: ["games", payload],
    queryFn: () => getGames(payload),
  });
};

export const useSearchGames = (payload: FetchGamesPayload) => {
  return useQuery({
    queryKey: ["games", "search", payload],
    queryFn: () => searchGames(payload),
    enabled: !!payload.search,
  });
};

export const useTopRatedGames = () => {
  return useQuery({
    queryKey: ["games", "top-rated"],
    queryFn: getTopRatedGames,
  });
};
