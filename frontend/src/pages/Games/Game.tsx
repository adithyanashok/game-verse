import React from "react";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";
import Banner from "./Components/Banner";
import { dummy } from "../../data";
import GameReview from "./Components/Review";
import Footer from "../../components/common/footer/component/Footer";
import RatingStats from "./Components/ReviewStats";
import ReviewStats from "./Components/ReviewStats";
const Game = () => {
  return (
    <>
      <ResponsiveNavbar />
      <div className="py-10 px-2 sm:px-10 lg:px-10">
        <Banner />
        {/* Rating Stats */}
        <ReviewStats />

        {/* Reviews */}
        <div className="mt-10">
          <h1 className="text-[16px] text-purple font-bold text-2xl">
            Reviews
          </h1>
          {dummy.map((e) => {
            return <GameReview key={e.id} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Game;
