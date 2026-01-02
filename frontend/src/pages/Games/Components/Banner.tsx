import { useState } from "react";
import type { Game } from "../../../features/games/types";
import { useNavigate } from "react-router-dom";
interface Props {
  game: Game | null;
  showWriteButton: boolean;
}
const Banner = (props: Props) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  console.log(props.game?.imgUrl);
  return (
    <div
      className="relative sm:rounded-2xl  bg-cover bg-center  lg:h-[350px] overflow-hidden sm:mt-5"
      style={{ backgroundImage: `url(${props.game?.imgUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:justify-end h-full px-10 space-y-1 pb-10 mt-5">
        <h1 className="text-[25px] md:text-3xl xl:text-5xl font-bold text-white leading-[1.3]">
          {props.game?.name}
        </h1>
        <div className="text-[#989fab] text-[14px] max-w-xl">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Released {props.game?.releaseDate}</span>

            {props.game?.genre.map((val) => (
              <span key={val.id} className="flex items-center gap-2">
                <span className="hidden sm:inline">·</span>
                <span className="text-[#989fab]">{val.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="justify-between">
          <div className="relative max-w-xl">
            <p
              className={`text-[12px] md:text-[14px] text-[#c3c7ce] ${
                showMore ? "" : "line-clamp-2"
              }`}
            >
              {props.game?.description}
            </p>

            {
              <span
                onClick={() => setShowMore(!showMore)}
                className="absolute bottom-0 right-0 cursor-pointer text-purple text-[12px] md:text-[14px]"
              >
                {showMore ? "less" : "more"}
              </span>
            }
          </div>

          {props.showWriteButton && (
            <button
              onClick={() =>
                navigate(`/write-review/${props.game?.id}`, {
                  state: { game: props.game },
                })
              }
              className="md:p-3 p-3 text-[10px] text-white font-bold rounded-[5px] bg-dark-purple mt-2 md:mt-5"
            >
              Write Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
