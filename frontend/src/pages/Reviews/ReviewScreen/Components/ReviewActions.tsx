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

  const handleConfirmDelete = useCallback(async () => {
    await onDelete();
    setOpenDeleteModal(false);
  }, [onDelete]);

  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {/* Like button */}
      <button
        type="button"
        onClick={onLike}
        disabled={loadingLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
          liked
            ? "bg-[var(--color-purple)] text-white border-transparent"
            : "border-[var(--color-purple)] text-[var(--color-purple)] hover:bg-[var(--color-purple)] hover:text-white"
        } ${loadingLike ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <HiThumbUp />
        <span>{liked ? "Liked" : "Like"}</span>
        <span className="text-xs">{likeCount}</span>
      </button>

      {/* Views */}
      <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#989fab1e] text-gray-300">
        <BsEye className="text-[var(--color-purple)]" />
        Views {views}
      </span>

      {/* Owner actions */}
      {isOwner && (
        <>
          <button
            type="button"
            onClick={() => setOpenDeleteModal(true)}
            disabled={loadingLike}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-full transition-colors bg-red-600 hover:bg-red-500"
          >
            <BiBasket />
            <span>Delete</span>
          </button>

          <button
            type="button"
            onClick={onEdit}
            disabled={loadingLike}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-full transition-colors bg-[#6711bf] hover:bg-[#290d44]"
          >
            <BiEdit />
            <span>Edit</span>
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
