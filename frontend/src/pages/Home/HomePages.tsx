import Banner from "./components/Banner";
import "../../App.css";
import SectionWrapper from "./components/SectionWrapper";
import CallToAction from "./components/CallToAction";
import TrendingSection from "./components/TrendingSection";
import PopularGames from "./components/PopularGames";
import TopReviewers from "./components/TopReviewers";
import NewsLetter from "./components/NewsLetter";
import LatestReviews from "./components/LatestReviews";
function HomePage() {

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.18),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(182,255,59,0.1),transparent_28%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)]">
      <Banner />

      <div className="relative z-10 -mt-8">
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
