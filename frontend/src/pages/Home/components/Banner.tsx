import { Link } from "react-router-dom";
import { FiArrowRight, FiMessageSquare, FiStar, FiTrendingUp } from "react-icons/fi";

const heroStats = [
  { label: "Community reviews", value: "12k+", icon: FiMessageSquare },
  { label: "Rated games", value: "850+", icon: FiStar },
  { label: "Weekly trends", value: "Fresh", icon: FiTrendingUp },
];

export default function Banner() {
  return (
    <section className="relative isolate min-h-[620px] overflow-hidden bg-[#050814] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/hd/cyberpunk-city-background-tyz810izsnne6bu8.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,20,0.97)_0%,rgba(7,11,22,0.86)_42%,rgba(7,11,22,0.36)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(0,212,255,0.18),transparent_26%),radial-gradient(circle_at_28%_68%,rgba(139,92,246,0.22),transparent_28%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(7,11,22,0)_0%,#070b16_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl pt-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.24)] bg-[rgba(0,212,255,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ff3ff]">
            Competitive gaming intelligence
          </p>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.03] text-white sm:text-5xl lg:text-7xl">
            Discover the games worth your next session.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#c4cad6] sm:text-lg">
            Explore trusted player reviews, compare ratings, follow active
            reviewers, and keep track of the titles people are actually playing.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/games"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-lime)] px-6 py-3 text-sm font-bold text-[#07101a] shadow-xl shadow-[rgba(182,255,59,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ccff6f]"
            >
              Explore Games
              <FiArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(0,212,255,0.28)] bg-white/8 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[rgba(0,212,255,0.5)] hover:bg-[rgba(0,212,255,0.12)]"
            >
              Read Reviews
            </Link>
          </div>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {heroStats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424]/72 p-4 shadow-lg shadow-black/20 backdrop-blur-md"
            >
              <Icon className="mb-4 h-5 w-5 text-[var(--color-blue)]" />
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="mt-1 text-sm text-[#aeb7c8]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
