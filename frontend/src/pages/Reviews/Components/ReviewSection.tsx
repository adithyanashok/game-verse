import React, { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";

import {
  clearSearchResults,
  fetchRecentReviews,
  fetchTrendingReviews,
  searchReviews,
} from "../../../features/reviews/reviewsSlice";
import type { ReviewSummary } from "../../../features/reviews/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import ReviewCard from "./ReviewCard";

const ReviewSection = () => {
  const dispatch = useAppDispatch();
  const { trending, recent, searchResults, loading, errors } = useAppSelector(
    (state: RootState) => state.reviews
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"recent" | "trending">("recent");

  useEffect(() => {
    dispatch(fetchTrendingReviews());
    dispatch(fetchRecentReviews());
  }, [dispatch]);

  const hasSearchResults = searchResults.length > 0;

  const displayedReviews: ReviewSummary[] = useMemo(() => {
    if (hasSearchResults) {
      return searchResults;
    }
    return activeTab === "recent" ? recent : trending;
  }, [activeTab, hasSearchResults, recent, searchResults, trending]);

  const isLoading =
    loading.search ||
    (activeTab === "recent" ? loading.recent : loading.trending);

  const activeError = hasSearchResults
    ? errors.search
    : activeTab === "recent"
    ? errors.recent
    : errors.trending;

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      dispatch(clearSearchResults());
      return;
    }
    dispatch(searchReviews({ query: trimmed }));
  };

  return (
    <div className="md:w-[83%] p-2 md:p-10 space-y-10">
      <div className="md:border rounded-[16px] md:bg-dark md:border-[#989fab1e] md:p-5">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 bg-dark md:bg-primary p-3 rounded-[15px]"
        >
          <BiSearch className="text-white text-2xl" />
          <input
            className="w-full bg-transparent text-white placeholder:text-gray-400 border-0 focus:outline-none"
            type="text"
            placeholder="Search for games or reviews"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="submit"
            className="hidden md:block bg-[var(--color-purple)] text-white text-sm font-medium px-4 py-2 rounded-full"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setActiveTab("recent")}
            className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
              activeTab === "recent"
                ? "text-[var(--color-purple)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Recent
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("trending")}
            className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
              activeTab === "trending"
                ? "text-[var(--color-purple)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Trending
          </button>
          {hasSearchResults && (
            <button
              type="button"
              onClick={() => dispatch(clearSearchResults())}
              className="ml-auto text-xs text-gray-400 hover:text-white"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      <div className="min-h-[200px]">
        {isLoading && (
          <p className="text-gray-400 text-sm">Loading reviews...</p>
        )}

        {!isLoading && activeError && (
          <p className="text-red-400 text-sm">{activeError}</p>
        )}

        {!isLoading && !activeError && displayedReviews.length === 0 && (
          <p className="text-gray-400 text-sm">
            No reviews found. Try adjusting your search.
          </p>
        )}

        {!isLoading && !activeError && displayedReviews.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-5">
            {displayedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
