import React, { useEffect } from "react";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";
import Banner from "./Components/Banner";
import { dummy } from "../../data";
import GameReview from "./Components/Review";
import Footer from "../../components/common/footer/component/Footer";
import RatingStats from "./Components/ReviewStats";
import ReviewStats from "./Components/ReviewStats";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import { getGame } from "../../features/games/gamesSlice";
import { Link, useParams, useSearchParams } from "react-router";
import { getByGameId } from "../../features/reviews/reviewsSlice";
const Game = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currentGame, errors, loading } = useAppSelector(
    (state: RootState) => state.game
  );
  const { reviews } = useAppSelector((state: RootState) => state.reviews);
  useEffect(() => {
    if (id) {
      dispatch(getGame(id));
      dispatch(getByGameId({ id: Number(id), limit: 20, page: 1 }));
    }
  }, [dispatch, id]);
  return (
    <>
      <ResponsiveNavbar />
      <div className="py-10 px-2 sm:px-10 lg:px-10">
        <Banner game={currentGame} />
        {/* Rating Stats */}
        {currentGame?.rating.overallRating && <ReviewStats />}

        {/* Reviews */}
        <div className="mt-10">
          {reviews.length !== 0 && (
            <h1 className="text-[16px] text-purple font-bold text-2xl">
              Reviews
            </h1>
          )}
          {reviews.length === 0 && (
            <h1 className="text-[16px] text-purple font-bold text-2xl text-center">
              No Reviews Yet.
            </h1>
          )}
          {reviews.map((e) => {
            return (
              <Link to={`/review/${e.id}`}>
                <GameReview key={e.id} review={e} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Game;
