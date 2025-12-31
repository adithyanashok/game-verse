import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { getTopReviewers } from "../../../features/user/userSlice";
import { Link } from "react-router";
import ReviewerCard from "./ReviewerCard";

const TopReviewers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const reviewers = useSelector((state: RootState) => state.user.topReviewers);

  useEffect(() => {
    if (!reviewers || reviewers.length === 0) {
      dispatch(getTopReviewers());
    }
  }, [dispatch, reviewers]);
  return (
    <div className="scroll-row px-4">
      {reviewers.map((reviewer) => {
        return (
          <Link to={`/profile/${reviewer.id}`} key={reviewer.id}>
            <ReviewerCard name={reviewer.name} image={reviewer.profileImage} />
          </Link>
        );
      })}
    </div>
  );
};

export default TopReviewers;
