import DesktopNavbar from "../../components/common/Navbar/DesktopNavbar";
import MobileNavbar from "../../components/common/Navbar/MobileNavbar";
import Banner from "./components/Banner";
import "../../App.css";
import Trending from "./components/Trending";
import PopularGames from "./components/PopularGames";
import TopReviewers from "./components/TopReviewers";
import RecentReviews from "./components/RecentReviews";
import NewsLetter from "./components/NewsLetter";
import Footer from "../../components/common/footer/component/Footer";
function HomePage() {
  return (
    <div className="bg-[var(--color-primary)]">
      {/* Navbar Mobile */}
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      {/* Navbar Desktop */}
      <div className="lg:block hidden">
        <DesktopNavbar />
      </div>
      {/* Banner */}
      <Banner />

      {/* Trending Section */}
      <Trending />

      {/* Popular Games */}
      <PopularGames />

      {/* Top Reviewers */}
      <TopReviewers />

      {/* Recent Reviews */}
      <RecentReviews />

      {/* News Letter Section */}
      <NewsLetter />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
