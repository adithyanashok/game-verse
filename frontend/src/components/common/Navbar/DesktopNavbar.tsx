import controller from "../../../assets/images/controller.png";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { dummy } from "../../../data";

function DesktopNavbar() {
  const location = useLocation();
  const activePath = location.pathname;

  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="flex justify-between bg-primary items-center primary text-primary h-[80px]">
        <div className="flex items-center">
          <img src={controller} alt="Logo" width={80} height={60} />
          <h1 className="font-bold md:text-[22px] text-[18px]">GameVerse</h1>
        </div>
        <div className="lg:block hidden">
          <ul className="flex md:gap-x-10 sm:gap-x-3 font-light">
            <li className={activePath === "/" ? "text-purple font-medium" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li
              className={
                activePath.includes("review") ? "text-purple font-medium" : ""
              }
            >
              <Link to="/reviews">Reviews</Link>
            </li>
            <li
              className={
                activePath.includes("game") ? "text-purple font-medium" : ""
              }
            >
              <Link to={"/games"}>Games</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
          </ul>
        </div>
        {accessToken && (
          <Link
            to={"/profile"}
            className="bg-dark-purple px-2 py-1 rounded-full mr-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-10 h-10">
                <img
                  src={dummy[0].image}
                  alt={"User"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-center text-purple font-semibold text-[14px]">
                {"Adithyan"}
              </p>
            </div>
          </Link>
        )}
        {!accessToken && (
          <div className="hidden lg:flex  gap-x-2 mr-3">
            <div className=" bg-dark-purple px-5 py-1 rounded-full">
              <Link to={"/signup"}>
                <p className="text-center text-purple font-semibold text-[14px]">
                  Sign Up
                </p>
              </Link>
            </div>
            <div className="primary border-2 border-[var(--color-purple)] px-5 py-1 rounded-full">
              <Link to={"/login"}>
                <p className="text-center text-purple font-semibold text-[14px]">
                  Login
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
      <hr className="hr" />
    </>
  );
}

export default DesktopNavbar;
