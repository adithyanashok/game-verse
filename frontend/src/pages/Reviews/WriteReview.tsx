import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useAppDispatch } from "../../store/hooks";
import { createReview } from "../../features/reviews/reviewsSlice";
import type { CreateReviewPayload } from "../../features/reviews/types";
import { useParams } from "react-router";

type Form = {
  graphics: number;
  gameplay: number;
  story: number;
  sound: number;
  review: string;
  title: string;
};

export default function WriteReviewScreen() {
  const { id } = useParams();
  const [form, setForm] = useState<Form>({
    graphics: 1,
    gameplay: 1,
    story: 1,
    sound: 1,
    review: "",
    title: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof Form>(key: K, val: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const ratingItems: {
    label: string;
    key: Exclude<keyof Form, "review" | "title">;
  }[] = [
    { label: "Graphics", key: "graphics" },
    { label: "Gameplay", key: "gameplay" },
    { label: "Story", key: "story" },
    { label: "Sound", key: "sound" },
  ];

  const validateForm = () => {
    const newErrors: string[] = [];

    if (id === undefined) newErrors.push("Game ID is undefined");

    if (!form.title.trim()) newErrors.push("Title is required");
    if (!form.review.trim()) newErrors.push("Review cannot be empty");

    // Validate each rating
    ratingItems.forEach((item) => {
      if (form[item.key] < 1) {
        newErrors.push(`${item.label} rating must be at least 1 star`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors([]);

    const payload: CreateReviewPayload = {
      title: form.title,
      comment: form.review,
      gameId: Number(id),
      rating: {
        graphics: form.graphics,
        gameplay: form.gameplay,
        story: form.story,
        sound: form.sound,
      },
    };

    const result = await dispatch(createReview(payload));

    setLoading(false);

    if (createReview.fulfilled.match(result)) {
      console.log("Review Created Successfully:", result.payload);

      setForm({
        graphics: 1,
        gameplay: 1,
        story: 1,
        sound: 1,
        review: "",
        title: "",
      });
    } else {
      const errorMsg = result.payload || "Failed to create review";
      setErrors([errorMsg]);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-dark rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Write a Review
        </h1>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-900/40 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {errors.map((err, idx) => (
              <p key={idx}>• {err}</p>
            ))}
          </div>
        )}

        {/* Rating Card */}
        <div className="shadow-md rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Rate the Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ratingItems.map((item) => (
              <div key={item.key} className="flex flex-col gap-1">
                <label className="text-white font-medium">{item.label}</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleChange(item.key, star)}
                      className="transition"
                    >
                      <AiFillStar
                        size={18}
                        className={
                          star <= form[item.key]
                            ? "text-[#6711bf]"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col mb-6 gap-2">
          <label className="text-white font-semibold">Title</label>
          <input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full border text-white border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your review title..."
          />
        </div>

        {/* Review Box */}
        <div className="flex flex-col mb-6 gap-2">
          <label className="text-white font-semibold">Your Review</label>
          <textarea
            value={form.review}
            onChange={(e) => handleChange("review", e.target.value)}
            className="w-full border text-white border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[130px]"
            placeholder="Write your detailed review..."
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-xl text-center shadow-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
