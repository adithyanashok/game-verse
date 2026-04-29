// CommentItem.tsx
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { OptionsMenu } from "../../Components/CommentOption";
import { FiUser } from "react-icons/fi";

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

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const AvatarInitials = ({ name }: { name: string }) => (
  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(0,212,255,0.2)] bg-[linear-gradient(135deg,#10243a,#18102d)] text-xs font-black text-[var(--color-lime)]">
    {getInitials(name) || <FiUser className="h-4 w-4" />}
  </div>
);

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
      <div className="my-2 rounded-[8px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/46 p-4 transition duration-150 hover:border-[rgba(0,212,255,0.26)]">
        <div className="flex justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <AvatarInitials name={comment.username} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-white">
                  {comment.username}
                </p>
                <span className="text-xs text-[#9aa7bd]">
                  {dayjs(comment.createdAt).fromNow()}
                </span>
              </div>

              {isEditing ? (
                <>
                  <textarea
                    value={editDraft}
                    onChange={(e) => onEditChange(e.target.value)}
                    rows={2}
                    className="mt-2 w-full rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424] p-2 text-sm text-white outline-none transition duration-150 focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[rgba(0,212,255,0.18)]"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={onCancelEdit}
                      className="rounded-full border border-gray-500 px-3 py-1 text-xs text-gray-300 transition duration-150 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onSaveEdit}
                      className="rounded-full bg-[var(--color-lime)] px-3 py-1 text-xs font-bold text-[#07101a] transition duration-150 hover:bg-[#ccff6f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#b8c3d4]">
                  {comment.comment}
                </p>
              )}
            </div>
          </div>

          {comment.isYourComment && (
            <OptionsMenu onEdit={onStartEdit} onDelete={onDelete} />
          )}
        </div>

        {!isEditing && (
          <div className="ml-12 mt-3 flex gap-4">
            <button
              onClick={onReplyToggle}
              className="text-xs font-bold text-[var(--color-blue)] transition duration-150 hover:text-[var(--color-lime)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
            >
              {showReplyBox ? "Cancel" : "Reply"}
            </button>

            {replies.length > 0 && (
              <button
                onClick={toggleShowReplies}
                className="text-xs font-bold text-[var(--color-blue)] transition duration-150 hover:text-[var(--color-lime)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
              >
                {showReplies
                  ? "Hide replies"
                  : `View replies (${replies.length})`}
              </button>
            )}
          </div>
        )}

        {showReplyBox && (
          <div className="ml-12 mt-3">
            <textarea
              value={replyDraft}
              onChange={(e) => onReplyChange(e.target.value)}
              rows={2}
              placeholder="Write a reply..."
              className="w-full rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#0d1424] p-2 text-sm text-white outline-none transition duration-150 focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[rgba(0,212,255,0.18)]"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={onReplySubmit}
                disabled={!replyDraft.trim()}
                className="rounded-full bg-[var(--color-lime)] px-3 py-1.5 text-xs font-bold text-[#07101a] transition duration-150 hover:bg-[#ccff6f] disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
              >
                Post Reply
              </button>
            </div>
          </div>
        )}

        {showReplies && replies.length > 0 && (
          <div className="ml-4 mt-4 space-y-3 border-l border-[rgba(0,212,255,0.22)] pl-5">
            {replies.map((r) => (
              <div key={r.id} className="relative rounded-[8px] bg-[#0d1424]/54 p-3">
                <span className="absolute -left-5 top-6 h-px w-4 bg-[rgba(0,212,255,0.22)]" />
                <div className="flex justify-between gap-3">
                  <div className="flex gap-3">
                    <AvatarInitials name={r.username} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-white">
                          {r.username}
                        </p>
                        <span className="text-xs text-[#9aa7bd]">
                          {dayjs(r.createdAt).fromNow()}
                        </span>
                      </div>
                      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#b8c3d4]">
                        {r.comment}
                      </p>
                    </div>
                  </div>

                  {r.isYourComment && (
                    <OptionsMenu
                      onEdit={() => onEditReply(r.id, r.comment)}
                      onDelete={() => onDeleteReply(r.id)}
                    />
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default CommentItem;
