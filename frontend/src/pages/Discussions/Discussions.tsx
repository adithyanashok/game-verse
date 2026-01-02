import { Link } from "react-router-dom";
import DiscussionCard from "./Components/DiscussionCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDiscussions } from "../../features/discussions/discussionSlice";

export default function DiscussionListScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDiscussions());
  }, [dispatch]);
  const { discussions } = useAppSelector((state) => state.discussions);

  console.log("discussions ", discussions);

  return (
    <div className="bg-primary min-h-screen px-6 md:px-16 py-20 text-primary">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">
            Community Discussions
          </h1>
          <p className="text-grey mt-2 text-sm md:text-base">
            Join ongoing conversations or start a new discussion space
          </p>
        </div>

        {/* Create Button */}
        <Link
          to="/discussions/create"
          className="
            bg-purple hover:bg-[#4e0d95]
            px-6 py-3 rounded-lg font-semibold
            transition w-fit
          "
        >
          + New Discussion
        </Link>
      </div>

      {/* Divider */}
      <hr className="hr mb-8" />

      {/* Discussion List */}
      {discussions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {discussions.map((item) => (
            <Link to={"/discussions/" + item.id}>
              <DiscussionCard
                key={item.title}
                description={item.description}
                title={item.title}
                participants={item.totalMembers}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No discussions currently available.
        </p>
      )}
    </div>
  );
}
