import React from "react";
import GameSection from "./Components/GameSection";
import Footer from "../../components/common/footer/component/Footer";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";

const GamesPage = () => {
  return (
    <>
      <ResponsiveNavbar />
      {/* Game ScreenGame */}
      <div className="md:flex  bg-primary ">
        {/* Game Section */}
        <GameSection />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default GamesPage;
