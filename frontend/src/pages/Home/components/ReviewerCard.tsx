type ReviewerCardProps = {
  name: string;
  image: string;
};

const ReviewerCard = ({ name, image }: ReviewerCardProps) => {
  return (
    <div className="w-full">
      {/* Profile Image */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 flex justify-center">
        <img
          src={`https://${image}`}
          alt={name}
          loading="lazy"
          className="rounded-full object-cover border border-[#989fab1e]"
        />
      </div>

      {/* Reviewer Info */}
      <div className="mt-2 text-center">
        <h3 className="text-white text-xs font-medium line-clamp-2">{name}</h3>
      </div>
    </div>
  );
};

export default ReviewerCard;
