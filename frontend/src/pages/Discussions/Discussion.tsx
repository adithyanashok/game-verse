import { useEffect, useState } from "react";
import MessageBubble from "./Components/MessageBubble";
import { io, Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getDiscussion,
  resetCurrentDiscussion,
} from "../../features/discussions/discussionSlice";
import type {
  Message,
  UserJoinedPayload,
} from "../../features/discussions/types";
import { toast } from "react-toastify";
export default function DiscussionDetailsScreen() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const { currentDiscussion } = useAppSelector((state) => state.discussions);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [length, setLength] = useState<number>(0);
  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(getDiscussion(id));
    }
  }, [id, dispatch]);

  console.log(currentDiscussion);

  if (!currentDiscussion) {
    navigate("/discussions");
  }

  useEffect(() => {
    if (!accessToken || !id) return;

    const wsUrl = import.meta.env.VITE_WS_URL || "http://localhost:8000";
    console.log("WEB SOCKET URL ", wsUrl);
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
      console.log("Connected", newSocket.id);
      newSocket.emit("joinDiscussion", {
        discussionId: Number(id),
        userId: user?.id,
        name: user?.name,
      });
    });

    newSocket.on("userJoined", (data: UserJoinedPayload) => {
      console.log("User joined:", data);
      setLength(data.totalMembers);

      if (user?.id !== data.userId) {
        toast.success(data.message);
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

    setSocket(newSocket);

    newSocket.on("disconnects", (data: UserJoinedPayload) => {
      console.log("Disconnected");
      setLength(data.totalMembers);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id, accessToken, navigate]);

  const sendMessage = () => {
    if (!message.trim() || !socket) return;
    socket.emit("sendMessage", {
      discussionId: Number(id),
      content: message,
      username: user?.name,
    });
    setMessage("");
  };

  const handleBlockUser = (userId: number) => {
    if (!socket) return;
    socket.emit("blockUser", {
      discussionId: Number(id),
      userIdToBlock: userId,
    });
  };

  const handleKickUser = (userId: number) => {
    if (!socket) return;
    socket.emit("kickUser", {
      discussionId: Number(id),
      userIdToKick: userId,
    });
  };

  const handleEndDiscussion = () => {
    if (!socket) return;
    socket.emit("endDiscussion", {
      discussionId: Number(id),
      adminId: user?.id,
    });
    resetCurrentDiscussion();
  };

  const isAdmin = currentDiscussion?.adminId === user?.id;

  return (
    <div className="bg-primary text-primary h-screen flex flex-col justify-between">
      {/* Chat Header */}
      <div className="h-14 px-4 md:px-6 flex items-center justify-between border-b border-[#989fab1e] bg-dark">
        <h3 className="font-semibold text-white text-sm md:text-base">
          # {currentDiscussion?.title + ` (${length})` || "Discussion"}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/discussions")}
            className="flex items-center gap-2 text-grey hover:text-white text-sm md:text-base transition"
          >
            Exit
          </button>
          {isAdmin && (
            <button
              onClick={handleEndDiscussion}
              className="flex items-center gap-2 text-grey hover:text-white text-sm md:text-base transition"
            >
              End <span className="text-lg leading-none">×</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="group relative">
              <MessageBubble
                message={msg.content}
                isOwn={msg.sender?.id === user?.id}
                senderName={msg.sender?.name}
                id={msg.sender?.id}
              />
              {isAdmin && msg.sender?.id !== user?.id && (
                <div className="absolute top-0 right-0 hidden group-hover:flex gap-2">
                  <button
                    onClick={() => handleKickUser(msg.sender.id)}
                    className="text-xs text-red-500"
                  >
                    Kick
                  </button>
                  <button
                    onClick={() => handleBlockUser(msg.sender.id)}
                    className="text-xs text-red-700"
                  >
                    Block
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-[#989fab1e] bg-dark">
        <div className="max-w-4xl mx-auto p-3 md:p-4">
          <div className="flex gap-2 md:gap-3 items-center">
            <input
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send Message..."
              value={message}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-3 rounded-lg bg-dark-purple text-white border border-[#989fab1e] placeholder:text-grey focus:outline-none focus:border-purple text-sm md:text-base"
            />
            <button
              onClick={sendMessage}
              className="bg-purple px-4 md:px-5 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-[#4e0d95] transition shrink-0"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
