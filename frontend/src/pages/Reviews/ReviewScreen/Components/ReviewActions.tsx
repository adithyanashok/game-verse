// src/pages/Review/Components/ReviewActions.tsx
import React, { type FC, useState, useCallback } from "react";
import { HiThumbUp } from "react-icons/hi";
import { BiBasket, BiEdit } from "react-icons/bi";
import DeleteConfirmModal from "../../../../components/common/DeletePopup";
import { BsEye } from "react-icons/bs";
interface ReviewActionsProps {
  liked: boolean;
  likeCount: number;
  views: number;
  loadingLike: boolean;
  isOwner: boolean;
  onLike: () => void;
  onDelete: () => Promise<void> | void;
  onEdit: () => void;
}

const ReviewActions: FC<ReviewActionsProps> = ({
  liked,
  likeCount,
  views,
  loadingLike,
  isOwner,
  onLike,
  onDelete,
  onEdit,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [likePulse, setLikePulse] = useState(false);

  const handleConfirmDelete = useCallback(async () => {
    await onDelete();
    setOpenDeleteModal(false);
  }, [onDelete]);

  const handleLikeClick = useCallback(() => {
    setLikePulse(true);
    window.setTimeout(() => setLikePulse(false), 360);
    onLike();
  }, [onLike]);

  return (
    <div className="flex flex-wrap gap-3 mt-5 mb-5">
      <button
        type="button"
        onClick={handleLikeClick}
        disabled={loadingLike}
        className={`flex items-center gap-1 h-7 px-2 md:py-1 rounded-full border transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)] ${
          liked
            ? "bg-[var(--color-lime)] text-[#07101a] border-transparent"
            : "border-[var(--color-blue)] text-[var(--color-blue)] hover:bg-[rgba(0,212,255,0.1)]"
        } ${likePulse ? "animate-pulse scale-105" : ""} ${
          loadingLike ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <HiThumbUp />
        <span className="text-[12px]">{liked ? "Liked" : "Like"}</span>
        <span className="text-[12px]">{likeCount}</span>
      </button>

      <span className="flex items-center gap-2 h-7 px-2 md:py-2 rounded-full border border-[rgba(0,212,255,0.14)] text-[var(--color-blue)] text-[12px]">
        <BsEye className="text-[var(--color-blue)]" />
        {views}
      </span>

      {isOwner && (
        <>
          <button
            type="button"
            onClick={() => setOpenDeleteModal(true)}
            disabled={loadingLike}
            className="flex items-center gap-2 h-7 px-2 md:py-2 text-white rounded-full transition duration-150 bg-red-600 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <BiBasket />
            <span className="text-[12px]">Delete</span>
          </button>

          <button
            type="button"
            onClick={onEdit}
            disabled={loadingLike}
            className="flex items-center gap-2 h-7 px-2 md:py-2 text-[#07101a] rounded-full transition duration-150 bg-[var(--color-blue)] hover:bg-[var(--color-lime)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
          >
            <BiEdit />
            <span className="text-[12px]">Edit</span>
          </button>

          <DeleteConfirmModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Review"
            message="Are you sure you want to delete this review? This action cannot be undone."
          />
        </>
      )}
    </div>
  );
};

export default React.memo(ReviewActions);

