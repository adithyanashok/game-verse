import React from "react";
import { dummy } from "../../../data";

const GameCard = () => {
  return (
    <div className="bg-dark rounded-t-2xl rounded-b-2xl">
      <img
        className="lg:w-[250px] lg:h-[140px] rounded-t-2xl"
        src={dummy[0].image}
        alt=""
      />
      <div className="ml-3 pb-5 mt-2">
        <h1 className="text-white font-bold text-[20px]">{dummy[0].title}</h1>
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
};

export default GameCard;
