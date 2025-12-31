import { FiEdit2 } from "react-icons/fi";
import { useState, type ChangeEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { uploadUserImage } from "../../../features/user/userSlice";
import { toast } from "react-toastify";
import type { RootState } from "../../../store";
import ImageCropper from "./ImageCropper";

export default function ProfileImage({
  isOwnProfile,
}: {
  isOwnProfile: boolean;
}) {
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { profile } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

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

  const handleCropComplete = async (file: File) => {
    setCropImageSrc(null);

    try {
      await dispatch(uploadUserImage({ file })).unwrap();

      toast.success("Profile image updated!", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
    } catch (error) {
      toast.error(String(error), {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  const handleCancelCrop = () => {
    setCropImageSrc(null);
  };

  return (
    <div className="relative w-24 h-24">
      <img
        src={`https://${profile?.profileImage}`}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-[#2a1b45] shadow-md object-cover"
      />

      {isOwnProfile && (
        <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition">
          <FiEdit2 className="text-[#2a1b45] text-sm" />
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
