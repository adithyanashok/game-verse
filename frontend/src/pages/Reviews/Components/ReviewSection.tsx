import { useReviewSection } from "../hooks/useReviewSection";
import ReviewGrid from "./ReviewGrid";
import ReviewSearchBar from "./ReviewSearchBar";
import ReviewTabs from "./ReviewTabs";

const ReviewSection = () => {
  const {
    activeTab,
    handleTabChange,
    accessToken,
    searchInput,
    handleSearchChange,
    displayedAllReviews,
    displayedAllMeta,
    loadingSearch,
    errorSearch,
    setAllPage,
    displayedFollowingReviews,
    displayedFollowingMeta,
    loadingFetchFollowing,
    errorFetchFollowing,
    setFollowingPage,
  } = useReviewSection();

  return (
    <div className="2xl:w-[83%] xl:p-10 space-y-6">
      <ReviewSearchBar value={searchInput} onChange={handleSearchChange} />

      <ReviewTabs
        activeTab={activeTab}
        showFollowing={!!accessToken}
        onTabChange={handleTabChange}
      />

      {activeTab === "all" && (
        <ReviewGrid
          reviews={displayedAllReviews}
          loading={loadingSearch}
          error={errorSearch}
          meta={displayedAllMeta}
          emptyMessage="No reviews found. Try adjusting your search."
          onPageChange={setAllPage}
        />
      )}

      {activeTab === "following" && (
        <ReviewGrid
          reviews={displayedFollowingReviews}
          loading={loadingFetchFollowing}
          error={errorFetchFollowing}
          meta={displayedFollowingMeta}
          emptyMessage="No reviews from followed creators."
          onPageChange={setFollowingPage}
        />
      )}
    </div>
  );
};

export default ReviewSection;
