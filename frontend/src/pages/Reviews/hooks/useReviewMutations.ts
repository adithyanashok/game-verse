import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview, updateReview } from "../../../api/review/review";
import type { CreateReviewPayload, UpdateReviewPayload } from "../../../api/review/types";

export const useReviewFormMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReview(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.setQueryData(["review", data.id], data);
    },
  });

  const update = useMutation({
    mutationFn: (payload: UpdateReviewPayload) => updateReview(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.setQueryData(["review", data.id], data);
    },
  });

  return { create, update };
};
