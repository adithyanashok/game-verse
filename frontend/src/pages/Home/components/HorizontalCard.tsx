import React from "react";
import { dummy } from "../../../data";
import Button from "../../../components/common/Button";

const HorizontalCard = () => {
  return (
    <div className="flex gap-x-4 items-start shadow-md rounded-[8px]">
      <img
        className="card-image rounded-[10px] object-cover"
        src={dummy[0].image}
        alt=""
      />
      <div className="flex w-[290px] md:w-[550px] flex-col gap-y-1">
        <h1 className="text-[12px] md:text-2xl font-bold">{dummy[0].title}</h1>
        <h1 className="text-[10px] text-gray-500">{dummy[0].author}</h1>
        <Button
          label="Read Review"
          className="text-[11px] px-1 py-1 md:px-1 md:py-2 rounded-[10px] mt-2"
        />
      </div>
    </div>
  );
};

export default HorizontalCard;
