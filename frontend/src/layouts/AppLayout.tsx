import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/footer/component/Footer";
import ResponsiveNavbar from "../components/common/Navbar/ResponsiveNavbar";

const AppLayout = () => {
  const params = useLocation();
  const showNavbarAndFooter =
    params.pathname.includes("/discussion") &&
    params.pathname !== "/discussions/create";
  return (
    <>
      {!showNavbarAndFooter && <ResponsiveNavbar />}
      <Outlet />
      {!showNavbarAndFooter && <Footer />}
    </>
  );
};

export default AppLayout;
