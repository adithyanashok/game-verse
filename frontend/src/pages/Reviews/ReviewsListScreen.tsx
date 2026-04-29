import ReviewSection from "./Components/ReviewSection";
import TopReviewers from "./Components/TopReviewers";

const ReviewListScreen = () => {
  return (
    <div className="2xl:flex bg-primary">
      {/* Review Section */}
      <ReviewSection />

      {/* Divider */}
      <div className="vertical-line"></div>

      {/* Trending Genre & Top Reviewers */}
      <div className="px-5 p-5">
        {/* Top Reviewers */}
        <TopReviewers />
      </div>
    </div>
  );
};

export default ReviewListScreen;
