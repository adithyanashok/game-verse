import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import debounce from "../../utils/debouncer";
import { useGames, useSearchGames } from "./hooks/useGameQueries";
import { AppLoader } from "../../components/common/Loader";
import GameCard from "./Components/GameCard";
import Pagination from "../../components/common/Pagination";

const GamesListScreen = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>("All");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const LIMIT = 20;

  const { data: allGamesData, isLoading: loadingAll } = useGames({
    page,
    limit: LIMIT,
  });
  const { data: searchGamesData, isLoading: loadingSearch } = useSearchGames({
    search,
    page,
    limit: LIMIT,
  });

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setSearch(value);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSetSearch(searchInput);
  }, [debouncedSetSearch, searchInput]);

  useEffect(() => {
    debouncedSetSearch(searchInput);
  }, [debouncedSetSearch, searchInput]);

  const displayedGames = search
    ? (searchGamesData?.games ?? [])
    : (allGamesData?.games ?? []);
  const currentMeta = search ? searchGamesData?.meta : allGamesData?.meta;
  const isLoading = search ? loadingSearch : loadingAll;

  const genres = useMemo(() => {
    const genreSet = new Set<string>();
    displayedGames.forEach((game) => {
      game.genre?.forEach((g) => {
        if (g.name) {
          genreSet.add(g.name);
        }
      });
    });
    return Array.from(genreSet).sort();
  }, [displayedGames]);

  const filteredGames = useMemo(() => {
    if (selectedGenre === "All") return displayedGames;

    return displayedGames.filter((game) =>
      game.genre?.some((g) => g.name === selectedGenre),
    );
  }, [displayedGames, selectedGenre]);

  return (
    <div className="p-2 md:p-4">
      <div className="md:border rounded-[10px] md:bg-dark md:border-[#989fab1e] md:p-5">
        <div className="flex items-center gap-x-2 bg-dark md:bg-primary p-3 rounded-[15px]">
          <BiSearch className="text-white text-2xl" />
          <input
            className="w-full text-primary border-0 focus:outline-none"
            type="text"
            placeholder="Search for games"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button
            onClick={() => setSelectedGenre("All")}
            className={`sm:px-4 sm:py-2 px-2 py-1 rounded-full sm:text-sm text-xs font-semibold transition-colors ${
              selectedGenre === "All"
                ? "bg-(--color-lime) text-black"
                : "bg-(--color-lime)/5 text-(--color-lime) hover:bg-(--color-lime) hover:text-white"
            }`}
          >
            All
          </button>
          {genres.map((genreName) => (
            <button
              key={genreName}
              onClick={() => setSelectedGenre(genreName)}
              className={`sm:px-4 sm:py-2 px-2 py-1 rounded-full sm:text-sm text-xs font-semibold transition-colors ${
                selectedGenre === genreName
                  ? "bg-(--color-lime) text-black"
                  : "bg-(--color-lime)/5 text-color-lime hover:bg-(--color-lime) hover:text-white"
              }`}
            >
              {genreName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-6 gap-3 mt-5">
        {isLoading ? (
          <div className="col-span-full">
            <AppLoader label="Loading games..." />
          </div>
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

      {currentMeta && (
        <Pagination
          currentPage={currentMeta.page}
          totalPages={currentMeta.lastPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default GamesListScreen;
