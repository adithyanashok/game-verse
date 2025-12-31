import { useState } from "react";
import ProfileImage from "./Components/ProfileImage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";
import { updateUserProfile } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function EditProfile() {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.auth.user);
  const { profile } = useAppSelector((state) => state.user);

  const [name, setName] = useState(authUser?.name || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, bio });
    try {
      const result = await dispatch(updateUserProfile({ name, bio }));

      if (updateUserProfile.fulfilled.match(result)) {
        toast.success("Profile updated!", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
        setTimeout(() => {
          navigator(-1);
        }, 2000);
      }
    } catch (error) {
      toast.error(String(error), {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  const isOwnProfile = authUser?.id === profile?.id;

  return (
    <>
      <ResponsiveNavbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-dark rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Edit Profile
          </h2>
          {/* Profile Image */}
          <div className="flex justify-center">
            <ProfileImage isOwnProfile={isOwnProfile} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border text-white border-gray-300/10 focus:ring-2 focus:ring-black focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Bio
              </label>
              <textarea
                placeholder="Write something about yourself..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border text-white border-gray-300/10 focus:ring-2 focus:ring-black focus:outline-none resize-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-purple text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
