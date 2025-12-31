import { BiStar } from "react-icons/bi";
import type { Game } from "../../../features/games/types";
interface Props {
  game: Game;
}
const GameCard = (props: Props) => {
  return (
    <div className="hover-card bg-dark rounded-[12px] md:rounded-2xl w-full">
      <div className="relative">
        <div className="flex justify-center items-center gap-1 absolute bottom-3 right-3 w-12 h-7 bg-purple rounded-2xl">
          <BiStar color="#ffffff" className="text-[12px] sm:text-[14px]" />
          <p className="text-white items-center text-center text-[10px] sm:text-[12px]">
            {props.game.overall}
          </p>
        </div>
        <img
          className="w-full sm:h-[100px] lg:h-[100px] xl:h-[140px] rounded-t-[5px] md:rounded-t-2xl"
          src={props.game.imgUrl}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="ml-3 pb-5 mt-2">
        <h1 className="text-white font-bold text-[14px] md:text-[20px]">
          {props.game.name}
        </h1>
        <h1 className="text-[var(--color-purple)] sm:text-[12px] text-[10px] line-clamp-2">
          Released {props.game.releaseDate}
        </h1>

        <div className="flex flex-wrap gap-3 mt-4">
          {props.game.genre.map((genre) => (
            <p
              key={genre.id}
              className="bg-dark-purple py-0.5 px-1.5 text-[var(--color-purple)] rounded-full text-[12px]"
            >
              {genre.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
