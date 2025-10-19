import React, { useState } from "react";
import { dummy } from "../../../data";
import DropDown from "../../../components/DropDown/DropDown";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router";
import GameCard from "./GameCard";

const GameSection = () => {
  const [genre, setGenre] = useState("option1");

  return (
    <div className="md:w-[95%] p-2 md:p-10">
      <div className=" md:border-1 rounded-[10px] md:bg-dark md:border-[#656575] md:p-5">
        <div className="flex items-center gap-x-2 bg-dark md:bg-primary  p-3 rounded-[15px]">
          <BiSearch className="text-white text-2xl" />
          <input
            className="w-[100%] text-primary border-0 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
            type="text"
            placeholder="Search for games or games"
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
        {dummy.map((game) => {
          return (
            <Link key={game.id} to={`/games/${game.id}`}>
              <GameCard />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GameSection;
