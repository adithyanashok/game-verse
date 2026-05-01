import { useMemo, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store";
import debounce from "../../../utils/debouncer";
import { useSearchReviews, useFollowingReviews } from "./useReviewQueries";

const LIMIT = 20;
export type TabType = "following" | "all";

export const useReviewSection = () => {
  const accessToken = useAppSelector((s: RootState) => s.auth.accessToken);

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [allPage, setAllPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);

  const {
    data: allData,
    isLoading: loadingSearch,
    error: searchError
  } = useSearchReviews(searchTerm, allPage, LIMIT);

  const {
    data: followingData,
    isLoading: loadingFetchFollowing,
    error: followingError
  } = useFollowingReviews(followingPage, LIMIT);

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
    displayedAllReviews: allData?.reviews ?? [],
    displayedAllMeta: allData?.meta ?? null,
    loadingSearch,
    errorSearch: searchError instanceof Error ? searchError.message : null,
    setAllPage,
    displayedFollowingReviews: followingData?.reviews ?? [],
    displayedFollowingMeta: followingData?.meta ?? null,
    loadingFetchFollowing,
    errorFetchFollowing: followingError instanceof Error ? followingError.message : null,
    setFollowingPage,
  };
};
