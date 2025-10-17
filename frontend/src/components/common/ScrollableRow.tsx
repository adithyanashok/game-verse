import type { ReactNode } from "react";

type Props = {
  image: ReactNode;
  title: string;
  subtitle: string;
  showSubtitle: boolean;
};
const CustomCard = ({
  image,
  title,
  subtitle,
  showSubtitle = false,
}: Props) => {
  return (
    <div className="flex-shrink-0">
      {image}
      <p className="font-bold mt-1">{title}</p>
      {showSubtitle && <p className="text-gray-500 text-[12px]">{subtitle}</p>}
    </div>
  );
};

export default CustomCard;
