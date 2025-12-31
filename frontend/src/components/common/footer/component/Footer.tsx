import FooterItems from "./FooterItems";

const Footer = () => {
  return (
    <div className="bg-primary text-gray-500">
      <hr className="hr py-5" />
      <div className="flex flex-wrap flex-col min-[305px]:flex-row min-[305px]:justify-evenly gap-4 ">
        <FooterItems
          items={["About Us", "Terms of Service", "Privacy Policy"]}
          title="About"
        />
        <FooterItems items={["Blog", "Support", "FAQ"]} title="Resources" />
        <FooterItems items={["Contact Us", "Careers"]} title="Contact" />
      </div>
      <hr className="hr my-15" />

      <p className="text-center pb-10 text-[12px]">
        © 2025 GameVerse. All right Reserved
      </p>
    </div>
  );
};

export default Footer;
