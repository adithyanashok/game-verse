import { Rating } from "@mui/material";

import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";

const RatingCard = () => {
  const { currentGame } = useAppSelector((state: RootState) => state.game);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl text-white font-bold">
        {currentGame?.rating.overallRating}
      </h1>
      <Rating
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "#989fab",
          },
        }}
        style={{ color: "#6711bf" }}
        name="simple-controlled"
        value={Number(currentGame?.rating.overallRating.toFixed(0))}
        readOnly={true}
      />
      <p className="text-grey text-[12px]">1,230 reviews</p>
    </div>
  );
};

export default RatingCard;
