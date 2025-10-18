import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import DropDown from "../../components/DropDown/DropDown";
import Dropdown from "../../components/DropDown/DropDown";
import { dummy } from "../../data";
import MobileNavbar from "../../components/common/MobileNavbar";
import DesktopNavbar from "../../components/common/DesktopNavbar";
import Footer from "../../components/common/footer/component/Footer";

const ReviewsPage = () => {
  const [genre, setGenre] = useState("option1");
  return (
    <>
      {/* Navbar Mobile */}
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      {/* Navbar Desktop */}
      <div className="lg:block hidden">
        <DesktopNavbar />
      </div>
      <div className="md:flex  bg-primary ">
        <div className="md:w-[95%] p-2 md:p-10">
          <div className=" md:border-1 rounded-[10px] md:bg-dark md:border-[#656575] md:p-5">
            <div className="flex items-center gap-x-2 bg-dark md:bg-primary  p-3 rounded-[15px]">
              <BiSearch className="text-white text-2xl" />
              <input
                className="w-[100%] text-primary border-0 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                type="text"
                placeholder="Search for games or reviews"
              />
            </div>
            <div className="flex scroll-row gap-x-3.5">
              {/* <label htmlFor="my-dropdown">Choose an option:</label> */}
              <DropDown selectedValue={genre} onChange={setGenre} />{" "}
              <DropDown selectedValue={genre} onChange={setGenre} />{" "}
              <DropDown selectedValue={genre} onChange={setGenre} />{" "}
              <DropDown selectedValue={genre} onChange={setGenre} />{" "}
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-10">
            {dummy.map((review) => {
              return (
                <div className="bg-dark rounded-t-2xl rounded-b-2xl">
                  <img
                    className="lg:w-[250px] lg:h-[140px] rounded-t-2xl"
                    src={dummy[0].image}
                    alt=""
                  />
                  <div className="ml-3 pb-5 mt-2">
                    <h1 className="text-white font-bold text-[20px]">
                      {dummy[0].title}
                    </h1>
                    <h1 className="text-[var(--color-purple)] text-[12px]">
                      {dummy[0].author}
                    </h1>
                    <div className="flex gap-x-3 mt-4">
                      <p className="bg-dark-purple py-0.5 px-1.5 text-[var(--color-purple)] rounded-full text-[12px]">
                        Adventure
                      </p>
                      <p className="bg-dark-purple py-0.5 px-1.5 text-[var(--color-purple)] rounded-full text-[12px]">
                        Adventure
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className=" px-6 p-10">
          <h1 className="text-white font-bold text-[20px]">Trending Genres</h1>
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-3">
            {dummy.map((review) => {
              return (
                <p className="bg-dark-purple py-1.5 px-2 text-[var(--color-purple)] rounded-full text-[12px] font-bold">
                  Adventure
                </p>
              );
            })}
          </div>
          <h1 className="text-white font-bold text-[20px]">Top Reviewers</h1>
          <div className="flex flex-col gap-x-2 gap-y-2 mt-3">
            {dummy.map((review) => {
              return (
                <div className="flex gap-4 items-center mt-2">
                  <img
                    src={review.image}
                    className="w-[60px] h-[60px] rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="text-white font-bold text-1xl">
                      {review.author}
                    </p>
                    <p className="text-gray-700 text-[14px]">140 reviews</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default ReviewsPage;
