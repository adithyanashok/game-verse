import { useQuery } from "@tanstack/react-query";
import { getDiscussions, getDiscussion } from "../../../api/discussion/discussion";

export const useDiscussionsData = () => {
  return useQuery({
    queryKey: ["discussions"],
    queryFn: getDiscussions,
  });
};

export const useDiscussionData = (discussionId: string | null) => {
  return useQuery({
    queryKey: ["discussion", discussionId],
    queryFn: () => getDiscussion(discussionId!),
    enabled: !!discussionId,
  });
};
