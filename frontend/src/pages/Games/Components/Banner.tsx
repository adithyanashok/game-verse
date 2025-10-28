import React from "react";
import Button from "../../../components/common/Button";

const Banner = () => {
  return (
    <div className="relative rounded-2xl bg-[url('https://assets.xboxservices.com/assets/64/ea/64ea9f0e-6c8f-44f9-8866-429edbad9784.jpg?n=2626994_Poster-Image-1084_1920x1080_02.jpg')] bg-cover bg-center h-[200px] md:h-[450px] lg:h-[350px] overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end  h-full px-10 space-y-1 pb-10">
        <h1 className="text-[15px] md:text-3xl xl:text-5xl font-bold text-white leading-[1.3]">
          Call Of Duty: The Winter
        </h1>
        <p className="text-[10px] md:text-[14px] text-[#989fab] max-w-xl">
          Released Dec 10, 2020 · Action RPG · Mature
        </p>
        <div className="flex flex-col items-start lg:flex-row justify-between">
          <p className="text-[8px] md:text-[14px] text-[#c3c7ce] max-w-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <Button
            label="Write Review"
            variant="primary"
            className="md:p-3 p-2 text-[8px] md:text-[12px] rounded-[5px] bg-purple mt-2 md:mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
