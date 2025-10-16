import React from "react";
import controller from "../../assets/images/controller.png";

function DesktopNavbar() {
  return (
    <div className="flex justify-between items-center bg-[var(--color-primary)] text-white h-[100px]">
      <div className="flex items-center">
        <img src={controller} alt="Logo" width={100} height={80} />
        <h1 className="font-bold md:text-2xl text-[18px]">GameVerse</h1>
      </div>
      <div className="lg:block hidden">
        <ul className="flex md:gap-x-10 sm:gap-x-3  ">
          <li>Home</li>
          <li>Reviews</li>
          <li>Games</li>
          <li>Community</li>
        </ul>
      </div>
      <div className="hidden lg:flex  gap-x-2 mr-3">
        <div className="app-purple px-5 py-3 rounded-full">
          <p className="text-center font-semibold text-[14px]">Sign Up</p>
        </div>
        <div className="bg-[#22172e] px-5 py-3 rounded-full">
          <p className="text-center text-[var(--color-purple)] font-semibold text-[14px]">
            Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default DesktopNavbar;
