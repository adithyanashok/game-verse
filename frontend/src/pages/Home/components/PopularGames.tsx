import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { getTopRatedGames } from "../../../features/games/gamesSlice";
import { Link } from "react-router-dom";
import { Spinner } from "../../../components/common/Loader";

const PopularGames = () => {
  const dispatch = useAppDispatch();
  const { topRatedGames, loading, errors } = useAppSelector(
    (state: RootState) => state.game
  );

  useEffect(() => {
    if (!topRatedGames || topRatedGames.length === 0) {
      dispatch(getTopRatedGames());
    }
  }, [dispatch, topRatedGames]);

  if (loading.getTopRatedGames) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    );
  }

  if (errors.getTopRatedGames) {
    return (
      <div className="text-center py-4 text-red-500">
        {errors.getTopRatedGames}
      </div>
    );
  }
  return (
    <div className="scroll-row py-4 px-4">
      {topRatedGames.map((game) => {
        return (
          <Link to={`/games/${game.id}`} key={game.id}>
            <div className="w-[200px] transform hover:scale-105 transition duration-300">
              <img
                className="object-cover w-[200px] h-[100px] rounded-[10px]"
                src={game.imgUrl}
                alt=""
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PopularGames;
