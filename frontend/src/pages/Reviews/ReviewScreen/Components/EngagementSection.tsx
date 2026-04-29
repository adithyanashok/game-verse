import { FiEye, FiMessageCircle, FiThumbsUp } from "react-icons/fi";
import type { ReactNode } from "react";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";

const AnimatedMetric = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) => {
  const count = useAnimatedCounter(value);
  return (
    <div className="flex items-center gap-3 border-b border-[rgba(0,212,255,0.12)] px-5 py-4 last:border-b-0">
      {icon}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9aa7bd]">
          {label}
        </p>
        <p className="text-xl font-black text-white">{count}</p>
      </div>
    </div>
  );
};

interface Props {
  likeCount: number;
  viewCount: number;
  commentCount: number;
}

const EngagementSection = ({ likeCount, viewCount, commentCount }: Props) => (
  <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20">
    <div className="mb-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
        Engagement
      </p>
      <h3 className="mt-1 text-xl font-black text-white">Reader activity</h3>
    </div>
    <div className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.1)] bg-[#070b16]/54">
      <div className="grid sm:grid-cols-1">
        <AnimatedMetric
          icon={<FiThumbsUp className="h-5 w-5 text-(--color-lime)" />}
          label="Likes"
          value={likeCount}
        />
        <AnimatedMetric
          icon={<FiEye className="h-5 w-5 text-(--color-blue)" />}
          label="Views"
          value={viewCount}
        />
        <AnimatedMetric
          icon={<FiMessageCircle className="h-5 w-5 text-[#f8b84e]" />}
          label="Comments"
          value={commentCount}
        />
      </div>
    </div>
  </section>
);

export default EngagementSection;
