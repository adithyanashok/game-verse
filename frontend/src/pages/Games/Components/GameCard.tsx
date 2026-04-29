import { BiStar } from "react-icons/bi";
import type { Game } from "../../../features/games/types";
interface Props {
  game: Game;
}
const GameCard = (props: Props) => {
  return (
    <div className="hover-card bg-dark rounded-[12px] md:rounded-2xl w-full h-full flex flex-col overflow-hidden">
      {/* IMAGE */}
      <div className="relative">
        <div className="absolute bottom-3 right-3 flex h-7 w-12 items-center justify-center gap-1 rounded-2xl bg-[var(--color-lime)] shadow-lg shadow-[rgba(182,255,59,0.18)]">
          <BiStar color="#07101a" className="text-[12px] sm:text-[14px]" />
          <p className="text-[10px] font-bold text-[#07101a] sm:text-[12px]">
            {props.game.overall}
          </p>
        </div>

        <img
          className="w-full sm:h-[100px] lg:h-[100px] xl:h-[140px] object-cover rounded-t-[5px] md:rounded-t-2xl"
          src={props.game.imgUrl}
          alt={props.game.name}
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-3 pb-4 mt-2">
        {/* TITLE + DATE */}
        <div>
          <h1 className="text-white font-bold text-[14px] md:text-[20px] line-clamp-1">
            {props.game.name}
          </h1>
          <p className="text-[var(--color-blue)] sm:text-[12px] text-[10px] line-clamp-1">
            Released {props.game.releaseDate}
          </p>
        </div>

        {/* PUSH GENRES TO BOTTOM */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-2">
            {props.game.genre.map((genre) => (
              <p
                key={genre.id}
                className="bg-dark-purple py-0.5 px-2 text-[var(--color-blue)] rounded-full text-[12px]"
              >
                {genre.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
