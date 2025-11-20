import { useEffect, useState } from "react";

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
    <div className="w-full p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-white">Review Analytics</h1>
        {/* Range Selector */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as AnalyticsRange)}
          className="bg-dark text-white px-3 py-2 rounded-md border border-gray-700"
        >
          {Object.values(AnalyticsRange).map((r) => (
            <option key={r} value={r}>
              {r.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            title: "Total Comments",
            value: analyticsOverview?.totalComment,
          },
          {
            title: "Total Likes",
            value: analyticsOverview?.totalLikes,
          },
          {
            title: "Total Views",
            value: analyticsOverview?.totalViews,
          },
          {
            title: "Likes Trend",
            value: `${analyticsOverview?.likes.likeTrend}%`,
          },
        ].map((item, index) => (
          <StatCard key={index} title={item.title} value={item.value ?? 0} />
        ))}
      </div>

      {/* Trend Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Likes"
          value={`${analyticsOverview?.likes.currentLikes}`}
          trend={analyticsOverview?.likes.likeTrend ?? 0}
          showArrow
          showPercent
        />

        <StatCard
          title="Views"
          value={`${analyticsOverview?.views.currentViews}`}
          trend={analyticsOverview?.views.viewsTrend ?? 0}
          showArrow
          showPercent
        />
      </div>

      {/* Line Chart */}
      {analyticsOverview && <Chart analytics={analyticsOverview} />}

      {/* Top Reviews */}
      {analyticsOverview && <TopReviews analytics={analyticsOverview} />}
    </div>
  );
};

export default AnalyticsDashboard;
