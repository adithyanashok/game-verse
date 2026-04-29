import React, { lazy, Suspense, useEffect, useState } from "react";
import controller from "../../../assets/images/controller-navbar.png";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { Link, useLocation } from "react-router-dom";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";

const UserDropdown = lazy(() => import("./DropDown"));

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Reviews", path: "/reviews", match: "review" },
  { label: "Games", path: "/games", match: "game" },
  { label: "Discussions", path: "/discussions", match: "discussion" },
];

const MobileNavbar: React.FC = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string, match?: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }

    return match
      ? location.pathname.includes(match)
      : location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(0,212,255,0.12)] bg-[#070b16]/92 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="flex h-[70px] items-center justify-between px-4">
        <button
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,212,255,0.14)] bg-[#0d1424] transition hover:bg-[rgba(0,212,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FiX className="h-5 w-5" />
          ) : (
            <FiMenu className="h-5 w-5" />
          )}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424]">
            <img
              className="h-9 w-9 object-contain"
              src={controller}
              alt="GameVera logo"
              width={36}
              height={36}
            />
          </div>
          <h1 className="hidden text-lg font-black tracking-tight sm:block">
            GameVera
          </h1>
        </Link>

        <div className="flex min-w-10 justify-end">
          {accessToken && (
            <Suspense
              fallback={
                <div className="h-10 w-10 rounded-full border border-[rgba(0,212,255,0.14)] bg-[#0d1424]" />
              }
            >
              <UserDropdown />
            </Suspense>
          )}
          {!accessToken && (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] px-3 py-2 text-xs font-bold text-white transition hover:bg-[rgba(0,212,255,0.1)]"
            >
              <FiLogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-[rgba(0,212,255,0.12)] transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => {
            const active = isActive(link.path, link.match);

            return !accessToken && link.label === "Discussions" ? null : (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block rounded-[8px] px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[var(--color-lime)] text-[#07101a]"
                      : "text-[#c4cad6] hover:bg-[rgba(0,212,255,0.1)] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;
