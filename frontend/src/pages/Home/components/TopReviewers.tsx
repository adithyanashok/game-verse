import { useEffect } from "react";
import CustomCard from "../../../components/common/ScrollableRow";
import { dummy } from "../../../data";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { getTopReviewers } from "../../../features/user/userSlice";
import { Link } from "react-router";

const TopReviewers = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select data from the store
  const reviewers = useSelector((state: RootState) => state.user.topReviewers);
  // const loading = useSelector((state: RootState) => state.user.loading);
  // const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(getTopReviewers());
  }, [dispatch]);
  return (
    <div className="scroll-row">
      {reviewers.map((reviewer) => {
        return (
          <Link to={`/profile/${reviewer.id}`}>
            <CustomCard
              key={reviewer.id}
              subtitle={reviewer.name}
              image={
                <img
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full object-cover"
                  src={dummy[0].image}
                  alt=""
                />
              }
              title={reviewer.name}
              showSubtitle={false}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default TopReviewers;
