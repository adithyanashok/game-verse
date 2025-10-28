import { Rating } from "@mui/material";
import React from "react";

const RatingCard = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl text-white font-bold">4.5</h1>
      <Rating
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "#989fab",
          },
        }}
        style={{ color: "#6711bf" }}
        name="simple-controlled"
        value={4}
        readOnly={true}
      />
      <p className="text-grey text-[12px]">1,230 reviews</p>
    </div>
  );
};

export default RatingCard;
