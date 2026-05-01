import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/footer/component/Footer";
import ResponsiveNavbar from "../components/common/Navbar/ResponsiveNavbar";

const AppLayout = () => {
  const { pathname } = useLocation();

  const hideLayout =
    pathname.startsWith("/discussion/") && pathname !== "/discussions";

  return (
    <>
      {!hideLayout && <ResponsiveNavbar />}

      <main>
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </>
  );
};

export default AppLayout;
