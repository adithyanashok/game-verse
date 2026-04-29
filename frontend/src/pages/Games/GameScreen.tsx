import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import { getGame } from "../../features/games/gamesSlice";
import { getByGameId } from "../../features/reviews/reviewsSlice";
import ScreenLoader from "../../components/common/Loader";
import { isCacheFresh } from "../../utils/cache";
import Banner from "./Components/Banner";
import GameSnapshot from "./Components/GameSnapshot";
import OverallRating from "./Components/OverallRating";
import CommunityReviews from "./Components/CommunityReviews";

const GameScreen = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const gameId = Number(id);

  const {
    currentGame,
    currentGameId,
    currentGameFetchedAt,
    gameDetailsById,
    gameDetailsFetchedAtById,
    loading: gameLoading,
  } = useAppSelector((state: RootState) => state.game);

  const {
    gameReviews,
    gameReviewsByGameId,
    gameReviewsFetchedAtByGameId,
  } = useAppSelector((state: RootState) => state.reviews);

  const isInvalidId = !id || Number.isNaN(gameId);

  const cachedGame = isInvalidId ? null : (gameDetailsById[gameId] ?? null);
  const cachedGameFetchedAt = isInvalidId
    ? null
    : (gameDetailsFetchedAtById[gameId] ??
      (currentGameId === gameId ? currentGameFetchedAt : null));

  const displayedGame =
    currentGameId === gameId && currentGame ? currentGame : cachedGame;

  const displayedReviews = isInvalidId
    ? []
    : (gameReviewsByGameId[gameId] ??
      (gameReviews[0]?.gameId === gameId ? gameReviews : []));
  const cachedReviewsFetchedAt = isInvalidId
    ? null
    : (gameReviewsFetchedAtByGameId[gameId] ?? null);

  useEffect(() => {
    if (isInvalidId) return;

    const hasFreshGame = isCacheFresh(cachedGameFetchedAt);

    if (hasFreshGame) return;

    const request = dispatch(getGame(id));
    return () => {
      request.abort();
    };
  }, [isInvalidId, cachedGameFetchedAt, dispatch, id]);

  useEffect(() => {
    if (isInvalidId) return;

    const hasFreshReviews = isCacheFresh(cachedReviewsFetchedAt);

    if (hasFreshReviews) return;

    const request = dispatch(getByGameId({ id: gameId, limit: 20, page: 1 }));
    return () => {
      request.abort();
    };
  }, [cachedReviewsFetchedAt, dispatch, gameId, isInvalidId]);

  return (
    <>
      {gameLoading.getOne && !displayedGame && <ScreenLoader />}

      <main className="min-h-screen bg-[radial-gradient(circle_at_14%_0%,rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(182,255,59,0.08),transparent_22%),linear-gradient(180deg,#070b16_0%,#0c1322_48%,#070b16_100%)] px-3 py-5 sm:px-5 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/82 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur">
            <Banner game={displayedGame} showWriteButton />
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1.5fr)] lg:items-stretch">
            <GameSnapshot
              overallRating={displayedGame?.rating?.overallRating}
              releaseDate={displayedGame?.releaseDate}
              reviewCount={displayedReviews.length}
            />
            <OverallRating
              overallRating={displayedGame?.rating?.overallRating}
            />
          </section>

          <CommunityReviews displayedReviews={displayedReviews} />
        </div>
      </main>
    </>
  );
};

export default GameScreen;
