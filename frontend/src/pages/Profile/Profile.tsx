import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUserProfile,
  followUser,
  unfollowUser,
} from "../../features/user/userSlice";
import { getByUserId } from "../../features/reviews/reviewsSlice";
import AnalyticsDashboard from "./Components/AnalyticsDashboard";
import ProfileImage from "./Components/ProfileImage";
import { toast } from "react-toastify";
import ReviewCardProfile from "../Reviews/Components/ReviewCardProfile";

const ProfilePage = () => {
  const { userId: userIdParam } = useParams();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("Reviews");
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
  const tabs = !isOwnProfile ? ["Reviews"] : ["Reviews", "Analytics"];

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
        <Link
          to={`/edit-profile/${authUser.id}`}
          className="mt-5 px-6 py-2 rounded-full bg-[#1f1233] text-gray-300 font-medium shadow-md"
        >
          Edit
        </Link>
      );
    }

    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    }

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
    <div className="min-h-screen bg-primary text-white flex flex-col items-center py-10 px-2 md:px-4">
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

      {!loading && profile && (
        <>
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <ProfileImage isOwnProfile={isOwnProfile} />

            {/* User Name */}
            <h2 className="text-2xl font-semibold mt-4">
              {profile.name || "Unnamed Gamer"}
            </h2>

            {/* User Bio */}
            <p className="text-gray-400 text-sm max-w-md mt-2">
              {profile.bio || "No bio added yet."}
            </p>

            {/* Following and Followers Count */}
            <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
              <span className="font-semibold text-white">
                {profile.followersCount}
              </span>{" "}
              followers ·{" "}
              <span className="font-semibold text-white">
                {profile.followingCount}
              </span>{" "}
              following
            </div>

            {/* Action Buttons */}
            {renderActionButton()}
            {followError && (
              <p className="mt-2 text-sm text-red-400">{followError}</p>
            )}
          </div>
          {userReviews.length !== 0 ? (
            <>
              {/* Tabs */}
              <div className="flex mt-10 border-b border-gray-700 w-full max-w-3xl justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab + new Date().getMilliseconds()}
                    className={`px-4 py-2 text-sm font-medium transition relative ${
                      activeTab === tab
                        ? "text-[#b072ff]"
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
                    <Link key={review.createdAt} to={`/review/${review.id}`}>
                      <ReviewCardProfile
                        key={index}
                        image={review.imageUrl}
                        title={review.title}
                      />
                    </Link>
                  ))}
                </div>
              )}
              {activeTab === "Analytics" && <AnalyticsDashboard />}
            </>
          ) : (
            <p className="mt-10">No Reviews Posted</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
