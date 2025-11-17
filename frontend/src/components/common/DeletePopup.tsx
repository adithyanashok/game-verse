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
    <div className="fixed inset-0 bg-[#191022]/70 flex items-center justify-center z-50">
      {" "}
      <div className="bg-[#191022] text-white p-6 rounded-lg shadow-xl w-[350px]">
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
