import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscussion } from "../../../api/discussion/discussion";
import type { CreateDiscussionPayload } from "../../../features/discussions/types";

export const useDiscussionMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (payload: CreateDiscussionPayload) => createDiscussion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });

  return {
    create,
  };
};
