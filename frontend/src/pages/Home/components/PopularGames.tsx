import { Link } from "react-router-dom";
import { AppLoader } from "../../../components/common/Loader";
import HomeSectionState from "./HomeSectionState";
import { useTopRatedGames } from "../../../pages/Games/hooks/useGameQueries";

const PopularGames = () => {
  const { data: topRatedGames = [], isLoading, error } = useTopRatedGames();

  if (isLoading) {
    return <AppLoader label="Loading popular games..." />;
  }

  if (error) {
    return (
      <HomeSectionState
        title="Popular games are unavailable"
        message={error instanceof Error ? error.message : "Failed to fetch top rated games"}
      />
    );
  }
  return (
    <div className="scroll-row px-4 py-4 sm:px-6 lg:px-8">
      {topRatedGames.map((game) => {
        return (
          <Link to={`/games/${game.id}`} key={game.id}>
            <div className="w-[220px] overflow-hidden rounded-[8px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/80 p-2 transition duration-300 hover:-translate-y-1 hover:border-[rgba(0,212,255,0.36)] hover:bg-[#121a2c]">
              <img
                className="h-[118px] w-full rounded-[6px] object-cover"
                src={game.imgUrl}
                alt={game.name || "Popular game"}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PopularGames;
