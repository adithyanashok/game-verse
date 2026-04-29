import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiSave,
  FiStar,
} from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import {
  createReview,
  updateReview,
} from "../../features/reviews/reviewsSlice";
import type {
  CreateReviewPayload,
  ReviewSummary,
} from "../../features/reviews/types";
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

const ratingItemMeta = [
  {
    label: "Graphics",
    key: "graphics",
    note: "Visual fidelity, art direction, and technical presentation.",
  },
  {
    label: "Gameplay",
    key: "gameplay",
    note: "Controls, flow, encounter design, and moment-to-moment feel.",
  },
  {
    label: "Story",
    key: "story",
    note: "Characters, pacing, world building, and emotional payoff.",
  },
  {
    label: "Sound",
    key: "sound",
    note: "Music, voice work, sound design, and overall atmosphere.",
  },
] as const;

export default function ReviewFormScreen({ mode }: ReviewFormScreenProps) {
  const { state } = useLocation();
  const review = state?.currentReview;
  const game = state?.game ?? review?.game;
  const navigator = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<Form>(
    mode === "edit" && review
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
        },
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof Form>(key: K, val: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (mode === "create" && id === undefined) {
      newErrors.push("Game ID is undefined");
    }

    if (mode === "edit" && !review?.id) {
      newErrors.push("Review details are unavailable for editing");
    }

    if (!form.title.trim()) {
      newErrors.push("Title is required");
    }

    if (!form.review.trim()) {
      newErrors.push("Review cannot be empty");
    }

    ratingItemMeta.forEach((item) => {
      if (form[item.key] < 1) {
        newErrors.push(`${item.label} rating must be at least 1 star`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    let result;

    if (mode === "create") {
      const payload: CreateReviewPayload = {
        title: form.title.trim(),
        comment: form.review.trim(),
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
          title: form.title.trim(),
          comment: form.review.trim(),
          rating: {
            graphics: form.graphics,
            gameplay: form.gameplay,
            story: form.story,
            sound: form.sound,
          },
        }),
      );
    }

    setLoading(false);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        mode === "create"
          ? "Review created successfully!"
          : "Review updated successfully!",
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          theme: "dark",
        },
      );

      if (mode === "create") {
        navigator(`/review/${(result.payload as ReviewSummary).id}`);
      } else {
        navigator(-1);
      }
    } else {
      toast.error(result.payload?.toString() || "Unable to save review", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        theme: "dark",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_16%_0%,rgba(0,212,255,0.16),transparent_32%),radial-gradient(circle_at_84%_10%,rgba(182,255,59,0.08),transparent_24%),linear-gradient(180deg,#070b16_0%,#0d1424_48%,#070b16_100%)] px-3 py-6 sm:px-5 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigator(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[#0d1424]/80 px-4 py-2 text-sm font-bold text-[#c8d3e4] transition hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.1)] hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {game ? (
          <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/82 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur">
            <Banner
              game={game}
              showWriteButton={false}
              badgeLabel={mode === "create" ? "Review draft" : "Review editor"}
            />
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)]">
          <div className="space-y-4">
            <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                    Rating panel
                  </p>
                  <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    {mode === "create" ? "Write a review" : "Edit your review"}
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-[#9aa7bd]">
                    Score the core pillars first, then turn that verdict into a
                    review players will actually want to read.
                  </p>
                </div>

                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(182,255,59,0.16)] bg-[rgba(182,255,59,0.08)]">
                  <FiStar className="h-6 w-6 text-[var(--color-lime)]" />
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {ratingItemMeta.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/60 p-4 shadow-lg shadow-black/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-black text-white">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#9aa7bd]">
                          {item.note}
                        </p>
                      </div>
                      <span className="rounded-full border border-[rgba(0,212,255,0.14)] bg-[rgba(0,212,255,0.08)] px-2.5 py-1 text-xs font-bold text-[var(--color-blue)]">
                        {form[item.key]}/5
                      </span>
                    </div>

                    <div className="mt-4 flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleChange(item.key, star)}
                          className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]"
                          aria-label={`Set ${item.label} rating to ${star}`}
                        >
                          <AiFillStar
                            size={22}
                            className={
                              star <= form[item.key]
                                ? "text-[var(--color-lime)] drop-shadow-[0_0_10px_rgba(182,255,59,0.2)]"
                                : "text-[#475569]"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20 sm:p-6">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-blue)]">
                Review details
              </p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Shape your take
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9aa7bd]">
                Lead with a title players can scan quickly, then explain what
                worked, what fell flat, and whether this game deserves their
                time.
              </p>
            </div>

            {errors.length > 0 ? (
              <div className="mb-6 rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-200">
                {errors.map((err, idx) => (
                  <p key={idx} className="leading-6">
                    - {err}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 text-white placeholder:text-[#6f7d94] focus:border-[rgba(0,212,255,0.34)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.14)]"
                  placeholder="Example: A stylish world held back by repetitive combat"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
                  Your review
                </label>
                <textarea
                  value={form.review}
                  onChange={(e) => handleChange("review", e.target.value)}
                  className="min-h-[260px] w-full resize-none rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 text-white placeholder:text-[#6f7d94] focus:border-[rgba(0,212,255,0.34)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.14)]"
                  placeholder="Write your thoughts about the game. What stood out immediately? Where did it lose momentum? Who would you recommend it to?"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-[rgba(0,212,255,0.12)] pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigator(-1)}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-[#c8d3e4] transition hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${
                    loading
                      ? "cursor-not-allowed border border-white/10 bg-white/6 text-[#7f8ca2]"
                      : "border border-[rgba(182,255,59,0.18)] bg-[var(--color-lime)] text-[#07101a] shadow-lg shadow-[rgba(182,255,59,0.18)] hover:bg-[#ccff6f]"
                  }`}
                >
                  {loading ? (
                    <>
                      <FiSave className="h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="h-4 w-4" />
                      {mode === "create" ? "Submit Review" : "Save Changes"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
