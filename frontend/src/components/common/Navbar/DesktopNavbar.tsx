import { lazy, Suspense } from "react";
import controller from "../../../assets/images/controller-navbar.png";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const UserDropdown = lazy(() => import("./DropDown"));

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Reviews", path: "/reviews", match: "review" },
  { label: "Games", path: "/games", match: "game" },
  { label: "Discussions", path: "/discussions", match: "discussion" },
];

function DesktopNavbar() {
  const location = useLocation();
  const activePath = location.pathname;

  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  const isActive = (path: string, match?: string) => {
    if (path === "/") {
      return activePath === "/" || activePath === "/home";
    }

    return match ? activePath.includes(match) : activePath === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,212,255,0.12)] bg-[#070b16]/88 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424] transition group-hover:border-[rgba(0,212,255,0.36)] group-hover:bg-[#121a2c]">
            <img
              src={controller}
              alt="GameVera logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">GameVera</h1>
            <p className="text-xs font-medium text-[#9da7ba]">
              Reviews that play fair
            </p>
          </div>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-1 rounded-full border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/80 p-1">
            {navLinks.map((link) => {
              const active = isActive(link.path, link.match);

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[var(--color-lime)] text-[#07101a] shadow-sm shadow-[rgba(182,255,59,0.18)]"
                        : "text-[#c4cad6] hover:bg-[rgba(0,212,255,0.1)] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex min-w-[168px] justify-end">
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
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] px-4 py-2 text-sm font-bold text-white transition hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.1)]"
              >
                <FiLogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-lime)] px-4 py-2 text-sm font-bold text-[#07101a] transition hover:-translate-y-0.5 hover:bg-[#ccff6f]"
              >
                <FiUserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DesktopNavbar;
