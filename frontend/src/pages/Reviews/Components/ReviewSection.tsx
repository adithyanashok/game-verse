import React, { useState } from "react";
import { dummy } from "../../../data";
import DropDown from "../../../components/DropDown/DropDown";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router";

const ReviewSection = () => {
  const [genre, setGenre] = useState("option1");

  return (
    <div className="md:w-[95%] p-2 md:p-10">
      <div className=" md:border-1 rounded-[8px] md:bg-dark md:border-[#989fab1e] md:p-5">
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
            <Link key={review.id} to={`/reviews/${review.id}`}>
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSection;
