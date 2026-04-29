// src/pages/Review/Components/CommentsSection.tsx
import React, {
  type FC,
  useMemo,
  useState,
  useCallback,
  type ChangeEvent,
} from "react";
import dayjs from "dayjs";
import { Virtuoso } from "react-virtuoso";
import CommentItem from "./CommentItem";

import relativeTime from "dayjs/plugin/relativeTime";
import type { ReviewComment } from "../../../../features/reviews/types";

dayjs.extend(relativeTime);
type Comment = {
  id: number;
  userId: number;
  comment: string;
  createdAt: string;
  parentCommentId?: number | null;
  isYourComment?: boolean;
  username: string;
};

interface CommentsSectionProps {
  comments: ReviewComment[];
  loading: boolean;
  error?: string | null;
  reviewId: number;
  onAddComment: (content: string, parentCommentId?: number) => void;
  onDeleteComment: (commentId: number) => void;
  onEditComment: (commentId: number, updatedText: string) => void;
}

const CommentsSection: FC<CommentsSectionProps> = ({
  comments,
  loading,
  error,
  onAddComment,
  onDeleteComment,
  onEditComment,
}) => {
  const [commentText, setCommentText] = useState("");

  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [openReplyBox, setOpenReplyBox] = useState<Record<number, boolean>>({});
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});

  const [editing, setEditing] = useState<Record<number, boolean>>({});
  const [editDrafts, setEditDrafts] = useState<Record<number, string>>({});

  const hasComments = comments.length > 0;

  const rootComments = useMemo(
    () => comments.filter((c) => !c.parentCommentId),
    [comments]
  );

  const repliesByParentId = useMemo(() => {
    const map: Record<number, Comment[]> = {};
    comments.forEach((c) => {
      if (!c.parentCommentId) return;
      if (!map[c.parentCommentId]) {
        map[c.parentCommentId] = [];
      }
      map[c.parentCommentId].push(c);
    });
    return map;
  }, [comments]);

  const handleCommentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCommentText(e.target.value);
    },
    []
  );

  const handleCommentSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!commentText.trim()) return;
      onAddComment(commentText);
      setCommentText("");
    },
    [commentText, onAddComment]
  );

  const toggleReplyBox = useCallback((commentId: number) => {
    setOpenReplyBox((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }, []);

  const handleReplyChange = useCallback((commentId: number, value: string) => {
    setReplyDrafts((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  }, []);

  const handleReplySubmit = useCallback(
    (commentId: number) => {
      const trimmed = (replyDrafts[commentId] ?? "").trim();
      if (!trimmed) return;

      onAddComment(trimmed, commentId);

      setReplyDrafts((prev) => ({ ...prev, [commentId]: "" }));
      setOpenReplyBox((prev) => ({ ...prev, [commentId]: false }));
    },
    [onAddComment, replyDrafts]
  );

  const startEdit = useCallback((commentId: number, currentText: string) => {
    setEditing((prev) => ({ ...prev, [commentId]: true }));
    setEditDrafts((prev) => ({ ...prev, [commentId]: currentText }));
  }, []);

  const cancelEdit = useCallback((commentId: number) => {
    setEditing((prev) => ({ ...prev, [commentId]: false }));
    setEditDrafts((prev) => ({ ...prev, [commentId]: "" }));
  }, []);

  const saveEdit = useCallback(
    (commentId: number) => {
      const trimmed = (editDrafts[commentId] ?? "").trim();
      if (!trimmed) return;

      onEditComment(commentId, trimmed);
      setEditing((prev) => ({ ...prev, [commentId]: false }));
    },
    [editDrafts, onEditComment]
  );

  return (
    <>
      <h2 className="mb-3 ml-2 text-base font-black text-white md:text-lg">
        Comments
      </h2>

      <form onSubmit={handleCommentSubmit} className="mx-2 mb-6 space-y-2">
        <input
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="w-full rounded-[8px] border border-[rgba(0,212,255,0.14)] bg-[#070b16]/70 p-3 text-sm text-white outline-none transition duration-150 placeholder:text-[#6f7c91] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[rgba(0,212,255,0.18)]"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!commentText.trim()}
            className={`rounded-full border px-3 py-1.5 text-[12px] font-bold transition duration-150 sm:px-4 sm:py-2 ${
              commentText.trim()
                ? "bg-[var(--color-lime)] text-[#07101a] border-transparent hover:bg-[#ccff6f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
                : "border-[#989fab1e] text-gray-400 cursor-not-allowed"
            }`}
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {loading && (
          <p className="text-gray-400 text-sm">Loading comments...</p>
        )}

        {!loading && error && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && !error && !hasComments && (
          <p className="text-gray-400 text-sm">No comments yet.</p>
        )}

        <Virtuoso
          style={{ height: "70vh" }}
          data={rootComments}
          overscan={200}
          itemContent={(_, c) => (
            <CommentItem
              comment={c}
              replies={repliesByParentId[c.id] ?? []}
              showReplies={!!showReplies[c.id]}
              toggleShowReplies={() =>
                setShowReplies((p) => ({ ...p, [c.id]: !p[c.id] }))
              }
              showReplyBox={!!openReplyBox[c.id]}
              replyDraft={replyDrafts[c.id] ?? ""}
              onReplyToggle={() => toggleReplyBox(c.id)}
              onReplyChange={(v) => handleReplyChange(c.id, v)}
              onReplySubmit={() => handleReplySubmit(c.id)}
              isEditing={!!editing[c.id]}
              editDraft={editDrafts[c.id] ?? ""}
              onStartEdit={() => startEdit(c.id, c.comment)}
              onCancelEdit={() => cancelEdit(c.id)}
              onSaveEdit={() => saveEdit(c.id)}
              onEditChange={(v) => setEditDrafts((p) => ({ ...p, [c.id]: v }))}
              onDelete={() => onDeleteComment(c.id)}
              onEditReply={(id, text) => startEdit(id, text)}
              onDeleteReply={onDeleteComment}
            />
          )}
        />
      </div>
    </>
  );
};

export default React.memo(CommentsSection);
