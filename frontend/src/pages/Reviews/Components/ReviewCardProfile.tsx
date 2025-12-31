interface Props {
  image: string;
  title: string;
}
const ReviewCardProfile = (props: Props) => {
  return (
    <div className="bg-[#1a102d] rounded-xl p-2 hover:scale-105 transition transform cursor-pointer shadow-lg">
      <img
        src={props.image}
        alt={props.title}
        className="rounded-lg w-full h-44 object-cover"
        loading="lazy"
      />
      <p className="mt-2 text-center text-sm text-gray-300">{props.title}</p>
    </div>
  );
};

export default ReviewCardProfile;
