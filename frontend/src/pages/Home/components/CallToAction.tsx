import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div className="relative px-5 md:px-10 py-6 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#6711bf]/20 via-[#155dfc]/10 to-[#6711bf]/20 border border-[#6711bf]/30 p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-purple)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-blue)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Share Your Gaming Experience?
            </h2>
            <p className="text-[#989fab] text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of gamers sharing their thoughts, ratings, and
              insights about the games they love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/games")}
                className="px-8 py-3.5 rounded-full bg-purple text-white font-semibold hover:bg-[#7c1dd1] transition-all duration-200 shadow-lg shadow-[var(--color-purple)]/30"
              >
                Explore Games
              </button>
              <button
                onClick={() => navigate("/reviews")}
                className="px-8 py-3.5 rounded-full border-2 border-[var(--color-blue)] text-[var(--color-blue)] font-semibold hover:bg-[var(--color-blue)] hover:text-white transition-all duration-200"
              >
                Read Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
