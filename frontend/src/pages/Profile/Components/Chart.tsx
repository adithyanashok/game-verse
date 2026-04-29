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
import { FiTrendingUp } from "react-icons/fi";

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
        label: "Views",
        data: analytics?.chartData.map((c) => c.count),
        borderColor: "var(--color-blue)",
        backgroundColor: "rgba(0,212,255,0.14)",
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#00d4ff",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(7,11,22,0.94)",
        titleColor: "#ffffff",
        bodyColor: "#c8d3e4",
        borderColor: "rgba(0,212,255,0.18)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#9aa7bd" },
        grid: { color: "rgba(255,255,255,0.06)" },
      },
      y: {
        ticks: { color: "#9aa7bd", precision: 0 },
        grid: { color: "rgba(255,255,255,0.06)" },
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/60 p-4 text-white sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-blue)]">
            Trend line
          </p>
          <h3 className="mt-1 text-xl font-black text-white">Views chart</h3>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)]">
          <FiTrendingUp className="h-4 w-4 text-[var(--color-blue)]" />
        </span>
      </div>

      <div className="h-52 sm:h-60 md:h-72 lg:h-80">
        <Line data={lineChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Chart;

