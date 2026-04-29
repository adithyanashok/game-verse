import type { TabType } from "../hooks/useReviewSection";

interface Props {
  activeTab: TabType;
  showFollowing: boolean;
  onTabChange: (tab: TabType) => void;
}

const ReviewTabs = ({ activeTab, showFollowing, onTabChange }: Props) => (
  <div className="flex gap-2 border-b border-[#989fab1e] px-2">
    <button
      onClick={() => onTabChange("all")}
      className={`pb-2 text-sm font-medium transition ${
        activeTab === "all"
          ? "text-white border-b-2 border-purple"
          : "text-gray-400 hover:text-white"
      }`}
    >
      All Reviews
    </button>
    {showFollowing && (
      <button
        onClick={() => onTabChange("following")}
        className={`pb-2 text-sm font-medium transition ${
          activeTab === "following"
            ? "text-white border-b-2 border-purple"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Following
      </button>
    )}
  </div>
);

export default ReviewTabs;
