import React from "react";
import { dummy } from "../../../data";

const Comment = () => {
  return (
    <div className="flex gap-4 px-5 items-center">
      <img
        className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full"
        src={dummy[0].image}
        alt=""
      />
      <div className="shadow-lg p-5 rounded-[12px]">
        <div className="flex justify-between">
          <p className="text-white font-semibold text-[12px] md:text-[15px] ">
            Ethen Harper
          </p>
          <p className="text-[#989fab] text-[11px] md:text-[13px]">1 day ago</p>
        </div>
        <p className="text-[#989fab] text-[11px] md:text-[13px] mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
    </div>
  );
};

export default Comment;
