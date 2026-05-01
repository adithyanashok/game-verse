import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiMessageSquare,
  FiPlus,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { AppLoader } from "../../components/common/Loader";
import { useDiscussionsData } from "./hooks/useDiscussionData";

export default function DiscussionListScreen() {
  const { data: discussions = [], isLoading, error } = useDiscussionsData();

  const totalMembers = discussions.reduce(
    (sum, item) => sum + item.totalMembers,
    0,
  );
  const featuredDiscussion = [...discussions].sort(
    (a, b) => b.totalMembers - a.totalMembers,
  )[0];
  const latestDiscussion = [...discussions].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_14%_0%,rgba(0,212,255,0.16),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-3 py-6 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[linear-gradient(135deg,rgba(8,16,28,0.98)_0%,rgba(13,20,36,0.94)_55%,rgba(8,16,28,0.98)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(182,255,59,0.08),transparent_22%)]" />
            <div className="relative grid gap-8 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-end lg:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#cbeafe]">
                  <FiMessageSquare className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                  Community hub
                </div>

                <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Discussions built for sharper game conversations
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#c8d3e4] sm:text-[15px]">
                  Jump into active threads, discover what players are debating,
                  and open a room for the next big topic.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/discussions/create"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(182,255,59,0.18)] bg-[var(--color-lime)] px-5 py-3 text-sm font-black text-[#07101a] shadow-lg shadow-[rgba(182,255,59,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ccff6f]"
                  >
                    <FiPlus className="h-4 w-4" />
                    New Discussion
                  </Link>

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-[#c8d3e4]">
                    <FiTrendingUp className="h-4 w-4 text-[var(--color-blue)]" />
                    {featuredDiscussion
                      ? `${featuredDiscussion.title} is trending`
                      : "Fresh conversations start here"}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[10px] border border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))] p-4 shadow-lg shadow-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                      Live rooms
                    </p>
                    <FiMessageSquare className="h-4 w-4 text-[var(--color-blue)]" />
                  </div>
                  <p className="mt-3 text-2xl font-black text-white">
                    {discussions.length}
                  </p>
                </div>

                <div className="rounded-[10px] border border-[rgba(182,255,59,0.16)] bg-[linear-gradient(180deg,rgba(182,255,59,0.14),rgba(182,255,59,0.04))] p-4 shadow-lg shadow-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                      Total members
                    </p>
                    <FiUsers className="h-4 w-4 text-[var(--color-lime)]" />
                  </div>
                  <p className="mt-3 text-2xl font-black text-white">
                    {totalMembers}
                  </p>
                </div>

                <div className="rounded-[10px] border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                      Latest room
                    </p>
                    <FiArrowRight className="h-4 w-4 text-white/80" />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm font-bold text-white">
                    {latestDiscussion?.title || "Waiting for the next topic"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(0,212,255,0.12)] pb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                Browse rooms
              </p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Active discussions
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9aa7bd]">
                Explore community threads with room to debate mechanics,
                stories, balance changes, and hidden gems.
              </p>
            </div>

            <div className="rounded-full border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 px-4 py-2 text-sm font-semibold text-[#c8d3e4]">
              {discussions.length} room{discussions.length === 1 ? "" : "s"} available
            </div>
          </div>

          {isLoading ? (
            <AppLoader label="Loading discussions..." />
          ) : error ? (
            <div className="rounded-[10px] border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
              {error instanceof Error ? error.message : "Failed to load discussions"}
            </div>
          ) : discussions.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {discussions.map((item) => (
                <Link
                  key={item.id}
                  to={`/discussion/${item.id}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
                >
                  <div className="relative h-full overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424] transition duration-300 hover:-translate-y-1 hover:border-[rgba(0,212,255,0.34)] hover:bg-[#121a2c]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-blue),var(--color-lime),transparent)] opacity-60" />
                    <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)]">
                        <FiMessageSquare className="h-3.5 w-3.5" />
                        Discussion
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(182,255,59,0.14)] bg-[rgba(182,255,59,0.08)] px-2.5 py-1 text-xs font-bold text-[var(--color-lime)]">
                        <FiUsers className="h-3.5 w-3.5" />
                        {item.totalMembers}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-black text-white transition group-hover:text-[#e8f6ff]">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#9aa7bd]">
                        {item.description ||
                          "Share your take, challenge the consensus, and pull more players into the conversation."}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c8d3e4]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-lime)]" />
                        {item.totalMembers > 0
                          ? `${item.totalMembers} active participant${item.totalMembers === 1 ? "" : "s"}`
                          : "Room ready for its first participant"}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4 text-sm font-semibold text-[#c8d3e4]">
                        <span>Open room</span>
                        <span className="inline-flex items-center gap-2 text-white transition group-hover:text-[var(--color-lime)]">
                          Join
                          <FiArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[10px] border border-dashed border-white/10 bg-[#0d1424]/70 px-6 py-14 text-center shadow-xl shadow-black/10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)]">
                <FiMessageSquare className="h-6 w-6 text-[var(--color-blue)]" />
              </div>
              <h3 className="mt-5 text-2xl font-black text-white">
                No discussions yet
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#9aa7bd]">
                Start the first room and give the community a place to talk
                strategy, reviews, updates, and favorite moments.
              </p>
              <Link
                to="/discussions/create"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-lime)] px-5 py-3 text-sm font-black text-[#07101a] transition hover:bg-[#ccff6f]"
              >
                <FiPlus className="h-4 w-4" />
                Start a Discussion
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
