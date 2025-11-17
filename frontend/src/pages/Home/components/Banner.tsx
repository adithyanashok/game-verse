import React from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative px-5 md:px-10 py-8 md:py-12 lg:py-16">
      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden">
        {/* Background Image with Multiple Layers */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://assets.xboxservices.com/assets/64/ea/64ea9f0e-6c8f-44f9-8866-429edbad9784.jpg?n=2626994_Poster-Image-1084_1920x1080_02.jpg')",
            }}
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#191022]/90 via-[#191022]/70 to-[#6711bf]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191022] via-transparent to-transparent" />

          {/* Animated Gradient Orbs */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--color-purple)]/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--color-blue)]/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-purple)]/20 rounded-full blur-3xl animate-pulse delay-500" />

          {/* Decorative Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-purple)]/20 border border-[var(--color-purple)]/40 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 bg-[var(--color-purple)] rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-semibold text-white">
                  Welcome to GameVerse
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                <span className="block">Explore the</span>
                <span className="block bg-gradient-to-r from-[var(--color-purple)] via-[var(--color-blue)] to-[var(--color-purple)] bg-clip-text text-transparent">
                  Universe of Gaming
                </span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
                Dive into the latest game reviews, connect with fellow gamers,
                and discover your next adventure in the world of gaming.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/games")}
                  className="group relative px-8 py-4 rounded-full bg-[var(--color-purple)] text-white font-semibold text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-purple)]/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Browse Games
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7c1dd1] to-[var(--color-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button
                  onClick={() => navigate("/reviews")}
                  className="group px-8 py-4 rounded-full border-2 border-[var(--color-blue)] text-[var(--color-blue)] font-semibold text-sm md:text-base bg-transparent hover:bg-[var(--color-blue)] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--color-blue)]/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Browse Reviews
                  </span>
                </button>
              </div>

              {/* Stats Row */}
              <div className="mt-12 flex flex-wrap gap-6 md:gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-purple)]/20 border border-[var(--color-purple)]/40 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[var(--color-purple)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      10K+
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Active Users
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-blue)]/20 border border-[var(--color-blue)]/40 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[var(--color-blue)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      5K+
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Reviews
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-purple)]/20 border border-[var(--color-purple)]/40 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[var(--color-purple)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      500+
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Games
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-primary)] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
