import DesktopNavbar from "../../components/common/Navbar/DesktopNavbar";
import MobileNavbar from "../../components/common/Navbar/MobileNavbar";
import Banner from "./components/Banner";
import "../../App.css";
import Trending from "./components/Trending";
import PopularGames from "./components/PopularGames";
import TopReviewers from "./components/TopReviewers";
import RecentReviews from "./components/RecentReviews";
import NewsLetter from "./components/NewsLetter";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--color-primary)] min-h-screen">
      {/* Navbar Mobile */}
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      {/* Navbar Desktop */}
      <div className="lg:block hidden">
        <DesktopNavbar />
      </div>

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden">
        <Banner />
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-primary)] to-transparent pointer-events-none" />
      </div>

      {/* Trending Section with enhanced styling */}
      <div className="relative px-5 md:px-10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Trending Reviews
              </h2>
              <p className="text-[#989fab] text-sm md:text-base">
                Discover what the community is talking about
              </p>
            </div>
            <button
              onClick={() => navigate("/reviews")}
              className="hidden md:block px-6 py-2.5 rounded-full bg-[var(--color-purple)] text-white text-sm font-semibold hover:bg-[#7c1dd1] transition-all duration-200"
            >
              View All
            </button>
          </div>
          <Trending />
        </div>
      </div>

      {/* Popular Games Section */}
      <div className="relative px-5 md:px-10 py-8 md:py-12 bg-gradient-to-b from-transparent to-[#140c1b]/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Popular Games
              </h2>
              <p className="text-[#989fab] text-sm md:text-base">
                Explore the most reviewed games
              </p>
            </div>
            <button
              onClick={() => navigate("/games")}
              className="hidden md:block px-6 py-2.5 rounded-full bg-[var(--color-purple)] text-white text-sm font-semibold hover:bg-[#7c1dd1] transition-all duration-200"
            >
              Browse All
            </button>
          </div>
          <PopularGames />
        </div>
      </div>

      {/* Top Reviewers Section */}
      <div className="relative px-5 md:px-10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Top Reviewers
              </h2>
              <p className="text-[#989fab] text-sm md:text-base">
                Meet our most active community members
              </p>
            </div>
          </div>
          <TopReviewers />
        </div>
      </div>

      {/* Recent Reviews Section */}
      <div className="relative px-5 md:px-10 py-8 md:py-12 bg-gradient-to-b from-transparent to-[#140c1b]/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Recent Reviews
              </h2>
              <p className="text-[#989fab] text-sm md:text-base">
                Latest insights from our community
              </p>
            </div>
            <button
              onClick={() => navigate("/reviews")}
              className="hidden md:block px-6 py-2.5 rounded-full border-2 border-[var(--color-purple)] text-[var(--color-purple)] text-sm font-semibold hover:bg-[var(--color-purple)] hover:text-white transition-all duration-200"
            >
              See More
            </button>
          </div>
          <RecentReviews />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative px-5 md:px-10 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#6711bf]/20 via-[#155dfc]/10 to-[#6711bf]/20 border border-[#6711bf]/30 p-8 md:p-12 text-center overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-purple)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-blue)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to Share Your Gaming Experience?
              </h2>
              <p className="text-[#989fab] text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of gamers sharing their thoughts, ratings, and
                insights about the games they love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/reviews/create")}
                  className="px-8 py-3.5 rounded-full bg-[var(--color-purple)] text-white font-semibold hover:bg-[#7c1dd1] transition-all duration-200 shadow-lg shadow-[var(--color-purple)]/30"
                >
                  Write a Review
                </button>
                <button
                  onClick={() => navigate("/games")}
                  className="px-8 py-3.5 rounded-full border-2 border-[var(--color-blue)] text-[var(--color-blue)] font-semibold hover:bg-[var(--color-blue)] hover:text-white transition-all duration-200"
                >
                  Explore Games
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative px-5 md:px-10 py-12 md:py-16">
        <NewsLetter />
      </div>

      {/* Bottom decorative gradient */}
      <div className="h-20 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
    </div>
  );
}

export default HomePage;
