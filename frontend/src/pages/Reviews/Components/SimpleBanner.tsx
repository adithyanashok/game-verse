import React, { useState } from "react";

interface SimpleBannerProps {
  name: string;
  imageUrl?: string;
  communityScore?: number;
  badgeLabel?: string;
  description?: string;
}

const SimpleBanner: React.FC<SimpleBannerProps> = ({
  name,
  imageUrl,
  communityScore,
  badgeLabel = "Review Draft",
  description,
}) => {
  const [showMore, setShowMore] = useState(false);
  const shortDescription = description?.trim() ?? "";
  const shouldClampDescription = shortDescription.length > 180;
  return (
    <section className="relative overflow-hidden rounded-xl bg-[#08101c]">
      {/* Background Image */}
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#07101a]/95 via-[#07101a]/80 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col p-6 gap-2">
        {/* Top Row */}
        <div className="flex items-center gap-2">
          {/* Badge */}
          <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/20">
            {badgeLabel}
          </span>

          {/* Community Score */}
          {communityScore !== undefined && (
            <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-lime-400 text-black">
              {communityScore.toFixed(1)} Score
            </span>
          )}
        </div>

        {/* Game Name */}
        <h1 className="text-3xl font-black text-white">{name}</h1>
        <div className="max-w-2xl">
          {shortDescription ? (
            <>
              <p
                className={`text-sm leading-7 text-[#c8d3e4] sm:text-[15px] ${
                  showMore || !shouldClampDescription ? "" : "line-clamp-3"
                }`}
              >
                {shortDescription}
              </p>
              {shouldClampDescription ? (
                <button
                  type="button"
                  onClick={() => setShowMore((prev) => !prev)}
                  className="mt-3 inline-flex items-center rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-(--color-blue) transition hover:border-[rgba(0,212,255,0.34)] hover:text-white"
                >
                  {showMore ? "Show less" : "Read more"}
                </button>
              ) : null}
            </>
          ) : (
            <p className="text-sm leading-7 text-[#9aa7bd] sm:text-[15px]">
              A detailed description for this game has not been added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleBanner;
