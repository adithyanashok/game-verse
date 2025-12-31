import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import { createDiscussion } from "../../features/discussions/discussionSlice";

export default function CreateDiscussionScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    const result = await dispatch(createDiscussion({ title, description }));
    if (createDiscussion.fulfilled.match(result)) {
      navigate("/discussions");
    }
  };

  return (
    <div className="bg-primary min-h-screen px-6 md:px-16 py-20 text-primary">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">Create Discussion</h1>
        <p className="text-grey mt-2 text-sm md:text-base">
          Start a new discussion and engage with the community
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          max-w-2xl mx-auto
          bg-dark-purple p-8 rounded-xl
          border border-[#989fab1e]
          shadow-lg
        "
      >
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Discussion Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter discussion title"
            className="
              w-full px-4 py-3 rounded-lg
              bg-dark border border-[#989fab1e]
              text-white placeholder:text-grey
              focus:outline-none focus:border-purple
              transition
            "
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Describe what this discussion is about"
            className="
              w-full px-4 py-3 rounded-lg
              bg-dark border border-[#989fab1e]
              text-white placeholder:text-grey
              focus:outline-none focus:border-purple
              transition resize-none
            "
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              px-6 py-3 rounded-lg
              border border-[#989fab1e]
              text-grey hover:text-white
              hover:border-purple transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              bg-purple hover:bg-[#4e0d95]
              px-6 py-3 rounded-lg font-semibold
              transition
            "
          >
            Create Discussion
          </button>
        </div>
      </form>
    </div>
  );
}
