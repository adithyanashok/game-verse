import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="relative w-full h-3/12">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/hd/cyberpunk-city-background-tyz810izsnne6bu8.jpg')",
        }}
      ></div>

      {/* Actual Content Layer */}
      <div className="relative z-10 text-white">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 md:px-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Discover. Review. <span className="text-purple">Play.</span>
            </h2>
            <p className="text-grey text-lg md:text-xl mb-8 max-w-xl">
              A modern platform where gamers explore detailed reviews, compare
              ratings, and discover trending titles across all genres.
            </p>
            <div className="flex gap-4">
              <Link
                to="/games"
                className="bg-purple px-4 py-2 rounded-lg font-medium hover:bg-[#4e0d95] transition"
              >
                Explore Games
              </Link>
              <Link
                to="/reviews"
                className="border border-purple px-4 py-2 rounded-lg font-semibold hover:bg-dark-purple transition"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
