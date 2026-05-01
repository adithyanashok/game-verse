import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  followUser,
  unfollowUser,
  getTopReviewers,
  uploadUserImage,
  updateUserProfile,
} from "../api/user/user";
import type { UpdateUserProfilePayload } from "../features/user/types";

export const useUserProfile = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserProfile(userId!),
    enabled: !!userId,
  });
};

export const useTopReviewers = () => {
  return useQuery({
    queryKey: ["user", "topReviewers"],
    queryFn: getTopReviewers,
  });
};

export const useUserMutations = (userId?: number) => {
  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationFn: (targetId: number) => followUser(targetId),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
      }
    },
  });

  const unfollow = useMutation({
    mutationFn: (targetId: number) => unfollowUser(targetId),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
      }
    },
  });

  const updateProfile = useMutation({
    mutationFn: (payload: UpdateUserProfilePayload) =>
      updateUserProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.id], data);
    },
  });

  const uploadImage = useMutation({
    mutationFn: (file: File) => uploadUserImage(file),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.id], data);
    },
  });

  return { follow, unfollow, updateProfile, uploadImage };
};
