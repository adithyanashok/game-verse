type Props = {
  items: string[];
  title: string;
};
const FooterItems = ({ items, title }: Props) => {
  return (
    <ul className="ml-[10px] md:ml-0">
      <li className="font-bold text-[14px] md:text-[20px] text-white mb-4">
        {title}
      </li>
      {items.map((item) => {
        return (
          <li key={item} className="text-[12px] my-2">
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default FooterItems;
