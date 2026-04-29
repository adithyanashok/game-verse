import React from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  showPercent?: boolean;
  showArrow?: boolean;
  accentClass?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  showPercent = false,
  showArrow = false,
  accentClass = "border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))]",
  icon,
}) => {
  const trendArrow = (num: number) =>
    num >= 0 ? (
      <div className="flex items-center gap-1">
        <span className="text-[12px] font-bold text-emerald-400">
          {trend?.toFixed(2)}%
        </span>
        <IoMdArrowUp color="#34d399" size={16} />
      </div>
    ) : (
      <div className="flex items-center gap-1">
        <span className="text-[12px] font-bold text-red-400">
          {trend?.toFixed(2)}%
        </span>
        <IoMdArrowDown color="#f87171" size={16} />
      </div>
    );

  return (
    <div className={`rounded-[10px] border p-4 text-white shadow-lg shadow-black/10 ${accentClass}`}>
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
          {title}
        </h4>
        {icon}
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-2xl font-black">{value}</span>
        {showPercent && showArrow && trend !== undefined && trendArrow(trend)}
      </div>
    </div>
  );
};

export default StatCard;

