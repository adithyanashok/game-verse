import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiBarChart2, FiEdit3, FiFileText, FiUserPlus, FiUsers } from "react-icons/fi";
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
import ReviewCard from "../Reviews/Components/ReviewCard";
import { AppLoader, Spinner } from "../../components/common/Loader";
import { isCacheFresh } from "../../utils/cache";

const ProfilePage = () => {
  const { userId: userIdParam } = useParams();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("Reviews");
  const authUser = useAppSelector((state) => state.auth.user);
  const {
    profile,
    loading,
    error,
    followLoading,
    followError,
    profilesById,
    fetchedAtById,
  } = useAppSelector((state) => state.user);
  const {
    userReviews,
    userReviewsByUserId,
    userReviewsFetchedAtByUserId,
    loading: reviewLoading,
  } = useAppSelector((state) => state.reviews);

  const targetUserId = useMemo(() => {
    if (userIdParam) {
      const parsed = Number(userIdParam);
      return Number.isNaN(parsed) ? undefined : parsed;
    }

    return authUser?.id;
  }, [userIdParam, authUser?.id]);

  const displayedProfile =
    typeof targetUserId === "number"
      ? profilesById[targetUserId] ??
        (profile?.id === targetUserId ? profile : null)
      : profile;
  const displayedReviews =
    typeof targetUserId === "number"
      ? userReviewsByUserId[targetUserId] ??
        (profile?.id === targetUserId ? userReviews : [])
      : userReviews;

  useEffect(() => {
    if (typeof targetUserId === "number") {
      const pendingRequests: Array<{ abort: () => void }> = [];
      const hasFreshProfile = isCacheFresh(fetchedAtById[targetUserId]);
      const hasFreshReviews = isCacheFresh(userReviewsFetchedAtByUserId[targetUserId]);

      if (!hasFreshProfile && !loading) {
        pendingRequests.push(dispatch(fetchUserProfile(targetUserId)));
      }

      if (!hasFreshReviews && !reviewLoading.fetchByUser) {
        pendingRequests.push(
          dispatch(getByUserId({ id: targetUserId, limit: 20, page: 1 })),
        );
      }

      return () => {
        pendingRequests.forEach((request) => request.abort());
      };
    }
  }, [
    dispatch,
    fetchedAtById,
    loading,
    reviewLoading.fetchByUser,
    targetUserId,
    userReviewsFetchedAtByUserId,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    }
  }, [error]);

  const isOwnProfile = authUser?.id === displayedProfile?.id;
  const canFollow = !isOwnProfile && typeof targetUserId === "number";
  const tabs = !isOwnProfile ? ["Reviews"] : ["Reviews", "Analytics"];

  const handleFollowToggle = () => {
    if (!canFollow || typeof targetUserId !== "number") {
      return;
    }

    if (displayedProfile?.isFollowing) {
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
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-5 py-3 text-sm font-black text-white transition hover:border-[rgba(0,212,255,0.34)] hover:bg-[rgba(0,212,255,0.14)]"
        >
          <FiEdit3 className="h-4 w-4" />
          Edit Profile
        </Link>
      );
    }

    return (
      <button
        onClick={handleFollowToggle}
        disabled={followLoading}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-black text-white transition ${
          displayedProfile?.isFollowing
            ? "border-white/10 bg-white/8 hover:bg-white/12"
            : "border-[rgba(0,212,255,0.18)] bg-[linear-gradient(90deg,rgba(0,212,255,0.2),rgba(0,212,255,0.1))] hover:border-[rgba(0,212,255,0.34)] hover:bg-[linear-gradient(90deg,rgba(0,212,255,0.28),rgba(0,212,255,0.14))]"
        } ${followLoading ? "cursor-not-allowed opacity-70" : ""}`}
      >
        {followLoading ? (
          <Spinner className="h-5 w-5 border-2 text-white" />
        ) : (
          <>
            <FiUserPlus className="h-4 w-4" />
            {displayedProfile?.isFollowing ? "Following" : "Follow"}
          </>
        )}
      </button>
    );
  };

  if (typeof targetUserId !== "number") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.16),transparent_32%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-4 py-10 text-white">
        <div className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 px-6 py-8 text-center text-[#9aa7bd] shadow-xl shadow-black/20">
          {!authUser
            ? "Sign in to view profiles and manage follow status."
            : "Unable to determine which profile to load."}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.16),transparent_32%),radial-gradient(circle_at_84%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-3 py-6 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {loading && (
          <AppLoader label="Loading profile..." />
        )}

        {!loading && displayedProfile && (
          <>
            <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[linear-gradient(135deg,rgba(8,16,28,0.98)_0%,rgba(13,20,36,0.94)_55%,rgba(8,16,28,0.98)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(182,255,59,0.08),transparent_22%)]" />
                <div className="relative grid gap-6 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:px-8">
                  <div className="mx-auto lg:mx-0">
                    <ProfileImage isOwnProfile={isOwnProfile} />
                  </div>

                  <div className="text-center lg:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#cbeafe]">
                        <FiUsers className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                        Player profile
                      </span>
                      {isOwnProfile ? (
                        <span className="rounded-full bg-[var(--color-lime)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#07101a]">
                          Your space
                        </span>
                      ) : null}
                    </div>

                    <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                      {displayedProfile.name || "Unnamed Gamer"}
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#c8d3e4] sm:text-[15px]">
                      {displayedProfile.bio || "No bio added yet."}
                    </p>
                  </div>

                  <div className="flex justify-center lg:justify-end">
                    {renderActionButton()}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[10px] border border-[rgba(182,255,59,0.16)] bg-[linear-gradient(180deg,rgba(182,255,59,0.14),rgba(182,255,59,0.04))] p-4 shadow-lg shadow-black/10">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                    Followers
                  </p>
                  <FiUsers className="h-4 w-4 text-[var(--color-lime)]" />
                </div>
                <p className="mt-3 text-2xl font-black text-white">
                  {displayedProfile.followersCount}
                </p>
              </div>

              <div className="rounded-[10px] border border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))] p-4 shadow-lg shadow-black/10">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                    Following
                  </p>
                  <FiUserPlus className="h-4 w-4 text-[var(--color-blue)]" />
                </div>
                <p className="mt-3 text-2xl font-black text-white">
                  {displayedProfile.followingCount}
                </p>
              </div>

              <div className="rounded-[10px] border border-[rgba(248,184,78,0.16)] bg-[linear-gradient(180deg,rgba(248,184,78,0.14),rgba(248,184,78,0.04))] p-4 shadow-lg shadow-black/10">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                    Reviews posted
                  </p>
                  <FiFileText className="h-4 w-4 text-[#f8b84e]" />
                </div>
                <p className="mt-3 text-2xl font-black text-white">
                  {displayedReviews.length}
                </p>
              </div>
            </section>

            {followError && (
              <p className="rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {followError}
              </p>
            )}

            <section className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(0,212,255,0.12)] pb-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                    Profile view
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    Activity
                  </h2>
                </div>

                <div className="inline-flex rounded-full border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        activeTab === tab
                          ? "bg-[rgba(0,212,255,0.12)] text-white"
                          : "text-[#9aa7bd] hover:text-white"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === "Analytics" ? (
                        <span className="inline-flex items-center gap-2">
                          <FiBarChart2 className="h-4 w-4" />
                          {tab}
                        </span>
                      ) : (
                        tab
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "Reviews" && (
                <>
                  {displayedReviews.length !== 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {displayedReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[10px] border border-dashed border-white/10 bg-[#0d1424]/70 px-6 py-14 text-center shadow-xl shadow-black/10">
                      <FiFileText className="mx-auto h-8 w-8 text-[#9aa7bd]" />
                      <h3 className="mt-4 text-2xl font-black text-white">
                        No reviews posted
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#9aa7bd]">
                        This profile has not published any reviews yet.
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeTab === "Analytics" && (
                <div className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-4 shadow-xl shadow-black/20 sm:p-6">
                  <AnalyticsDashboard />
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
