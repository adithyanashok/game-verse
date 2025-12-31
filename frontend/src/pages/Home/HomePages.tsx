import { lazy, Suspense } from "react";
import Banner from "./components/Banner";
import "../../App.css";
import SectionWrapper from "./components/SectionWrapper";
import CallToAction from "./components/CallToAction";
import TrendingSection from "./components/TrendingSection";

const PopularGames = lazy(() => import("./components/PopularGames"));
const TopReviewers = lazy(() => import("./components/TopReviewers"));
const NewsLetter = lazy(() => import("./components/NewsLetter"));
const LatestReviews = lazy(() => import("./components/LatestReviews"));

function HomePage() {
  const LoaderStub = (
    <div className="h-40 w-full animate-pulse bg-white/5 rounded-lg" />
  );

  return (
    <div className="bg-[var(--color-primary)] min-h-screen">
      {/* Hero Banner Section */}
      <Banner />

      {/* Trending */}
      <TrendingSection />

      {/* Latest  */}
      <SectionWrapper title="Latest Review" subtitle="Hot Reviews Just Dropped">
        <Suspense fallback={LoaderStub}>
          <LatestReviews />
        </Suspense>
      </SectionWrapper>

      {/* Popular */}
      <SectionWrapper
        title="Popular Games"
        subtitle="Explore the most reviewed games"
      >
        <Suspense fallback={LoaderStub}>
          <PopularGames />
        </Suspense>
      </SectionWrapper>

      {/* Top Reviewers Section */}
      <SectionWrapper
        title="Top Reviewers"
        subtitle="Meet our most active community members"
      >
        <Suspense fallback={LoaderStub}>
          <TopReviewers />
        </Suspense>
      </SectionWrapper>

      {/* Call to Action Section */}
      <CallToAction />

      {/* Newsletter Section */}
      <Suspense fallback={LoaderStub}>
        <NewsLetter />
      </Suspense>

      {/* Bottom decorative gradient */}
      <div className="h-20 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
    </div>
  );
}

export default HomePage;
