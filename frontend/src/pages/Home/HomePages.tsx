import React from "react";
import controller from "../../assets/images/controller.png";
import { MdDehaze } from "react-icons/md";
import DesktopNavbar from "../../components/common/DesktopNavbar";
import MobileNavbar from "../../components/common/MobileNavbar";
import Button from "../../components/common/Button";
import Banner from "./components/Banner";
import { dummy } from "../../data";
import "../../App.css";
import CustomCard from "../../components/common/ScrollableRow";
function HomePage() {
  return (
    <div className="bg-[var(--color-primary)] p-5 md:p-10">
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
      <div className="text-white">
        <h1 className="font-bold md:text-2xl">Trending Reviews</h1>
        <div className="scroll-row">
          {dummy.map((review) => {
            return (
              <CustomCard
                key={review.id}
                subtitle={"By " + review.author}
                image={
                  <img
                    className="w-[250px] h-[150px] rounded-[10px]"
                    src={review.image}
                    alt=""
                  />
                }
                title={review.title}
                showSubtitle={true}
              />
            );
          })}
        </div>
      </div>

      {/* Popular Games */}
      <div className="text-white">
        <h1 className="font-bold md:text-2xl">Latest Reviews</h1>
        <div className="scroll-row">
          {dummy.map((review) => {
            return (
              <CustomCard
                key={review.id}
                subtitle={review.author}
                image={
                  <img
                    className="w-[250px] h-[150px] rounded-[10px]"
                    src={review.image}
                    alt=""
                  />
                }
                title={review.title}
                showSubtitle={true}
              />
            );
          })}
        </div>
      </div>

      {/* Top Reviewers */}
      <div className="text-white">
        <h1 className="font-bold md:text-2xl">Top Reviewers</h1>
        <div className="scroll-row">
          {dummy.map((review) => {
            return (
              <CustomCard
                key={review.id}
                subtitle={review.author}
                image={
                  <img
                    className="w-[100px] h-[100px] rounded-full object-cover"
                    src={review.image}
                    alt=""
                  />
                }
                title={review.author}
                showSubtitle={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
