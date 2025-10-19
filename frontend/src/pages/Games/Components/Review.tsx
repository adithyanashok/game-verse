import React from "react";
import { dummy } from "../../../data";
import { Rating } from "@mui/material";
import { HiThumbUp } from "react-icons/hi";
import IconButton from "../../Reviews/Components/IconButton";

const GameReview = () => {
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
          <div className="flex justify-between">
            <div>
              <h1 className="text-white font-bold">Alex</h1>
              <p className="text-grey text-[12px]">Jan 15, 2025</p>
            </div>
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
              onChange={(event, newValue) => {}}
            />
          </div>
          <p className="text-grey text-[13px] leading-6 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
          <div className="flex items-start mt-3">
            <IconButton
              icon={<HiThumbUp color="#6711bf" className="" />}
              text="123"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameReview;
