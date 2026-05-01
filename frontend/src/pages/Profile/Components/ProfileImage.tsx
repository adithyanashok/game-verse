import { FiEdit2, FiUser } from "react-icons/fi";
import { useMemo, useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useUserProfile, useUserMutations } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import ImageCropper from "./ImageCropper";

const getProfileImageUrl = (profileImage?: string) => {
  if (!profileImage) return "";
  return profileImage.startsWith("http") ? profileImage : `https://${profileImage}`;
};

const getInitials = (name?: string) => {
  if (!name) return "U";

  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

export default function ProfileImage({
  isOwnProfile,
}: {
  isOwnProfile: boolean;
}) {
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authUser = useAppSelector((state) => state.auth.user);
  const { data: profile } = useUserProfile(isOwnProfile ? authUser?.id : undefined);
  const { uploadImage } = useUserMutations(authUser?.id);

  const imageUrl = useMemo(
    () => getProfileImageUrl(profile?.profileImage),
    [profile?.profileImage],
  );
  const profileName = profile?.name || "Unnamed Gamer";
  const initials = getInitials(profileName);
  const showProfileImage = Boolean(imageUrl) && !imageFailed;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return toast.error("Only JPG, JPEG and PNG allowed", {
        autoClose: 1000,
      });
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setCropImageSrc(reader.result?.toString() || null);
    });
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleCropComplete = (file: File) => {
    setCropImageSrc(null);

    uploadImage.mutate(file, {
      onSuccess: () => {
        setImageFailed(false);
        toast.success("Profile image updated!", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Upload failed", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });
      },
    });
  };

  const handleCancelCrop = () => {
    setCropImageSrc(null);
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = "none";
    setImageFailed(true);
  };

  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.18),rgba(7,11,22,0.9))] shadow-[0_20px_50px_rgba(0,0,0,0.34)]">
        {showProfileImage ? (
          <img
            src={imageUrl}
            alt={profileName}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,rgba(0,212,255,0.16),transparent_40%),linear-gradient(180deg,rgba(7,11,22,0.82),rgba(7,11,22,0.98))] text-2xl font-black text-[#cbeafe] sm:text-3xl">
            {initials === "U" ? <FiUser className="h-8 w-8 sm:h-10 sm:w-10" /> : initials}
          </div>
        )}
      </div>

      {isOwnProfile && (
        <label className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#f8fafc] shadow-lg transition hover:bg-white">
          <FiEdit2 className="text-sm text-[#07101a]" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>
      )}

      {cropImageSrc && (
        <ImageCropper
          imageSrc={cropImageSrc}
          onCancel={handleCancelCrop}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
