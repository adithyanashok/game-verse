import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiEdit3, FiImage, FiTag } from "react-icons/fi";
import type { Game, Genre, Rating } from "../../../features/games/types";
import { formatReleaseDate } from "../../../utils/formatReleaseDate";

export interface BannerGameData {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  releaseDate: string;
  genre: Genre[];
  rating?: Rating | null;
}

interface Props {
  game: BannerGameData | Game | null;
  showWriteButton?: boolean;
  badgeLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const getGameImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return "";
  return imageUrl.startsWith("http") ? imageUrl : `https://${imageUrl}`;
};

const Banner = ({
  game,
  showWriteButton = false,
  badgeLabel = "Game profile",
  actionLabel = "Write Review",
  onAction,
}: Props) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const imageUrl = useMemo(() => getGameImageUrl(game?.imgUrl), [game?.imgUrl]);
  const genreSummary = useMemo(() => {
    if (!game?.genre?.length) return "Genre not listed";
    return game.genre.map((genre) => genre.name).join(" | ");
  }, [game?.genre]);

  const shortDescription = game?.description?.trim() ?? "";
  const shouldClampDescription = shortDescription.length > 180;

  return (
    <section className="relative overflow-hidden rounded-[12px] bg-[linear-gradient(135deg,#08101c_0%,#0d1424_48%,#08101c_100%)]">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(0,212,255,0.16),transparent_28%),linear-gradient(90deg,rgba(7,11,22,0.96)_0%,rgba(7,11,22,0.84)_38%,rgba(7,11,22,0.62)_100%)]" />
          <div className="absolute right-4 top-4 hidden w-[34%] max-w-[360px] overflow-hidden rounded-[12px] border border-white/10 bg-[#07101a]/50 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-md lg:block">
            <div className="aspect-[4/5] bg-[linear-gradient(135deg,#10243a,#18102d)]">
              <img
                src={imageUrl}
                alt={game?.name ?? "Game cover"}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,212,255,0.14),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(182,255,59,0.08),transparent_18%),linear-gradient(135deg,#08101c_0%,#0d1424_52%,#08101c_100%)]" />
      )}

      <div className="relative z-10 min-h-[320px] px-5 py-6 sm:px-7 sm:py-8 lg:min-h-[420px] lg:px-8 lg:py-9">
        <div className="flex h-full max-w-[780px] flex-col justify-between gap-8 lg:pr-[34%]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#cbeafe]">
                <FiTag className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                {badgeLabel}
              </span>
              {game?.rating?.overallRating ? (
                <span className="rounded-full bg-[var(--color-lime)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#07101a]">
                  {game.rating.overallRating.toFixed(1)} community score
                </span>
              ) : null}
            </div>

            <div>
              <h1 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {game?.name ?? "Loading game"}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#9aa7bd]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <FiCalendar className="h-4 w-4 text-[var(--color-blue)]" />
                  {formatReleaseDate(game?.releaseDate)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <FiTag className="h-4 w-4 text-[var(--color-blue)]" />
                  <span className="max-w-[320px] truncate">{genreSummary}</span>
                </span>
              </div>
            </div>

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
                      className="mt-3 inline-flex items-center rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-blue)] transition hover:border-[rgba(0,212,255,0.34)] hover:text-white"
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

          <div className="flex justify-start">
            {showWriteButton ? (
              <button
                type="button"
                onClick={
                  onAction ??
                  (() =>
                    navigate(`/write-review/${game?.id}`, {
                      state: { game },
                    }))
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(0,212,255,0.18)] bg-[linear-gradient(90deg,rgba(0,212,255,0.2),rgba(0,212,255,0.1))] px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/20 transition hover:border-[rgba(0,212,255,0.34)] hover:bg-[linear-gradient(90deg,rgba(0,212,255,0.28),rgba(0,212,255,0.14))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
              >
                <FiEdit3 className="h-4 w-4" />
                {actionLabel}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {!imageUrl ? (
        <div className="pointer-events-none absolute bottom-5 right-5 hidden rounded-[14px] border border-[rgba(0,212,255,0.12)] bg-[#07101a]/70 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-md lg:flex lg:w-[250px] lg:flex-col lg:items-center lg:justify-center lg:gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(0,212,255,0.18)] bg-[rgba(0,212,255,0.08)]">
            <FiImage className="h-6 w-6 text-[var(--color-blue)]" />
          </span>
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#9aa7bd]">
            Artwork unavailable
          </p>
        </div>
      ) : null}
    </section>
  );
};

export default Banner;
