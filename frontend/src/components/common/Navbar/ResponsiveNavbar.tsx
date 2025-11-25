import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const ResponsiveNavbar = () => {
  return (
    <div>
      {/* Navbar Mobile */}
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>

      {/* Navbar Desktop */}
      <div className="lg:block hidden">
        <DesktopNavbar />
      </div>
    </div>
  );
};

export default ResponsiveNavbar;
