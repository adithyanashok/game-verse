import { FiCalendar, FiFileText, FiStar } from "react-icons/fi";
import { formatReleaseDate } from "../../../utils/formatReleaseDate";

interface Props {
  overallRating?: number;
  releaseDate?: string;
  reviewCount: number;
}

const iconMap = {
  star: (className: string) => <FiStar className={className} />,
  file: (className: string) => <FiFileText className={className} />,
  calendar: (className: string) => <FiCalendar className={className} />,
};

const GameSnapshot = ({ overallRating, releaseDate, reviewCount }: Props) => {
  const stats = [
    {
      label: "Community score",
      value: overallRating?.toFixed(1) ?? "N/A",
      icon: iconMap.star("h-4 w-4 text-(--color-lime)"),
      accent:
        "border-[rgba(182,255,59,0.16)] bg-[linear-gradient(180deg,rgba(182,255,59,0.14),rgba(182,255,59,0.04))]",
    },
    {
      label: "Reviews posted",
      value: reviewCount.toString(),
      icon: iconMap.file("h-4 w-4 text-(--color-blue)"),
      accent:
        "border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))]",
    },
    {
      label: "Release date",
      value: formatReleaseDate(releaseDate),
      icon: iconMap.calendar("h-4 w-4 text-[#f8b84e]"),
      accent:
        "border-[rgba(248,184,78,0.16)] bg-[linear-gradient(180deg,rgba(248,184,78,0.14),rgba(248,184,78,0.04))]",
    },
  ];

  return (
    <div className="space-y-4 lg:flex lg:flex-col">
      <div className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20 lg:h-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
              Game snapshot
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Quick view
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9aa7bd]">
              A compact read on how the title is landing with players right now.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-[10px] border p-4 shadow-lg shadow-black/10 ${stat.accent}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                  {stat.label}
                </p>
                {stat.icon}
              </div>
              <p className="mt-3 text-lg font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSnapshot;
