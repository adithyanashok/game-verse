import { useEffect } from "react";
import CustomCard from "../../../components/common/ScrollableRow";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { getTopRatedGames } from "../../../features/games/gamesSlice";
import { Link } from "react-router";

const PopularGames = () => {
  const dispatch = useAppDispatch();
  const { topRatedGames, loading, errors } = useAppSelector(
    (state: RootState) => state.game
  );

  // Fetch trending reviews once on mount
  useEffect(() => {
    dispatch(getTopRatedGames());
  }, [dispatch]);

  // Handle loading and error states
  if (loading.getTopRatedGames) {
    return <div className="text-center py-4 text-gray-400">Loading...</div>;
  }

  if (errors.getTopRatedGames) {
    return (
      <div className="text-center py-4 text-red-500">
        {errors.getTopRatedGames}
      </div>
    );
  }
  return (
    <div className="scroll-row">
      {topRatedGames.map((game) => {
        return (
          <Link to={`/games/${game.id}`}>
            <CustomCard
              key={game.id}
              subtitle={game.description}
              image={<img className="card-image" src={game.imgUrl} alt="" />}
              title={game.name}
              showSubtitle={false}
              rating={game.rating?.overallRating}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default PopularGames;
