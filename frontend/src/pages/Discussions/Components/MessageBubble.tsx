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
  const initials = (senderName || "G")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[88%] gap-3 sm:max-w-[75%] ${
          isOwn ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-xs font-black shadow-lg shadow-black/20 ${
            isOwn
              ? "border-[rgba(182,255,59,0.22)] bg-[var(--color-lime)] text-[#07101a]"
              : "border-[rgba(0,212,255,0.22)] bg-[linear-gradient(135deg,#10243a,#18102d)] text-[var(--color-lime)]"
          }`}
        >
          {isOwn ? "You" : initials || "G"}
        </div>

        <div
          className={`overflow-hidden rounded-[10px] border px-4 py-3 shadow-lg shadow-black/10 ${
            isOwn
              ? "border-[rgba(182,255,59,0.18)] bg-[linear-gradient(180deg,rgba(182,255,59,0.16),rgba(182,255,59,0.08))] text-white"
              : "border-[rgba(0,212,255,0.12)] bg-[linear-gradient(180deg,rgba(13,20,36,0.96),rgba(7,11,22,0.96))] text-[#dbe6f6]"
          }`}
        >
          {!isOwn && senderName ? (
            <Link
              to={`/profile/${id}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-blue)] transition hover:text-white"
            >
              {senderName}
            </Link>
          ) : (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5d6c84]">
              You
            </p>
          )}

          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 sm:text-[15px]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
