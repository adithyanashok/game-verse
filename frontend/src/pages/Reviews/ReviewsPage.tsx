import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import DropDown from "../../components/DropDown/DropDown";
import Dropdown from "../../components/DropDown/DropDown";
import { dummy } from "../../data";
import MobileNavbar from "../../components/common/Navbar/MobileNavbar";
import DesktopNavbar from "../../components/common/Navbar/DesktopNavbar";
import Footer from "../../components/common/footer/component/Footer";
import ReviewSection from "./Components/ReviewSection";
import TrendingGenres from "./Components/TrendingGenres";
import TopReviewers from "./Components/TopReviewers";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";

const ReviewsPage = () => {
  return (
    <>
      <ResponsiveNavbar />
      {/* Review Screen */}
      <div className="md:flex  bg-primary ">
        {/* Review Section */}
        <ReviewSection />

        {/* Divider */}
        <div className="vertical-line"></div>

        {/* Trending Genre & Top Reviewers */}
        <div className=" px-6 p-10">
          {/* Trending Genres */}
          <TrendingGenres />
          {/* Top Reviewers */}
          <TopReviewers />
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
