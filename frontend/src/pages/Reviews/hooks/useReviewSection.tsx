import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import { isCacheFresh } from "../../../utils/cache";
import {
  fetchFollowingReviews,
  searchReviews,
} from "../../../features/reviews/reviewsSlice";
import debounce from "../../../utils/debouncer";

const LIMIT = 20;
export type TabType = "following" | "all";

export const useReviewSection = () => {
  const dispatch = useAppDispatch();

  const searchResults = useAppSelector(
    (s: RootState) => s.reviews.searchResults,
  );
  const searchMeta = useAppSelector((s: RootState) => s.reviews.searchMeta);
  const searchResultsByKey = useAppSelector(
    (s: RootState) => s.reviews.searchResultsByKey,
  );
  const searchMetaByKey = useAppSelector(
    (s: RootState) => s.reviews.searchMetaByKey,
  );
  const searchFetchedAtByKey = useAppSelector(
    (s: RootState) => s.reviews.searchFetchedAtByKey,
  );
  const followingReviews = useAppSelector(
    (s: RootState) => s.reviews.followingReviews,
  );
  const followingReviewsMeta = useAppSelector(
    (s: RootState) => s.reviews.followingReviewsMeta,
  );
  const followingReviewsByKey = useAppSelector(
    (s: RootState) => s.reviews.followingReviewsByKey,
  );
  const followingReviewsMetaByKey = useAppSelector(
    (s: RootState) => s.reviews.followingReviewsMetaByKey,
  );
  const followingFetchedAtByKey = useAppSelector(
    (s: RootState) => s.reviews.followingFetchedAtByKey,
  );
  const loadingSearch = useAppSelector(
    (s: RootState) => s.reviews.loading.search,
  );
  const loadingFetchFollowing = useAppSelector(
    (s: RootState) => s.reviews.loading.fetchFollowing,
  );
  const errorSearch = useAppSelector((s: RootState) => s.reviews.errors.search);
  const errorFetchFollowing = useAppSelector(
    (s: RootState) => s.reviews.errors.fetchFollowing,
  );
  const accessToken = useAppSelector((s: RootState) => s.auth.accessToken);

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [allPage, setAllPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);

  const allRequestKey = useMemo(
    () =>
      JSON.stringify({
        scope: "all",
        query: searchTerm || "",
        page: allPage,
        limit: LIMIT,
      }),
    [allPage, searchTerm],
  );

  const followingRequestKey = useMemo(
    () =>
      JSON.stringify({ scope: "following", page: followingPage, limit: LIMIT }),
    [followingPage],
  );

  const displayedAllReviews =
    searchResultsByKey[allRequestKey] ?? searchResults;
  const displayedAllMeta = searchMetaByKey[allRequestKey] ?? searchMeta;
  const displayedFollowingReviews =
    followingReviewsByKey[followingRequestKey] ?? followingReviews;
  const displayedFollowingMeta =
    followingReviewsMetaByKey[followingRequestKey] ?? followingReviewsMeta;
  const allFetchedAt = searchFetchedAtByKey[allRequestKey];
  const followingFetchedAt = followingFetchedAtByKey[followingRequestKey];

  useEffect(() => {
    if (activeTab !== "following") return;
    if (!accessToken) return;
    if (isCacheFresh(followingFetchedAt)) return;

    const request = dispatch(
      fetchFollowingReviews({
        page: followingPage,
        limit: LIMIT,
      }),
    );
    return () => request.abort();
  }, [
    accessToken,
    activeTab,
    dispatch,
    followingFetchedAt,
    followingPage,
    followingRequestKey,
  ]);

  useEffect(() => {
    if (activeTab !== "all") return;
    if (isCacheFresh(allFetchedAt)) return;

    const request = dispatch(
      searchReviews({ page: allPage, limit: LIMIT, query: searchTerm || null }),
    );
    return () => request.abort();
  }, [
    activeTab,
    allFetchedAt,
    allPage,
    allRequestKey,
    dispatch,
    searchTerm,
  ]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setAllPage(1);
        setFollowingPage(1);
      }, 500),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === "following" && !accessToken) return;
    setActiveTab(tab);
  };

  return {
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
  };
};
