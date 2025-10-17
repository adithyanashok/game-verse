import React from "react";
import Button from "../../../components/common/Button";

const Banner = () => {
  return (
    <div className="">
      <div className="relative rounded-2xl bg-[url('https://assets.xboxservices.com/assets/64/ea/64ea9f0e-6c8f-44f9-8866-429edbad9784.jpg?n=2626994_Poster-Image-1084_1920x1080_02.jpg')] bg-cover bg-center h-[200px] md:h-[450px] lg:h-[700px] overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-10 space-y-3 md:space-y-5">
          <h1 className="text-[15px] md:text-5xl font-bold text-white leading-[1.3]">
            Explore the Universe of <br /> Gaming
          </h1>
          <p className="text-[11px] md:text-[18px] text-white max-w-xl">
            Dive into the latest game reviews, connect with fellow gamers and
            discover your next adventure.
          </p>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <Button
              label="Browse Games"
              className="rounded-[14px] px-5 py-1.5 text-[10px] md:px-8 md:py-3 md:text-[12px]"
            />
            <Button
              label="Write a Review"
              size="lg"
              variant="secondary"
              className="rounded-[14px] px-5 py-1.5 text-[10px] md:px-8 md:py-3 md:text-[12px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
