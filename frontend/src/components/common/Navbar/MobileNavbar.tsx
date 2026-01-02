import React, { useEffect, useState } from "react";
import { MdDehaze } from "react-icons/md";
import controller from "../../../assets/images/controller.png";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import UserDropdown from "./DropDown";
import { Link, useLocation } from "react-router-dom";

const navLinks = ["Home", "Reviews", "Games", "Discussions"];

const MobileNavbar: React.FC = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-dark text-white">
      {/* Header */}
      <div className="flex justify-between items-center h-[70px] px-3">
        {/* Menu Icon */}
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-purple)] rounded-md"
          aria-label="Toggle menu"
        >
          <MdDehaze className="w-5 h-5" />
        </button>
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img className="w-[38px]" src={controller} alt="GameVera logo" />
            <h1 className="font-bold hidden sm:block md:text-[15px] text-[18px]">
              GameVera
            </h1>
          </div>
        </Link>

        {accessToken && <UserDropdown />}
        {/* Login Button */}
        {!accessToken && (
          <Link to={"/login"}>
            <div className="primary border-1 border-white px-3 py-1 rounded-full">
              <p className="text-center text-white font-semibold text-[12px]">
                Login
              </p>
            </div>
          </Link>
        )}
      </div>

      {/* Dropdown Menu */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="p-5 flex flex-col gap-y-4 border-t border-white/10">
          {navLinks.map((link) => {
            return !accessToken && link === "Discussions" ? null : (
              <li
                key={link}
                className="text-sm font-medium hover:text-[var(--color-purple)] cursor-pointer transition-colors duration-150"
              >
                <Link to={"/" + link.toLowerCase()}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;
