import { FiAlertCircle } from "react-icons/fi";
import Banner from "./components/Banner";
import "../../App.css";
import SectionWrapper from "./components/SectionWrapper";
import CallToAction from "./components/CallToAction";
import TrendingSection from "./components/TrendingSection";
import PopularGames from "./components/PopularGames";
import TopReviewers from "./components/TopReviewers";
import NewsLetter from "./components/NewsLetter";
import LatestReviews from "./components/LatestReviews";
import { useAppSelector } from "../../store/hooks";

function HomePage() {
  const trendingError = useAppSelector(
    (state) => state.reviews.errors.trending,
  );
  const recentError = useAppSelector((state) => state.reviews.errors.recent);
  const gameError = useAppSelector(
    (state) => state.game.errors.getTopRatedGames,
  );
  const reviewerError = useAppSelector((state) => state.user.error);

  const activeErrors = [
    trendingError ? "Trending Reviews" : null,
    recentError ? "Latest Reviews" : null,
    gameError ? "Popular Games" : null,
    reviewerError ? "Top Reviewers" : null,
  ].filter(Boolean) as string[];

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.18),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(182,255,59,0.1),transparent_28%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)]">
      <Banner />

      <div className="relative z-10 -mt-8">
        {activeErrors.length > 0 ? (
          <div className="mx-auto mb-4 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[10px] border border-amber-400/20 bg-[linear-gradient(180deg,rgba(245,158,11,0.12),rgba(13,20,36,0.92))] px-5 py-4 shadow-xl shadow-black/10">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                  <FiAlertCircle className="h-4.5 w-4.5 text-amber-200" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200">
                    Partial outage
                  </p>
                  <h2 className="mt-1 text-lg font-black text-white">
                    Some homepage sections could not be loaded
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#d7deea]">
                    Available sections are still visible. Right now this
                    affects: {activeErrors.join(", ")}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <TrendingSection />

        <SectionWrapper
          title="Latest Reviews"
          subtitle="Fresh takes from players across the community"
        >
          <LatestReviews />
        </SectionWrapper>

        <SectionWrapper
          title="Popular Games"
          subtitle="Highly rated titles people keep coming back to"
        >
          <PopularGames />
        </SectionWrapper>

        <SectionWrapper
          title="Top Reviewers"
          subtitle="Players shaping the conversation this week"
        >
          <TopReviewers />
        </SectionWrapper>

        <CallToAction />

        <NewsLetter />
      </div>
    </main>
  );
}

export default HomePage;
