import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopReviewers } from "../../../features/user/userSlice";
import type { AppDispatch, RootState } from "../../../store";
import { dummy } from "../../../data";

const TopReviewers = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select data from the store
  const reviewers = useSelector((state: RootState) => state.user.topReviewers);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(getTopReviewers());
  }, [dispatch]);

  return (
    <div>
      {" "}
      <h1 className="text-white font-bold text-[20px]">Top Reviewers</h1>{" "}
      <div className="flex flex-col gap-x-2 gap-y-2 mt-3">
        {" "}
        {reviewers.map((review) => {
          console.log(review);
          return (
            <div key={review.id} className="flex gap-4 items-center mt-2">
              {" "}
              <img
                src={dummy[0].image}
                className="w-[60px] h-[60px] rounded-full"
                alt=""
              />{" "}
              <div>
                {" "}
                <p className="text-white font-bold text-1xl">
                  {review.name}
                </p>{" "}
                <p className="text-purple text-[14px]">
                  {review.followerCount} Followers
                </p>{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default TopReviewers;
