import React from "react";
import FooterItems from "./FooterItems";

const Footer = () => {
  return (
    <div className="bg-primary text-gray-500">
      <hr className="hr py-5" />
      <div className="flex flex-wrap gap-4  justify-evenly">
        <FooterItems
          items={["About Us", "Terms of Service", "Privacy Policy"]}
          title="About"
        />
        <FooterItems items={["Blog", "Support", "FAQ"]} title="Resources" />
        <FooterItems items={["Contact Us", "Careers"]} title="Contact" />

        <ul>
          <li className="font-bold text-[20px] text-white">Socials</li>
          <li>Contact Us</li>
          <li>Careers</li>
        </ul>
      </div>
      <hr className="hr my-15" />

      <p className="text-center pb-10">© 2025 GameVerse. All right Reserved</p>
    </div>
  );
};

export default Footer;
