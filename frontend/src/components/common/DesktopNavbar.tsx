import React from "react";
import controller from "../../assets/images/controller.png";
import { Link } from "react-router";
import MobileNavbar from "./MobileNavbar";

function DesktopNavbar() {
  return (
    <>
      <div className="flex justify-between bg-primary items-center primary text-primary h-[80px]">
        <div className="flex items-center">
          <img src={controller} alt="Logo" width={80} height={60} />
          <h1 className="font-bold md:text-[22px] text-[18px]">GameVerse</h1>
        </div>
        <div className="lg:block hidden">
          <ul className="flex md:gap-x-10 sm:gap-x-3 font-light">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <Link to={"/reviews"}>Reviews</Link>
            </li>
            <li>Games</li>
            <li>Community</li>
          </ul>
        </div>
        <div className="hidden lg:flex  gap-x-2 mr-3">
          <div className=" bg-dark-purple px-5 py-1 rounded-full">
            <p className="text-center text-purple font-semibold text-[14px]">
              Sign Up
            </p>
          </div>
          <div className="primary border-2 border-[var(--color-purple)] px-5 py-1 rounded-full">
            <p className="text-center text-purple font-semibold text-[14px]">
              Login
            </p>
          </div>
        </div>
      </div>
      <hr
        style={{
          background: "#989fab",
          border: "none",
          height: "0.5px",
        }}
      />
    </>
  );
}

export default DesktopNavbar;
