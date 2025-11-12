import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { BiSearch } from "react-icons/bi";
import GameCard from "./GameCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getGames } from "../../../features/games/gamesSlice";
import type { RootState } from "../../../store";

const GameSection = () => {
  const dispatch = useAppDispatch();
  const [selectedGenre, setSelectedGenre] = useState<string | null>("All");
  const [search, setSearch] = useState("");

  const { games, loading } = useAppSelector((state: RootState) => state.game);

  useEffect(() => {
    if (games.length === 0) {
      dispatch(getGames());
    }
  }, [dispatch, games]);

  // Extract unique genres from all games
  const genres = useMemo(() => {
    const genreSet = new Set<string>();
    games.forEach((game) => {
      game.genre?.forEach((g) => {
        if (g.name) {
          genreSet.add(g.name);
        }
      });
    });
    return Array.from(genreSet).sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    if (games.length === 0) return [];

    return games.filter((game) => {
      const matchesSearch =
        search === "" ||
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.description.toLowerCase().includes(search.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" ||
        selectedGenre === null ||
        game.genre?.some((g) => g.name === selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [games, selectedGenre, search]);

  return (
    <div className="md:w-[95%] p-2 md:p-10">
      <div className="md:border-1 rounded-[10px] md:bg-dark md:border-[#989fab1e] md:p-5">
        <div className="flex items-center gap-x-2 bg-dark md:bg-primary p-3 rounded-[15px]">
          <BiSearch className="text-white text-2xl" />
          <input
            className="w-full text-primary border-0 focus:outline-none"
            type="text"
            placeholder="Search for games"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setSelectedGenre("All")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedGenre === "All"
                ? "bg-[var(--color-purple)] text-white"
                : "bg-dark-purple text-[var(--color-purple)] hover:bg-[#6711bf] hover:text-white"
            }`}
          >
            All
          </button>
          {genres.map((genreName) => (
            <button
              key={genreName}
              onClick={() => setSelectedGenre(genreName)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedGenre === genreName
                  ? "bg-[var(--color-purple)] text-white"
                  : "bg-dark-purple text-[var(--color-purple)] hover:bg-[#6711bf] hover:text-white"
              }`}
            >
              {genreName}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-10">
        {loading.getAll ? (
          <p className="text-white">Loading...</p>
        ) : filteredGames.length === 0 ? (
          <p className="text-gray-400">No games found</p>
        ) : (
          filteredGames.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`}>
              <GameCard game={game} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default GameSection;
