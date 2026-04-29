import type { ReactNode } from "react";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";

interface Props {
  icon: ReactNode;
  label: string;
  value: number;
  accent: string;
}

const MetricHighlight = ({ icon, label, value, accent }: Props) => {
  const count = useAnimatedCounter(value);
  return (
    <div
      className={`rounded-[10px] border p-4 shadow-lg shadow-black/10 ${accent}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
          {label}
        </p>
        {icon}
      </div>
      <p className="mt-3 text-lg font-black text-white">{count}</p>
    </div>
  );
};

export default MetricHighlight;
