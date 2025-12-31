import { Rating } from "@mui/material";
import { HiThumbUp } from "react-icons/hi";
import IconButton from "../../Reviews/Components/IconButton";
import type { ReviewSummary } from "../../../features/reviews/types";
interface Props {
  review: ReviewSummary;
}
const GameReview = (props: Props) => {
  console.log(props);
  const date = new Date(props.review.createdAt);
  return (
    <>
      <hr className="hr py-2 mt-5" />
      <div className="gap-5">
        {/* <div> */}
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-2">
            <img
              className="hidden md:block md:w-[50px] md:h-[50px] lg:w-[50px] lg:h-[50px]  rounded-full"
              src={`https://${props.review?.user?.profileImage}`}
              alt=""
              loading="lazy"
            />
            <h1 className="text-white font-medium text-[14px]">
              {props.review?.user?.name}
            </h1>
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
            style={{ color: "#6711bf", fontSize: "16px" }}
            name="simple-controlled"
            value={props.review.rating?.overall}
            readOnly={true}
            // onChange={(event, newValue) => {}}
          />
        </div>
        <p className="text-grey text-[12px] leading-6 mt-3">
          {props.review.text}
        </p>
        <div className="flex items-start mt-3">
          <IconButton
            icon={<HiThumbUp color="#6711bf" className="" />}
            text={props.review.likeCount.toString()}
          />
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default GameReview;
