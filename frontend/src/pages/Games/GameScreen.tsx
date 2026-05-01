import { useParams } from "react-router-dom";
import ScreenLoader from "../../components/common/Loader";

import Banner from "./Components/Banner";
import GameSnapshot from "./Components/GameSnapshot";
import OverallRating from "./Components/OverallRating";
import CommunityReviews from "./Components/CommunityReviews";

import { useGameData } from "./hooks/useGameData";

const GameScreen = () => {
  const { id } = useParams();
  const gameId = id ? Number(id) : null;

  const { game, reviews, totalReviews, isLoading, error } = useGameData(gameId);

  if (!gameId) return null;
  if (isLoading) return <ScreenLoader />;
  if (error) return <div>Error loading game</div>;
  if (!game) return null;

  console.log(game);
  console.log(reviews);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_14%_0%,rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(182,255,59,0.08),transparent_22%),linear-gradient(180deg,#070b16_0%,#0c1322_48%,#070b16_100%)] px-3 py-5 sm:px-5 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Banner */}
        <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/82 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur">
          <Banner game={game ?? null} showWriteButton />
        </section>

        {/* Snapshot + Rating */}
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1.5fr)] lg:items-stretch">
          <GameSnapshot
            overallRating={game?.rating?.overallRating}
            releaseDate={game?.releaseDate}
            reviewCount={totalReviews}
          />
          <OverallRating
            overallRating={game?.rating?.overallRating}
            currentGame={game}
          />
        </section>

        {/* Reviews */}
        <CommunityReviews displayedReviews={reviews} />
      </div>
    </main>
  );
};

export default GameScreen;
