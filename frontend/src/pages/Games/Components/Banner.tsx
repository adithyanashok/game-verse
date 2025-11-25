import Button from "../../../components/common/Button";
import type { Game } from "../../../features/games/types";
import { useNavigate } from "react-router";
interface Props {
  game: Game | null;
  showWriteButton: boolean;
}
const Banner = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative rounded-2xl  bg-cover bg-center h-[200px] md:h-[450px] lg:h-[350px] overflow-hidden"
      style={{ backgroundImage: `url(${props.game?.imgUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end  h-full px-10 space-y-1 pb-10">
        <h1 className="text-[15px] md:text-3xl xl:text-5xl font-bold text-white leading-[1.3]">
          {props.game?.name}
        </h1>
        <p className="flex gap-2 text-[10px] md:text-[14px] text-[#989fab] max-w-xl">
          Released {props.game?.releaseDate}{" "}
          <span className="flex gap-2">
            {props.game?.genre.map((val) => (
              <>
                {" "}
                <span>·</span>
                <p>{val.name}</p>
              </>
            ))}
          </span>{" "}
        </p>
        <div className="flex flex-col items-start lg:flex-row justify-between">
          <p className="text-[8px] md:text-[14px] text-[#c3c7ce] max-w-xl">
            {props.game?.description}
          </p>
          {props.showWriteButton && (
            <Button
              onClick={() =>
                navigate(`/write-review/${props.game?.id}`, {
                  state: { game: props.game },
                })
              }
              label="Write Review"
              variant="primary"
              className="md:p-3 p-2 text-[8px] md:text-[12px] rounded-[5px] bg-purple mt-2 md:mt-5"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
