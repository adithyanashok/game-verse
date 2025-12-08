import React, { useState } from "react";
import { MdDehaze } from "react-icons/md";
import controller from "../../../assets/images/controller.png";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { dummy } from "../../../data";
import UserDropdown from "./DropDown";

const navLinks = ["Home", "Reviews", "Games", "Community"];

const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const { accessToken } = useAppSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-[var(--color-primary)] text-white">
      {/* Header */}
      <div className="flex justify-between items-center h-[70px] px-5">
        {/* Menu Icon */}
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] rounded-md"
          aria-label="Toggle menu"
        >
          <MdDehaze className="w-6 h-6" />
        </button>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img className="w-[38px]" src={controller} alt="GameVerse logo" />
          <h1 className="font-bold hidden sm:block md:text-[15px] text-[18px]">
            GameVerse
          </h1>
        </div>

        {accessToken && (
          <UserDropdown userImage={dummy[0].image} userName="Adithyan" />
        )}
        {/* Login Button */}
        {!accessToken && (
          <div className="primary border-2 border-white px-3 py-1 rounded-full">
            <p className="text-center text-white font-semibold text-[12px]">
              Login
            </p>
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="p-5 flex flex-col gap-y-4 border-t border-white/10">
          {navLinks.map((link) => (
            <li
              key={link}
              className="text-sm font-medium hover:text-[var(--color-purple)] cursor-pointer transition-colors duration-150"
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;
