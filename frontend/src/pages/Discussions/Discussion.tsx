import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiMessageSquare,
  FiMinusCircle,
  FiSend,
  FiShield,
  FiSlash,
  FiUsers,
  FiXCircle,
  FiZap,
} from "react-icons/fi";
import { io, type Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBubble from "./Components/MessageBubble";
import { AppLoader } from "../../components/common/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getDiscussion,
  resetCurrentDiscussion,
} from "../../features/discussions/discussionSlice";
import type {
  Message,
  UserJoinedPayload,
} from "../../features/discussions/types";

export default function DiscussionDetailsScreen() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const { currentDiscussion, loading, errors } = useAppSelector(
    (state) => state.discussions,
  );

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/discussions", { replace: true });
      return;
    }

    void dispatch(getDiscussion(id));

    return () => {
      dispatch(resetCurrentDiscussion());
    };
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (currentDiscussion?.totalMembers) {
      setMemberCount(currentDiscussion.totalMembers);
    }
  }, [currentDiscussion?.totalMembers]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    if (!accessToken || !id) {
      return;
    }

    const wsUrl = import.meta.env.VITE_WS_URL || "http://localhost:8000";
    const newSocket = io(wsUrl, {
      query: { token: accessToken },
      path: "/socket.io",
      transports: ["websocket"],
      forceNew: true,
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket Connection Error:", err);
      toast.error("Connection Error");
    });

    newSocket.on("connect", () => {
      newSocket.emit("joinDiscussion", {
        discussionId: Number(id),
        userId: user?.id,
        name: user?.name,
      });
    });

    newSocket.on("userJoined", (data: UserJoinedPayload) => {
      setMemberCount(data.totalMembers);

      if (user?.id !== data.userId) {
        toast.success(
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(182,255,59,0.24)] bg-[rgba(182,255,59,0.14)] text-[var(--color-lime)]">
              <FiZap className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-lime)]">
                New participant
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-white">
                {data.message}
              </p>
            </div>
          </div>,
          {
            autoClose: 2200,
            closeButton: false,
            className:
              "rounded-[10px] border border-[rgba(182,255,59,0.18)] bg-[linear-gradient(180deg,rgba(13,20,36,0.98),rgba(7,11,22,0.98))] shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
            icon: false,
          },
        );
      }
    });

    newSocket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on("error", (err: string) => {
      toast.error(err);
      console.error(err);

      if (err.includes("blocked")) {
        navigate("/discussions");
      }
    });

    newSocket.on("kicked", () => {
      navigate("/discussions");
    });

    newSocket.on("blocked", () => {
      navigate("/discussions");
    });

    newSocket.on("discussionEnded", () => {
      toast.success("Discussion ended");
      navigate("/discussions");
    });

    newSocket.on("disconnects", (data: UserJoinedPayload) => {
      setMemberCount(data.totalMembers);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [accessToken, id, navigate, user?.id, user?.name]);

  const sendMessage = () => {
    if (!message.trim() || !socket) {
      return;
    }

    socket.emit("sendMessage", {
      discussionId: Number(id),
      content: message.trim(),
      username: user?.name,
    });
    setMessage("");
  };

  const handleBlockUser = (userId: number) => {
    if (!socket) {
      return;
    }

    socket.emit("blockUser", {
      discussionId: Number(id),
      userIdToBlock: userId,
    });
  };

  const handleKickUser = (userId: number) => {
    if (!socket) {
      return;
    }

    socket.emit("kickUser", {
      discussionId: Number(id),
      userIdToKick: userId,
    });
  };

  const handleEndDiscussion = () => {
    if (!socket) {
      return;
    }

    socket.emit("endDiscussion", {
      discussionId: Number(id),
      adminId: user?.id,
    });
    dispatch(resetCurrentDiscussion());
  };

  const isAdmin = currentDiscussion?.adminId === user?.id;
  const canSend = Boolean(message.trim() && socket);

  if (loading.getOne) {
    return (
      <AppLoader
        fullscreen
        label="Loading discussion..."
        containerClassName="bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.16),transparent_32%),radial-gradient(circle_at_84%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-4 py-10"
      />
    );
  }

  if (errors.getOne) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.16),transparent_32%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-4 py-10">
        <div className="max-w-lg rounded-[10px] border border-red-500/20 bg-red-500/10 px-6 py-8 text-center text-red-200 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-black text-white">Unable to open room</h2>
          <p className="mt-3 text-sm leading-6">{errors.getOne}</p>
          <button
            type="button"
            onClick={() => navigate("/discussions")}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/12"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to discussions
          </button>
        </div>
      </div>
    );
  }

  if (!currentDiscussion) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.16),transparent_32%),radial-gradient(circle_at_84%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-3 py-4 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col gap-4">
        <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[linear-gradient(135deg,rgba(8,16,28,0.98)_0%,rgba(13,20,36,0.94)_55%,rgba(8,16,28,0.98)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(182,255,59,0.08),transparent_22%)]" />
            <div className="relative flex flex-col gap-5 px-5 py-5 sm:px-7 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => navigate("/discussions")}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#cbeafe] transition hover:border-[rgba(0,212,255,0.34)] hover:text-white"
                >
                  <FiArrowLeft className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                  Back to hub
                </button>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(182,255,59,0.16)] bg-[rgba(182,255,59,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-lime)]">
                    <FiMessageSquare className="h-3.5 w-3.5" />
                    Live discussion
                  </span>
                  {isAdmin ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)]">
                      <FiShield className="h-3.5 w-3.5" />
                      You are admin
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                  {currentDiscussion.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#c8d3e4] sm:text-[15px]">
                  {currentDiscussion.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px] lg:grid-cols-1">
                <div className="rounded-[10px] border border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))] p-4 shadow-lg shadow-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                      Members in room
                    </p>
                    <FiUsers className="h-4 w-4 text-[var(--color-blue)]" />
                  </div>
                  <p className="mt-3 text-2xl font-black text-white">{memberCount}</p>
                </div>

                {isAdmin ? (
                  <button
                    type="button"
                    onClick={handleEndDiscussion}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm font-black text-red-100 transition hover:border-red-400/30 hover:bg-red-500/14"
                  >
                    <FiXCircle className="h-4 w-4" />
                    End discussion
                  </button>
                ) : (
                  <div className="rounded-[10px] border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c8d3e4]">
                      Participation
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-white">
                      Keep the conversation constructive and on topic.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(0,212,255,0.1)] px-4 py-4 sm:px-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                Room feed
              </p>
              <h2 className="mt-1 text-xl font-black text-white">Conversation</h2>
            </div>

            <div className="rounded-full border border-white/10 bg-[#070b16]/70 px-4 py-2 text-sm font-semibold text-[#c8d3e4]">
              {messages.length} message{messages.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5">
            {messages.length > 0 ? (
              <div className="mx-auto flex max-w-5xl flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div key={`${msg.sender?.id ?? "guest"}-${idx}`} className="group relative">
                    <MessageBubble
                      message={msg.content}
                      isOwn={msg.sender?.id === user?.id}
                      senderName={msg.sender?.name}
                      id={msg.sender?.id}
                    />

                    {isAdmin && msg.sender?.id !== user?.id ? (
                      <div className="mt-2 flex justify-end gap-2 opacity-100 transition sm:absolute sm:right-2 sm:top-2 sm:mt-0 sm:opacity-0 sm:group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => handleKickUser(msg.sender.id)}
                          className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-100 transition hover:bg-amber-400/16"
                        >
                          <FiMinusCircle className="h-3.5 w-3.5" />
                          Kick
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBlockUser(msg.sender.id)}
                          className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-100 transition hover:bg-red-500/16"
                        >
                          <FiSlash className="h-3.5 w-3.5" />
                          Block
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="mx-auto flex h-full min-h-[280px] max-w-3xl flex-col items-center justify-center rounded-[10px] border border-dashed border-white/10 bg-[#070b16]/60 px-6 text-center shadow-xl shadow-black/10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)]">
                  <FiMessageSquare className="h-6 w-6 text-[var(--color-blue)]" />
                </div>
                <h3 className="mt-5 text-2xl font-black text-white">
                  Start the conversation
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#9aa7bd]">
                  This room is open and ready. Drop the first message to set the
                  tone for everyone joining in.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-[rgba(0,212,255,0.1)] bg-[#0a111d]/88 px-3 py-4 backdrop-blur sm:px-5">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 p-3 shadow-lg shadow-black/10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="min-w-0 flex-1">
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa7bd]">
                      Message
                    </label>
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Share a thought, question, or hot take"
                      className="w-full rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#6f7d94] focus:border-[rgba(0,212,255,0.34)] focus:ring-2 focus:ring-[rgba(0,212,255,0.14)] sm:text-base"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!canSend}
                    className={`inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-black transition sm:min-w-[140px] ${
                      canSend
                        ? "border border-[rgba(182,255,59,0.18)] bg-[var(--color-lime)] text-[#07101a] shadow-lg shadow-[rgba(182,255,59,0.18)] hover:bg-[#ccff6f]"
                        : "cursor-not-allowed border border-white/10 bg-white/6 text-[#7f8ca2]"
                    }`}
                  >
                    <FiSend className="h-4 w-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
