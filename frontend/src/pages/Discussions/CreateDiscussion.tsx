import { useState } from "react";
import {
  FiArrowLeft,
  FiMessageSquare,
  FiPlus,
  FiSend,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDiscussionMutations } from "./hooks/useDiscussionMutations";

export default function CreateDiscussionScreen() {
  const navigate = useNavigate();
  const { create } = useDiscussionMutations();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const canSubmit = Boolean(
    trimmedTitle && trimmedDescription && !create.isPending,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedTitle || !trimmedDescription) {
      return;
    }

    create.mutate(
      { title: trimmedTitle, description: trimmedDescription },
      {
        onSuccess: () => navigate("/discussions"),
      }
    );
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_14%_0%,rgba(0,212,255,0.16),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-3 py-6 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/discussions")}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[#0d1424]/80 px-4 py-2 text-sm font-bold text-[#c8d3e4] transition hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.1)] hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to discussions
          </button>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[linear-gradient(135deg,rgba(8,16,28,0.98)_0%,rgba(13,20,36,0.94)_55%,rgba(8,16,28,0.98)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(182,255,59,0.08),transparent_22%)]" />
                <div className="relative px-6 py-7 sm:px-7 sm:py-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#cbeafe]">
                    <FiPlus className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                    Create room
                  </div>

                  <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                    Start a discussion worth joining
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#c8d3e4] sm:text-[15px]">
                    Set the topic clearly, frame the conversation, and give
                    players a reason to jump in with strong opinions.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                Live preview
              </p>

              <div className="mt-4 overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/60">
                <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)]">
                    <FiMessageSquare className="h-3.5 w-3.5" />
                    Discussion
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(182,255,59,0.14)] bg-[rgba(182,255,59,0.08)] px-2.5 py-1 text-xs font-bold text-[var(--color-lime)]">
                    <FiUsers className="h-3.5 w-3.5" />0
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-black text-white">
                    {trimmedTitle || "Your discussion title will appear here"}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#9aa7bd]">
                    {trimmedDescription ||
                      "Add a description that frames the topic, signals the tone, and helps people decide what they want to contribute."}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c8d3e4]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
                    Ready for the first participant
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20 sm:p-6">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                Discussion details
              </p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Open a new room
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9aa7bd]">
                Create a focused conversation space for reviews, strategy,
                updates, comparisons, or whatever the community should be
                talking about next.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Example: Which open world game still holds up best in 2026?"
                  className="w-full rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 text-white placeholder:text-[#6f7d94] focus:border-[rgba(0,212,255,0.34)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.14)]"
                />
                <div className="flex justify-end">
                  <span className="text-xs font-semibold text-[#9aa7bd]">
                    {title.length}/100
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  placeholder="Give the community some context. What angle should people debate? What kind of responses are you hoping to get?"
                  className="w-full resize-none rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 text-white placeholder:text-[#6f7d94] focus:border-[rgba(0,212,255,0.34)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.14)]"
                />
                <div className="flex justify-end">
                  <span className="text-xs font-semibold text-[#9aa7bd]">
                    {description.length}/400
                  </span>
                </div>
              </div>

              {create.error ? (
                <p className="rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {create.error instanceof Error ? create.error.message : "Failed to create discussion"}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-[rgba(0,212,255,0.12)] pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-[#c8d3e4] transition hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${
                    canSubmit
                      ? "border border-[rgba(182,255,59,0.18)] bg-[var(--color-lime)] text-[#07101a] shadow-lg shadow-[rgba(182,255,59,0.18)] hover:bg-[#ccff6f]"
                      : "cursor-not-allowed border border-white/10 bg-white/6 text-[#7f8ca2]"
                  }`}
                >
                  <FiSend className="h-4 w-4" />
                  {create.isPending ? "Creating..." : "Create Discussion"}
                </button>
              </div>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}
