type Props = {
  title?: string;
  description?: string;
  participants: number;
};

export default function DiscussionCard({
  title = "",
  description = "Share and debate the best open world games based on gameplay, story, and visuals.",
  participants,
}: Props) {
  return (
    <div
      className="
        bg-dark-purple p-6 rounded-xl
        border border-[#989fab1e]
        hover:border-purple hover:shadow-purple/20
        transition-all duration-300 cursor-pointer
      "
    >
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>

      <p className="text-grey text-sm mb-4 line-clamp-3">{description}</p>

      <div className="flex justify-between items-center text-xs text-grey">
        <span>{participants} members</span>
      </div>
    </div>
  );
}
