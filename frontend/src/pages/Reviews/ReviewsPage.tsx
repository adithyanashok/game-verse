import ReviewSection from "./Components/ReviewSection";
import TopReviewers from "./Components/TopReviewers";

const ReviewsPage = () => {
  return (
    <div className="2xl:flex bg-primary">
      {/* Review Section */}
      <ReviewSection />

      {/* Divider */}
      <div className="vertical-line"></div>

      {/* Trending Genre & Top Reviewers */}
      <div className="px-10 p-10">
        {/* Top Reviewers */}
        <TopReviewers />
      </div>
    </div>
  );
};

export default ReviewsPage;
