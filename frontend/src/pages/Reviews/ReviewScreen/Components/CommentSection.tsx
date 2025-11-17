// src/pages/Review/Components/CommentsSection.tsx
import React, {
  type FC,
  useMemo,
  useState,
  useCallback,
  type ChangeEvent,
} from "react";
import { OptionsMenu } from "../../Components/CommentOption";

type Comment = {
  id: number;
  userId: number;
  comment: string;
  createdAt: string;
  parentCommentId?: number | null;
  isYourComment?: boolean;
};

interface CommentsSectionProps {
  comments: Comment[];
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

  // EDIT STATES
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
    (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  const toggleShowReplies = useCallback((commentId: number) => {
    setShowReplies((prev) => ({
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

  // --- EDIT HANDLERS ---------------------

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

  // ---------------------------------------

  return (
    <>
      <h2 className="text-white text-2xl font-bold mb-4">Comments</h2>

      {/* New comment form */}
      <form onSubmit={handleCommentSubmit} className="mb-6 space-y-3">
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="w-full rounded-xl bg-[#1f1a2e] border border-[#989fab1e] text-white p-3 outline-none focus:border-[var(--color-purple)]"
          rows={3}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!commentText.trim()}
            className={`px-4 py-2 rounded-full border transition-colors ${
              commentText.trim()
                ? "bg-[var(--color-purple)] text-white border-transparent hover:opacity-90"
                : "border-[#989fab1e] text-gray-400 cursor-not-allowed"
            }`}
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Status / error */}
      <div className="space-y-4">
        {loading && (
          <p className="text-gray-400 text-sm">Loading comments...</p>
        )}

        {!loading && error && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && !error && !hasComments && (
          <p className="text-gray-400 text-sm">No comments yet.</p>
        )}

        {/* Comments list */}
        {rootComments.map((c) => (
          <div key={c.id} className="flex gap-4 px-0 items-start">
            <div className="shadow-lg p-4 rounded-[12px] border border-[#989fab1e] w-full">
              <div className="flex justify-between">
                <p className="text-white font-semibold text-[12px] md:text-[15px]">
                  User #{c.userId}
                </p>
                <div className="flex gap-3 items-center">
                  <p className="text-[#989fab] text-[11px] md:text-[13px]">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                  {c.isYourComment && (
                    <OptionsMenu
                      onEdit={() => startEdit(c.id, c.comment)}
                      onDelete={() => onDeleteComment(c.id)}
                    />
                  )}
                </div>
              </div>

              {/* COMMENT TEXT OR EDIT TEXTAREA */}
              {editing[c.id] ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={editDrafts[c.id]}
                    onChange={(e) =>
                      setEditDrafts((prev) => ({
                        ...prev,
                        [c.id]: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl bg-[#1f1a2e] border border-[#989fab1e] text-white p-3 outline-none focus:border-[var(--color-purple)]"
                    rows={2}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => cancelEdit(c.id)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700/40"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => saveEdit(c.id)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-purple)] text-white hover:bg-purple-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[#989fab] text-[12px] md:text-[14px] mt-2 whitespace-pre-line">
                  {c.comment}
                </p>
              )}

              {/* Reply box */}
              {openReplyBox[c.id] && !editing[c.id] && (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={replyDrafts[c.id] ?? ""}
                    onChange={(e) => handleReplyChange(c.id, e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full rounded-xl bg-[#1f1a2e] border border-[#989fab1e] text-white p-3 outline-none focus:border-[var(--color-purple)]"
                    rows={2}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleReplySubmit(c.id)}
                      disabled={!(replyDrafts[c.id] ?? "").trim()}
                      className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                        (replyDrafts[c.id] ?? "").trim()
                          ? "bg-[var(--color-purple)] text-white border-transparent hover:opacity-90"
                          : "border-[#989fab1e] text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              )}

              {/* Replies toggle */}
              {(repliesByParentId[c.id]?.length ?? 0) > 0 && (
                <button
                  type="button"
                  onClick={() => toggleShowReplies(c.id)}
                  className="mt-3 text-[var(--color-purple)] text-xs hover:underline"
                >
                  {showReplies[c.id] ? "Hide replies" : "View replies"}
                </button>
              )}

              {/* Replies list */}
              {showReplies[c.id] && (
                <div className="mt-4 pl-4 border-l border-[#989fab1e] space-y-3">
                  {(repliesByParentId[c.id] ?? []).map((r) => (
                    <div key={r.id} className="text-sm">
                      <div className="flex justify-between">
                        <p className="text-white font-medium">
                          User #{r.userId}
                        </p>
                        <div className="flex gap-3 items-center">
                          <p className="text-[#989fab] text-[11px] md:text-[12px]">
                            {new Date(r.createdAt).toLocaleString()}
                          </p>
                          {r.isYourComment && (
                            <OptionsMenu
                              onEdit={() => startEdit(r.id, r.comment)}
                              onDelete={() => onDeleteComment(r.id)}
                            />
                          )}
                        </div>
                      </div>

                      {/* REPLY EDIT BLOCK */}
                      {editing[r.id] ? (
                        <div className="mt-2 space-y-2">
                          <textarea
                            value={editDrafts[r.id]}
                            onChange={(e) =>
                              setEditDrafts((prev) => ({
                                ...prev,
                                [r.id]: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl bg-[#1f1a2e] border border-[#989fab1e] text-white p-3 outline-none focus:border-[var(--color-purple)]"
                            rows={2}
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => cancelEdit(r.id)}
                              className="px-3 py-1.5 text-xs rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700/40"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() => saveEdit(r.id)}
                              className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-purple)] text-white hover:bg-purple-700"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#989fab] mt-1 whitespace-pre-line">
                          {r.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Reply toggle */}
              {!editing[c.id] && (
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleReplyBox(c.id)}
                    className="text-[var(--color-purple)] text-xs hover:underline"
                  >
                    {openReplyBox[c.id] ? "Cancel" : "Reply"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(CommentsSection);
