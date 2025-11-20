import { BiStar } from "react-icons/bi";
import type { Game } from "../../../features/games/types";
interface Props {
  game: Game;
}
const GameCard = (props: Props) => {
  return (
    <div className="bg-dark rounded-t-2xl rounded-b-2xl w-[250px]">
      <div className="relative">
        <div className="flex justify-center items-center gap-1 absolute bottom-3 right-3 w-12 h-7 bg-purple rounded-2xl">
          <BiStar color="#ffffff" />
          <p className="text-white items-center text-center text-[12px]">
            {props.game.overallRating}
          </p>
        </div>
        <img
          className="lg:w-[250px] lg:h-[140px] rounded-t-2xl"
          src={props.game.imgUrl}
          alt=""
        />
      </div>
      <div className="ml-3 pb-5 mt-2">
        <h1 className="text-white font-bold text-[20px]">{props.game.name}</h1>
        <h1 className="text-[var(--color-purple)] text-[12px] line-clamp-2">
          Released {props.game.releaseDate}
        </h1>

        <div className="flex gap-x-3 mt-4">
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
