import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteConfirmModal: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this?",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#070b16]/80 flex items-center justify-center z-50">
      <div className="w-[350px] rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424] p-6 text-white shadow-2xl shadow-black/30">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="mb-6 text-gray-300">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
