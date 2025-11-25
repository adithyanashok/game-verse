import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { getAnalytics } from "../../../features/reviews/reviewsSlice";
import { AnalyticsRange } from "../../../features/reviews/types";

// register chart.js
ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend
);

export default function ViewCountChart() {
  const dispatch = useAppDispatch();
  const { reviewAnalytics } = useAppSelector(
    (state: RootState) => state.reviews
  );

  const [range, setRange] = useState<AnalyticsRange>(
    AnalyticsRange.past_14_days
  );

  useEffect(() => {
    dispatch(getAnalytics({ reviewId: 1, range }));
  }, [dispatch, range]);

  const chartData = {
    labels: reviewAnalytics?.chartData?.map((item) => item.date) || [],
    datasets: [
      {
        label: "Views",
        data: reviewAnalytics?.chartData?.map((item) => item.count) || [],
        borderColor: "#4c6ef5",
        backgroundColor: "rgba(76, 110, 245, 0.2)",
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const trend = reviewAnalytics?.trend ?? 0;
  const isPositive = trend >= 0;

  return (
    <div style={{ width: "100%", height: 460 }} className="p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-semibold">Analytics</h1>

        {/* 🔽 Dropdown for analytics range */}
        <select
          className="bg-[#2a2a2a] text-white px-3 py-2 rounded-lg"
          value={range}
          onChange={(e) => setRange(e.target.value as AnalyticsRange)}
        >
          <option value={AnalyticsRange.past_7_days}>Past 7 days</option>
          <option value={AnalyticsRange.past_14_days}>Past 14 days</option>
          <option value={AnalyticsRange.past_28_days}>Past 28 days</option>
          <option value={AnalyticsRange.past_90_days}>Past 90 days</option>
        </select>
      </div>

      {/* Stats Section */}
      <div className="flex items-center gap-14 mb-5 text-white">
        <div>
          <div>
            <p className="text-gray-400 text-sm">Views</p>
            <h2 className="text-3xl font-bold">
              {reviewAnalytics?.viewCount ?? 0}
            </h2>
          </div>
          {/* Trend with arrow icon */}
          <div>
            <div className="flex items-center gap-1">
              <h2
                className={`text-[14px] ${
                  isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend}%
              </h2>

              {/* Arrow icon */}
              {isPositive ? (
                <span className="text-green-400 text-[12px]">▲</span>
              ) : (
                <span className="text-red-400 text-[12px]">▼</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Total Likes</p>
          <h2 className="text-3xl font-bold">
            {reviewAnalytics?.likeCount ?? 0}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
