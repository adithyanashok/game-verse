import FooterItems from "./FooterItems";

const Footer = () => {
  return (
    <footer className="border-t border-[rgba(0,212,255,0.12)] bg-[#070b16] text-[#9aa7bd]">
      <div className="py-8" />
      <div className="flex flex-col flex-wrap gap-4 min-[305px]:flex-row min-[305px]:justify-evenly">
        <FooterItems
          items={["About Us", "Terms of Service", "Privacy Policy"]}
          title="About"
        />
        <FooterItems items={["Blog", "Support", "FAQ"]} title="Resources" />
        <FooterItems items={["Contact Us", "Careers"]} title="Contact" />
      </div>
      <hr className="hr my-15" />

      <p className="pb-10 text-center text-[12px]">
        &copy; 2025 GameVerse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
