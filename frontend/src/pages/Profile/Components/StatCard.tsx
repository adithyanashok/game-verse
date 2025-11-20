import React from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  showPercent?: boolean;
  showArrow?: boolean;
  borderColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  showPercent = false,
  showArrow = false,
  borderColor = "#6711bf",
}) => {
  const trendArrow = (num: number) =>
    num >= 0 ? (
      <div className="flex">
        <span className="text-[12px] opacity-80 text-green-500">{trend}%</span>
        <IoMdArrowUp color="green" size={16} />
      </div>
    ) : (
      <div className="flex">
        <span className="text-[12px] opacity-80 text-red-500">{trend}%</span>
        <IoMdArrowDown color="red" size={16} />
      </div>
    );

  return (
    <div
      className={`p-4 rounded-xl cursor-pointer text-white hover:bg-[#6711bf]/10
      transition-all duration-300 hover:scale-[1.02]`}
      style={{ border: `1px solid ${borderColor}` }}
    >
      <h4 className="text-sm opacity-70">{title}</h4>

      <p className="text-2xl font-semibold mt-1 flex items-center gap-2">
        {value}

        {showPercent && showArrow && trend !== undefined && trendArrow(trend)}
      </p>
    </div>
  );
};

export default StatCard;
