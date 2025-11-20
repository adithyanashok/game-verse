import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUserProfile,
  followUser,
  unfollowUser,
} from "../../features/user/userSlice";
import { getByUserId } from "../../features/reviews/reviewsSlice";
import AnalyticsDashboard from "./Components/AnalyticsDashboard";

const ProfilePage = () => {
  const { userId: userIdParam } = useParams();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("Reviews");
  const tabs = ["Reviews", "Analytics"];
  const authUser = useAppSelector((state) => state.auth.user);
  const { profile, loading, error, followLoading, followError } =
    useAppSelector((state) => state.user);

  const { userReviews } = useAppSelector((state) => state.reviews);

  const targetUserId = useMemo(() => {
    if (userIdParam) {
      const parsed = Number(userIdParam);
      return Number.isNaN(parsed) ? undefined : parsed;
    }

    return authUser?.id;
  }, [userIdParam, authUser?.id]);

  useEffect(() => {
    if (typeof targetUserId === "number") {
      void dispatch(fetchUserProfile(targetUserId));
      void dispatch(getByUserId({ id: targetUserId, limit: 20, page: 1 }));
    }
  }, [dispatch, targetUserId]);

  const isOwnProfile = authUser?.id === profile?.id;
  const canFollow = !isOwnProfile && typeof targetUserId === "number";

  const handleFollowToggle = () => {
    if (!canFollow || typeof targetUserId !== "number") {
      return;
    }

    if (profile?.isFollowing) {
      void dispatch(unfollowUser(targetUserId));
    } else {
      void dispatch(followUser(targetUserId));
    }
  };

  const renderActionButton = () => {
    if (!authUser) {
      return null;
    }

    if (!canFollow) {
      return (
        <span className="mt-5 px-6 py-2 rounded-full bg-[#1f1233] text-gray-300 font-medium shadow-md">
          Edit
        </span>
      );
    }

    console.log(profile);

    return (
      <button
        onClick={handleFollowToggle}
        disabled={followLoading}
        className={`mt-5 px-6 py-2 rounded-full transition font-medium shadow-md ${
          profile?.isFollowing
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-[#6a0dad] hover:bg-[#7b26e4]"
        } ${followLoading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {followLoading
          ? "Loading..."
          : profile?.isFollowing
          ? "Following"
          : "Follow"}
      </button>
    );
  };

  return (
    <>
      <ResponsiveNavbar />
      <div className="min-h-screen bg-primary text-white flex flex-col items-center py-10 px-4">
        {!authUser && (
          <p className="mb-6 text-sm text-red-400">
            Sign in to view profiles and manage follow status.
          </p>
        )}

        {typeof targetUserId !== "number" && (
          <div className="text-center text-gray-400">
            Unable to determine which profile to load.
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 mt-10">Loading...</div>
        )}

        {error && !loading && (
          <div className="text-center text-red-500 mt-10">{error}</div>
        )}

        {!loading && !error && profile && (
          <>
            <div className="flex flex-col items-center text-center">
              <img
                src="https://i.imgur.com/8Km9tLL.png"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[#2a1b45] shadow-lg"
              />
              <h2 className="text-2xl font-semibold mt-4">
                {profile.name || "Unnamed Gamer"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{profile.email}</p>
              <p className="text-gray-400 text-sm max-w-md mt-2">
                {profile.bio || "No bio added yet."}
              </p>
              <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
                <span className="font-semibold text-white">
                  {profile.followerCount}
                </span>{" "}
                followers ·{" "}
                <span className="font-semibold text-white">
                  {profile.followingCount}
                </span>{" "}
                following
              </div>
              {renderActionButton()}
              {followError && (
                <p className="mt-2 text-sm text-red-400">{followError}</p>
              )}
            </div>

            {/* Tabs */}

            <div className="flex mt-10 border-b border-gray-700 w-full max-w-3xl justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium transition relative ${
                    activeTab === tab
                      ? "text-[#b072ff]" // active tab color
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}

                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b072ff]"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Placeholder Game Cards */}
            {activeTab === "Reviews" && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full max-w-5xl">
                {userReviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-[#1a102d] rounded-xl p-2 hover:scale-105 transition transform cursor-pointer shadow-lg"
                  >
                    <img
                      src={review.imageUrl}
                      alt={review.title}
                      className="rounded-lg w-full h-44 object-cover"
                    />
                    <p className="mt-2 text-center text-sm text-gray-300">
                      {review.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "Analytics" && <AnalyticsDashboard />}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
