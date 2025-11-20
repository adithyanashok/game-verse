import { type AnalyticsOverview } from "../../../features/reviews/types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

interface ChartProps {
  analytics: AnalyticsOverview;
}

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);
const Chart = ({ analytics }: ChartProps) => {
  const lineChartData = {
    labels: analytics?.chartData.map((c) =>
      new Date(c.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })
    ),
    datasets: [
      {
        data: analytics?.chartData.map((c) => c.count),
        borderColor: "#6711bf",
        borderWidth: 3,
        pointRadius: 3,
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
  return (
    <div className="p-6 rounded-xl border border-[#6711bf] text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Views Chart</h3>
      </div>

      <div className="h-56">
        <Line data={lineChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Chart;
