import { useState } from "react";
import { FiUser } from "react-icons/fi";

type ReviewerCardProps = {
  name: string;
  image: string;
};

const ReviewerCard = ({ name, image }: ReviewerCardProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const imageUrl = image?.startsWith("http") ? image : `https://${image}`;

  return (
    <div className="w-full">
      <div className="flex h-14 w-14 justify-center sm:h-16 sm:w-16">
        {!hasImageError && image ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            onError={() => setHasImageError(true)}
            className="h-full w-full rounded-full border border-[rgba(0,212,255,0.18)] object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full border border-[rgba(0,212,255,0.22)] bg-[linear-gradient(135deg,#10243a,#18102d)] text-sm font-black text-[var(--color-lime)] shadow-lg shadow-black/20">
            {initials || <FiUser className="h-5 w-5" />}
          </div>
        )}
      </div>

      <div className="mt-2 text-center">
        <h3 className="text-white text-xs font-medium line-clamp-2">{name}</h3>
      </div>
    </div>
  );
};

export default ReviewerCard;
