import { useEffect } from "react";
import Banner from "./Components/Banner";
import GameReview from "./Components/Review";
import ReviewStats from "./Components/ReviewStats";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import { getGame } from "../../features/games/gamesSlice";
import { Link, useParams } from "react-router-dom";
import { getByGameId } from "../../features/reviews/reviewsSlice";
import ScreenLoader from "../../components/common/Loader";
const Game = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currentGame, loading: gameLoading } = useAppSelector(
    (state: RootState) => state.game
  );
  const { gameReviews, loading: reviewLoading } = useAppSelector(
    (state: RootState) => state.reviews
  );
  useEffect(() => {
    if (id) {
      dispatch(getGame(id));
      dispatch(getByGameId({ id: Number(id), limit: 20, page: 1 }));
    }
  }, [dispatch, id]);

  return (
    <>
      {gameLoading.getOne && <ScreenLoader />}
      <div className="md:py-10 md:px-10 sm:px-10 lg:px-10">
        <Banner game={currentGame} showWriteButton={true} />
        {/* Rating Stats */}
        {currentGame?.rating.overallRating && <ReviewStats />}
        {currentGame?.overview && (
          <div className="bg-dark p-5 justify-center items-center gap-6 rounded-2xl mt-10 text-white">
            <h1 className="font-bold">AI Overview</h1>
            <p>{currentGame?.overview?.overview?.replace(/\*\s?/g, "")}</p>
          </div>
        )}

        {/* Reviews */}
        <div className="px-2">
          {reviewLoading.fetchByGame ? (
            <ScreenLoader />
          ) : (
            <div className="mt-10">
              {gameReviews.length !== 0 && (
                <h1 className="text-[16px] text-purple font-bold text-2xl">
                  Reviews
                </h1>
              )}
              {gameReviews.length === 0 && (
                <h1 className="text-[16px] text-purple font-bold text-2xl text-center">
                  No Reviews Yet.
                </h1>
              )}
              {gameReviews.map((e) => {
                return (
                  <Link to={`/review/${e.id}`}>
                    <GameReview key={e.id} review={e} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
