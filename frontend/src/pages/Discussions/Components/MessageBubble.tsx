import { Link } from "react-router-dom";

interface MessageBubbleProps {
  message: string;
  isOwn?: boolean;
  senderName?: string;
  id?: number;
}

export default function MessageBubble({
  message,
  isOwn,
  senderName,
  id,
}: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isOwn
            ? "bg-purple text-white rounded-br-none"
            : "bg-dark-purple text-grey rounded-bl-none"
        }`}
      >
        {!isOwn && senderName && (
          <Link to={`/profile/${id}`}>
            {" "}
            <p className="text-xs text-grey-400 mb-1">{senderName}</p>
          </Link>
        )}
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
}
