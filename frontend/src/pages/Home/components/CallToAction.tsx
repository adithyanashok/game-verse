import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiEdit3 } from "react-icons/fi";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#eaf7ff] text-[#07101a] shadow-2xl shadow-black/25">
        <div className="grid items-stretch lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8 md:p-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#007f99]">
              Join the conversation
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
              Ready to share your gaming experience?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#586073] md:text-lg">
              Join thousands of gamers sharing their thoughts, ratings, and
              insights about the games they love.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/games")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#07101a] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#122033]"
              >
                Explore Games
                <FiArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("/reviews")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b7d8e5] bg-white px-6 py-3 text-sm font-bold text-[#07101a] transition hover:-translate-y-0.5 hover:border-[#76c7dd]"
              >
                <FiEdit3 className="h-4 w-4" />
                Read Reviews
              </button>
            </div>
          </div>

          <div className="min-h-[280px] bg-[linear-gradient(135deg,rgba(0,212,255,0.88),rgba(139,92,246,0.82)),url('https://wallpapers.com/images/hd/cyberpunk-city-background-tyz810izsnne6bu8.jpg')] bg-cover bg-center p-6 sm:p-8">
            <div className="flex h-full flex-col justify-end">
              <div className="rounded-[8px] border border-white/20 bg-black/28 p-5 text-white backdrop-blur-md">
                <p className="text-sm font-semibold text-white/70">
                  Community insight
                </p>
                <p className="mt-3 text-2xl font-black leading-tight">
                  Great reviews help the next player choose with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
