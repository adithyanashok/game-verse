import GameSection from "./Components/GameSection";
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
    </>
  );
};

export default GamesPage;
