import { useEffect, useState } from "react";
import { FiBarChart2, FiEye, FiHeart, FiMessageSquare, FiTrendingUp } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getAnalyticsOverview } from "../../../features/reviews/reviewsSlice";
import { AnalyticsRange } from "../../../features/reviews/types";
import type { RootState } from "../../../store";
import StatCard from "./StatCard";
import Chart from "./Chart";
import TopReviews from "./TopReviews";

const AnalyticsDashboard = () => {
  const dispatch = useAppDispatch();
  const [range, setRange] = useState(AnalyticsRange.past_14_days);

  useEffect(() => {
    dispatch(getAnalyticsOverview({ reviewId: 0, range }));
  }, [dispatch, range]);

  const { analyticsOverview } = useAppSelector(
    (state: RootState) => state.reviews
  );

  return (
    <div className="mt-4 w-full space-y-8 sm:p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
            Insights
          </p>
          <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Review analytics
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9aa7bd]">
            Track how your reviews are performing, where attention is building, and which posts are leading the conversation.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-2.5">
          <FiBarChart2 className="h-4 w-4 text-[var(--color-blue)]" />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as AnalyticsRange)}
            className="bg-transparent text-sm font-bold uppercase tracking-[0.12em] text-white outline-none"
          >
            {Object.values(AnalyticsRange).map((r) => (
              <option key={r} value={r} className="bg-[#0d1424] text-white">
                {r.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Comments",
            value: analyticsOverview?.totalComment,
            icon: <FiMessageSquare className="h-4 w-4 text-[#f8b84e]" />,
            accentClass:
              "border-[rgba(248,184,78,0.16)] bg-[linear-gradient(180deg,rgba(248,184,78,0.14),rgba(248,184,78,0.04))]",
          },
          {
            title: "Total Likes",
            value: analyticsOverview?.totalLikes,
            icon: <FiHeart className="h-4 w-4 text-[var(--color-lime)]" />,
            accentClass:
              "border-[rgba(182,255,59,0.16)] bg-[linear-gradient(180deg,rgba(182,255,59,0.14),rgba(182,255,59,0.04))]",
          },
          {
            title: "Total Views",
            value: analyticsOverview?.totalViews,
            icon: <FiEye className="h-4 w-4 text-[var(--color-blue)]" />,
            accentClass:
              "border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))]",
          },
          {
            title: "Views Trend",
            value: analyticsOverview?.views.currentViews,
            trends: analyticsOverview?.views.viewsTrend,
            icon: <FiTrendingUp className="h-4 w-4 text-[#cbeafe]" />,
            accentClass:
              "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]",
          },
        ].map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value ?? 0}
            trend={item.trends}
            showArrow
            showPercent
            icon={item.icon}
            accentClass={item.accentClass}
          />
        ))}
      </div>

      {analyticsOverview && <Chart analytics={analyticsOverview} />}
      {analyticsOverview && <TopReviews analytics={analyticsOverview} />}
    </div>
  );
};

export default AnalyticsDashboard;
