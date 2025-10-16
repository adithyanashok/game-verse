import React from "react";
import controller from "../../assets/images/controller.png";
import { MdDehaze } from "react-icons/md";
import DesktopNavbar from "../../components/common/DesktopNavbar";
import MobileNavbar from "../../components/common/MobileNavbar";
function HomePage() {
  return (
    <>
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      <div className="lg:block hidden">
        <DesktopNavbar />
      </div>
    </>
  );
}

export default HomePage;
