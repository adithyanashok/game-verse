// CommentItem.tsx
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { OptionsMenu } from "../../Components/CommentOption";

dayjs.extend(relativeTime);

type Comment = {
  id: number;
  userId: number;
  username: string;
  comment: string;
  createdAt: string;
  isYourComment?: boolean;
};

type Props = {
  // root comment
  comment: Comment;

  // replies
  replies: Comment[];

  // replies visibility
  showReplies: boolean;
  toggleShowReplies: () => void;

  // reply input (root)
  showReplyBox: boolean;
  replyDraft: string;
  onReplyToggle: () => void;
  onReplyChange: (v: string) => void;
  onReplySubmit: () => void;

  // editing (root + reply)
  isEditing: boolean;
  editDraft: string;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onEditChange: (v: string) => void;

  // delete root
  onDelete: () => void;

  // reply edit/delete
  onEditReply: (replyId: number, text: string) => void;
  onDeleteReply: (replyId: number) => void;
};

const CommentItem: React.FC<Props> = React.memo(
  ({
    comment,
    replies,
    showReplies,
    toggleShowReplies,

    showReplyBox,
    replyDraft,
    onReplyToggle,
    onReplyChange,
    onReplySubmit,

    isEditing,
    editDraft,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onEditChange,

    onDelete,
    onEditReply,
    onDeleteReply,
  }) => {
    return (
      <div className="p-4 my-2 border border-[#989fab1e] rounded-xl">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center">
            <p className="text-white font-semibold text-sm">
              {comment.username}
            </p>
            <span className="text-[#989fab] text-xs">
              {dayjs(comment.createdAt).fromNow()}
            </span>
          </div>

          {comment.isYourComment && (
            <OptionsMenu onEdit={onStartEdit} onDelete={onDelete} />
          )}
        </div>

        {/* CONTENT */}
        {isEditing ? (
          <>
            <textarea
              value={editDraft}
              onChange={(e) => onEditChange(e.target.value)}
              rows={2}
              className="w-full mt-2 bg-[#1f1a2e] border border-[#989fab1e] rounded-lg p-2 text-sm text-white outline-none focus:border-[var(--color-purple)]"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={onCancelEdit}
                className="px-3 py-1 text-xs rounded-lg border border-gray-500 text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onSaveEdit}
                className="px-3 py-1 text-xs rounded-lg bg-[var(--color-purple)] text-white"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <p className="text-[#989fab] mt-2 whitespace-pre-line text-sm">
            {comment.comment}
          </p>
        )}

        {/* ACTIONS */}
        {!isEditing && (
          <div className="flex gap-4 mt-3">
            <button
              onClick={onReplyToggle}
              className="text-[var(--color-purple)] text-xs hover:underline"
            >
              {showReplyBox ? "Cancel" : "Reply"}
            </button>

            {replies.length > 0 && (
              <button
                onClick={toggleShowReplies}
                className="text-[var(--color-purple)] text-xs hover:underline"
              >
                {showReplies
                  ? "Hide replies"
                  : `View replies (${replies.length})`}
              </button>
            )}
          </div>
        )}

        {/* REPLY INPUT */}
        {showReplyBox && (
          <div className="mt-3">
            <textarea
              value={replyDraft}
              onChange={(e) => onReplyChange(e.target.value)}
              rows={2}
              placeholder="Write a reply..."
              className="w-full bg-[#1f1a2e] border border-[#989fab1e] rounded-lg p-2 text-sm text-white outline-none focus:border-[var(--color-purple)]"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={onReplySubmit}
                disabled={!replyDraft.trim()}
                className="px-3 py-1.5 text-xs rounded-full bg-[var(--color-purple)] text-white disabled:opacity-40"
              >
                Post Reply
              </button>
            </div>
          </div>
        )}

        {/* REPLIES */}
        {showReplies && replies.length > 0 && (
          <div className="mt-4 pl-4 border-l border-[#989fab1e] space-y-3">
            {replies.map((r) => (
              <div key={r.id} className="relative">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2 items-center">
                    <p className="text-white text-sm font-medium">
                      {r.username}
                    </p>
                    <span className="text-[#989fab] text-xs">
                      {dayjs(r.createdAt).fromNow()}
                    </span>
                  </div>

                  {r.isYourComment && (
                    <OptionsMenu
                      onEdit={() => onEditReply(r.id, r.comment)}
                      onDelete={() => onDeleteReply(r.id)}
                    />
                  )}
                </div>

                <p className="text-[#989fab] text-sm mt-1 whitespace-pre-line">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default CommentItem;
