import React from "react";
import { dummy } from "../../../data";
import { Rating } from "@mui/material";
import { HiThumbUp } from "react-icons/hi";
import IconButton from "../../Reviews/Components/IconButton";
import type { ReviewSummary } from "../../../features/reviews/types";
interface Props {
  review: ReviewSummary;
}
const GameReview = (props: Props) => {
  const date = new Date(props.review.createdAt);
  return (
    <div>
      <hr className="hr py-2 mt-5" />
      <div className="flex gap-5">
        <img
          className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full"
          src={dummy[0].image}
          alt=""
        />
        <div>
          <div className="w-max flex justify-between">
            <div>
              <h1 className="text-white font-bold">{props.review.userName}</h1>
              <p className="text-grey text-[12px]">
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Rating
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "#989fab",
                },
              }}
              style={{ color: "#6711bf" }}
              name="simple-controlled"
              value={props.review.rating?.overall}
              readOnly={true}
              // onChange={(event, newValue) => {}}
            />
          </div>
          <p className="text-grey text-[13px] leading-6 mt-3">
            {props.review.text}
          </p>
          <div className="flex items-start mt-3">
            <IconButton
              icon={<HiThumbUp color="#6711bf" className="" />}
              text={props.review.likeCount.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameReview;
