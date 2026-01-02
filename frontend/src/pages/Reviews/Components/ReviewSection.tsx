import React, { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";

import {
  fetchFollowingReviews,
  searchReviews,
} from "../../../features/reviews/reviewsSlice";

import type { ReviewSummary } from "../../../features/reviews/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";

import ReviewCard from "./ReviewCard";
import Pagination from "../../../components/common/Pagination";
import debounce from "../../../utils/debouncer";

const LIMIT = 20;

type TabType = "following" | "all";

const ReviewSection = () => {
  const dispatch = useAppDispatch();

  const {
    searchResults,
    searchMeta,
    followingReviews,
    followingReviewsMeta,
    loading,
    errors,
  } = useAppSelector((state: RootState) => state.reviews);

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [followingPage, setFollowingPage] = useState(1);
  const [allPage, setAllPage] = useState(1);

  useEffect(() => {
    if (activeTab !== "following") return;

    dispatch(
      fetchFollowingReviews({
        page: followingPage,
        limit: LIMIT,
        query: searchTerm || null,
      })
    );
  }, [dispatch, followingPage, searchTerm, activeTab]);

  useEffect(() => {
    if (activeTab !== "all") return;

    dispatch(
      searchReviews({
        page: allPage,
        limit: LIMIT,
        query: searchTerm || null,
      })
    );
  }, [dispatch, allPage, searchTerm, activeTab]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setFollowingPage(1);
        setAllPage(1);
      }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="2xl:w-[83%] xl:p-10 space-y-6">
      <div className="md:border rounded-[16px] md:bg-dark md:border-[#989fab1e] md:p-5 p-2 md:m-4">
        <div className="flex items-center gap-2 bg-dark md:bg-primary p-3 rounded-[15px]">
          <BiSearch className="text-white text-2xl" />
          <input
            className="w-full bg-transparent text-white placeholder:text-gray-400 border-0 focus:outline-none"
            type="text"
            placeholder="Search for games or reviews"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-2 border-b border-[#989fab1e] px-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === "all"
              ? "text-white border-b-2 border-purple"
              : "text-gray-400 hover:text-white"
          }`}
        >
          All Reviews
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === "following"
              ? "text-white border-b-2 border-purple"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Following
        </button>
      </div>

      {activeTab === "following" && (
        <>
          {loading.fetchFollowing && (
            <p className="text-gray-400 text-sm">Loading reviews...</p>
          )}

          {!loading.fetchFollowing && errors.fetchFollowing && (
            <p className="text-red-400 text-sm">{errors.fetchFollowing}</p>
          )}

          {!loading.fetchFollowing &&
            !errors.fetchFollowing &&
            followingReviews.length === 0 && (
              <p className="text-gray-400 text-sm">
                No reviews from followed creators.
              </p>
            )}

          {!loading.fetchFollowing && followingReviews.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 gap-2 px-1">
                {followingReviews.map((review: ReviewSummary) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {followingReviewsMeta && (
                <Pagination
                  currentPage={followingReviewsMeta.page}
                  totalPages={followingReviewsMeta.lastPage}
                  onPageChange={setFollowingPage}
                />
              )}
            </>
          )}
        </>
      )}

      {activeTab === "all" && (
        <>
          {loading.search && (
            <p className="text-gray-400 text-sm">Loading reviews...</p>
          )}

          {!loading.search && errors.search && (
            <p className="text-red-400 text-sm">{errors.search}</p>
          )}

          {!loading.search && !errors.search && searchResults.length === 0 && (
            <p className="text-gray-400 text-sm">
              No reviews found. Try adjusting your search.
            </p>
          )}

          {!loading.search && searchResults.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 gap-2 px-1">
                {searchResults.map((review: ReviewSummary) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {searchMeta && (
                <Pagination
                  currentPage={searchMeta.page}
                  totalPages={searchMeta.lastPage}
                  onPageChange={setAllPage}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewSection;
