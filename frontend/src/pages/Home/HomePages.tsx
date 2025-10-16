import React from "react";
import controller from "../../assets/images/controller.png";
import { MdDehaze } from "react-icons/md";
import DesktopNavbar from "../../components/common/DesktopNavbar";
import MobileNavbar from "../../components/common/MobileNavbar";
import Button from "../../components/common/Button";
function HomePage() {
  return (
    <div className="bg-[var(--color-primary)]">
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      <div className="lg:block hidden">
        <DesktopNavbar />
      </div>
      <div className="p-10">
        <div className="relative rounded-2xl bg-[url('https://assets.xboxservices.com/assets/64/ea/64ea9f0e-6c8f-44f9-8866-429edbad9784.jpg?n=2626994_Poster-Image-1084_1920x1080_02.jpg')] bg-cover bg-center h-[700px] overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-[var(--color-primary)] opacity-60"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-10 space-y-5">
            <h1 className="text-5xl font-bold text-white leading-[1.3]">
              Explore the Universe of <br /> Gaming
            </h1>
            <p className="text-[18px] text-white max-w-xl">
              Dive into the latest game reviews, connect with fellow gamers and
              discover your next adventure.
            </p>

            <div className="flex gap-4">
              <Button
                label="Browse Games"
                size="lg"
                className="rounded-[14px]"
              />
              <Button
                label="Write a Review"
                size="lg"
                variant="secondary"
                className="rounded-[14px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
