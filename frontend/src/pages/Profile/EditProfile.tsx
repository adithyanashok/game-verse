import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiEdit3, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ProfileImage from "./Components/ProfileImage";
import { useAppSelector } from "../../store/hooks";
import { useUserMutations, useUserProfile } from "../../hooks/useUser";
import { Spinner } from "../../components/common/Loader";

export default function EditProfile() {
  const navigate = useNavigate();

  const authUser = useAppSelector((state) => state.auth.user);
  const { data: profile } = useUserProfile(authUser?.id);
  const { updateProfile } = useUserMutations(authUser?.id);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const isOwnProfile = authUser?.id === profile?.id;

  const profilePreview = useMemo(
    () => ({
      name: name.trim() || "Unnamed Gamer",
      bio:
        bio.trim() ||
        "Tell players what kinds of games you love, what you review, or what keeps you coming back.",
    }),
    [bio, name],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfile.mutate(
      {
        name: name.trim(),
        bio: bio.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Profile updated!", {
            position: "top-right",
            autoClose: 1000,
            theme: "dark",
          });
          navigate(-1);
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : "Unable to update profile", {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
          });
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.16),transparent_32%),radial-gradient(circle_at_84%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-3 py-6 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            to={authUser ? `/profile/${authUser.id}` : "/profile"}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[#0d1424]/80 px-4 py-2 text-sm font-bold text-[#c8d3e4] transition hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.1)] hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to profile
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[linear-gradient(135deg,rgba(8,16,28,0.98)_0%,rgba(13,20,36,0.94)_55%,rgba(8,16,28,0.98)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(182,255,59,0.08),transparent_22%)]" />
                <div className="relative flex flex-col items-center px-6 py-8 text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#cbeafe]">
                    <FiEdit3 className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                    Profile editor
                  </div>

                  <ProfileImage isOwnProfile={isOwnProfile} />

                  <h1 className="mt-5 text-3xl font-black text-white">
                    {profilePreview.name}
                  </h1>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[#c8d3e4] sm:text-[15px]">
                    {profilePreview.bio}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20 sm:p-6">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                Edit details
              </p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Update your profile
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9aa7bd]">
                Refresh how you appear across reviews, comments, and community
                interactions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 text-white placeholder:text-[#6f7d94] focus:border-[rgba(0,212,255,0.34)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.14)]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
                  Bio
                </label>
                <textarea
                  placeholder="Write something about yourself..."
                  rows={6}
                  className="w-full resize-none rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 text-white placeholder:text-[#6f7d94] focus:border-[rgba(0,212,255,0.34)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.14)]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className="flex justify-end">
                  <span className="text-xs font-semibold text-[#9aa7bd]">
                    {bio.length}/280
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[rgba(0,212,255,0.12)] pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-[#c8d3e4] transition hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(0,212,255,0.18)] bg-[linear-gradient(90deg,rgba(0,212,255,0.2),rgba(0,212,255,0.1))] px-5 py-3 text-sm font-black text-white transition hover:border-[rgba(0,212,255,0.34)] hover:bg-[linear-gradient(90deg,rgba(0,212,255,0.28),rgba(0,212,255,0.14))] ${
                    updateProfile.isPending ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {updateProfile.isPending ? (
                    <Spinner className="h-5 w-5 border-2 text-white" />
                  ) : (
                    <>
                      <FiSave className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}
