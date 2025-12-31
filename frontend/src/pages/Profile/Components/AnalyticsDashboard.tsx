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
    <div className="w-full mt-4 sm:p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Review Analytics
        </h1>

        {/* Range Selector */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as AnalyticsRange)}
          className="bg-dark text-white px-3 py-2 rounded-md border border-gray-700 w-full sm:w-auto"
        >
          {Object.values(AnalyticsRange).map((r) => (
            <option key={r} value={r}>
              {r.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {[
          { title: "Total Comments", value: analyticsOverview?.totalComment },
          { title: "Total Likes", value: analyticsOverview?.totalLikes },
          { title: "Total Views", value: analyticsOverview?.totalViews },
          {
            title: "Views",
            value: analyticsOverview?.views.currentViews,
            trends: analyticsOverview?.views.viewsTrend,
          },
        ].map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value ?? 0}
            trend={item.trends}
            showArrow
            showPercent
          />
        ))}
      </div>

      {/* Line Chart */}
      {analyticsOverview && <Chart analytics={analyticsOverview} />}

      {/* Top Reviews */}
      {analyticsOverview && <TopReviews analytics={analyticsOverview} />}
    </div>
  );
};

export default AnalyticsDashboard;
