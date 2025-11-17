import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useAppDispatch } from "../../store/hooks";
import {
  createReview,
  updateReview,
} from "../../features/reviews/reviewsSlice";
import type {
  CreateReviewPayload,
  ReviewSummary,
} from "../../features/reviews/types";
import { useLocation, useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";
import Banner from "../Games/Components/Banner";

type Form = {
  graphics: number;
  gameplay: number;
  story: number;
  sound: number;
  review: string;
  title: string;
};

type ReviewFormScreenProps = {
  mode: "create" | "edit";
  initialData?: Form;
  reviewId?: number;
};

export default function ReviewFormScreen({ mode }: ReviewFormScreenProps) {
  const { state } = useLocation();
  const review = state?.currentReview;
  const game = state?.game;
  const navigator = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<Form>(
    mode === "edit"
      ? {
          title: review.title,
          review: review.text,
          graphics: review.rating.graphics,
          gameplay: review.rating.gameplay,
          story: review.rating.story,
          sound: review.rating.sound,
        }
      : {
          title: "",
          review: "",
          graphics: 1,
          gameplay: 1,
          story: 1,
          sound: 1,
        }
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof Form>(key: K, val: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const ratingItems = [
    { label: "Graphics", key: "graphics" },
    { label: "Gameplay", key: "gameplay" },
    { label: "Story", key: "story" },
    { label: "Sound", key: "sound" },
  ] as const;

  const validateForm = () => {
    const newErrors: string[] = [];

    if (mode === "create" && id === undefined)
      newErrors.push("Game ID is undefined");

    if (!form.title.trim()) newErrors.push("Title is required");
    if (!form.review.trim()) newErrors.push("Review cannot be empty");

    ratingItems.forEach((item) => {
      if (form[item.key] < 1) {
        newErrors.push(`${item.label} rating must be at least 1 star`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    let result;

    if (mode === "create") {
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
      result = await dispatch(createReview(payload));
    } else {
      result = await dispatch(
        updateReview({
          id: Number(review.id),
          title: form.title,
          comment: form.review,
          rating: {
            graphics: form.graphics,
            gameplay: form.gameplay,
            story: form.story,
            sound: form.sound,
          },
        })
      );
    }

    setLoading(false);

    if (result.meta.requestStatus === "fulfilled") {
      toast(
        mode === "create"
          ? "Review Created Successfully!"
          : "Review Updated Successfully!",
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          style: { border: "1px solid #290d44" },
          theme: "dark",
        }
      );

      if (mode === "create") {
        setTimeout(() => {
          navigator(`/review/${(result.payload as ReviewSummary).id}`);
        }, 1000);
      } else {
        navigator(-1);
      }
    } else {
      toast(result.payload?.toString(), {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        style: { border: "1px solid #290d44" },
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ResponsiveNavbar />

      <div className="py-10 px-4 md:px-10">
        <ToastContainer hideProgressBar theme="dark" />

        <div className="bg-dark rounded-2xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto">
          {game && <Banner game={game} showWriteButton={false} />}

          <h1 className="text-2xl font-bold text-white text-center mb-6 mt-6">
            {mode === "create" ? "Write a Review" : "Edit Review"}
          </h1>

          {errors.length > 0 && (
            <div className="bg-red-900/40 text-red-300 p-3 rounded-lg mb-6 text-sm border border-red-700/40">
              {errors.map((err, idx) => (
                <p key={idx}>• {err}</p>
              ))}
            </div>
          )}

          {/* Two column layout */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left — Rating */}
            <div className="lg:w-1/2 bg-[#1b1a29] p-6 rounded-xl border border-white/10 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">
                Rate the Features
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                {ratingItems.map((item) => (
                  <div key={item.key} className="flex flex-col gap-2">
                    <label className="text-white font-medium">
                      {item.label}
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleChange(item.key, star)}
                          className="transition-transform hover:scale-110"
                        >
                          <AiFillStar
                            size={20}
                            className={
                              star <= form[item.key]
                                ? "text-purple-600 drop-shadow-md"
                                : "text-gray-400"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-white font-semibold">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full border border-gray-700 bg-[#1b1a29] text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                  placeholder="Enter review title..."
                />
              </div>

              {/* Review box */}
              <div className="flex flex-col gap-2">
                <label className="text-white font-semibold">Your Review</label>
                <textarea
                  value={form.review}
                  onChange={(e) => handleChange("review", e.target.value)}
                  className="w-full border border-gray-700 bg-[#1b1a29] text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition min-h-[150px]"
                  placeholder="Write your thoughts about the game..."
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition-all ${
                  loading
                    ? "bg-purple-800 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg"
                }`}
              >
                {loading
                  ? "Submitting..."
                  : mode === "create"
                  ? "Submit Review"
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
