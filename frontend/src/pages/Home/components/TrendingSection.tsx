import Trending from "./Trending";
import { useTrendingReviews } from "../../../pages/Reviews/hooks/useReviewQueries";
import { AppLoader } from "../../../components/common/Loader";
import HomeSectionState from "./HomeSectionState";

const TrendingSection = () => {
  const { data: trending, isLoading: loading, error } = useTrendingReviews();

  if (loading) {
    return <AppLoader label="Loading trending reviews..." />;
  }

  if (error) {
    return (
      <section
        id="features"
        className="px-4 py-8 mt-10 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl border border-[rgba(0,212,255,0.14)] bg-[#0d1424]/90 py-8 shadow-2xl shadow-black/20 backdrop-blur sm:rounded-[40px]">
          <div className="mb-6 px-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-lime)]">
              Live pulse
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
              Trending Reviews
            </h2>
            <p className="mt-2 text-sm text-[#aeb7c8] md:text-base">
              Discover what the community is talking about right now
            </p>
          </div>
          <HomeSectionState
            title="Trending reviews are unavailable"
            message={error instanceof Error ? error.message : "We couldn't load the trending feed right now."}
          />
        </div>
      </section>
    );
  }

  if (!trending || trending.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400">
        No trending reviews found.
      </div>
    );
  }
  return (
    <section
      id="features"
      className="px-4 py-8 mt-10 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl border border-[rgba(0,212,255,0.14)] bg-[#0d1424]/90 py-8 shadow-2xl shadow-black/20 backdrop-blur sm:rounded-[40px]">
        <div className="mb-6 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-lime)]">
            Live pulse
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
            Trending Reviews
          </h2>
          <p className="mt-2 text-sm text-[#aeb7c8] md:text-base">
            Discover what the community is talking about right now
          </p>
        </div>

        <Trending trending={trending} />
      </div>
    </section>
  );
};

export default TrendingSection;
