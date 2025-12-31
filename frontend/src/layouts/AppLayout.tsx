import { Outlet } from "react-router";
import Footer from "../components/common/footer/component/Footer";
import ResponsiveNavbar from "../components/common/Navbar/ResponsiveNavbar";

const AppLayout = () => {
  return (
    <>
      <ResponsiveNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
