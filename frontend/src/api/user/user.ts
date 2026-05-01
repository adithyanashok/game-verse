import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";
import type { ApiResponse } from "../../interfaces/api-response.interface";
import type {
  FollowStatusResponse,
  UpdateUserProfilePayload,
  UserProfile,
} from "../../features/user/types";

export const fetchUserProfile = async (userId: number): Promise<UserProfile> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>(
    API.USER.FETCH_ONE(userId)
  );

  if (!response.data.status || !response.data.data) {
    throw new Error(response.data.message ?? "Failed to load user");
  }

  return {
    ...response.data.data,
    isFollowing: Boolean(response.data.data.isFollowing),
  };
};

export const followUser = async (targetUserId: number): Promise<FollowStatusResponse> => {
  const response = await apiClient.post<ApiResponse<FollowStatusResponse>>(
    API.USER.FOLLOW(targetUserId)
  );

  if (!response.data.status) {
    throw new Error(response.data.message ?? "Failed to follow user");
  }

  return response.data.data;
};

export const unfollowUser = async (targetUserId: number): Promise<FollowStatusResponse> => {
  const response = await apiClient.delete<ApiResponse<FollowStatusResponse>>(
    API.USER.FOLLOW(targetUserId)
  );

  if (!response.data.status) {
    throw new Error(response.data.message ?? "Failed to unfollow user");
  }

  return response.data.data;
};

export const getTopReviewers = async (): Promise<UserProfile[]> => {
  const response = await apiClient.get<ApiResponse<UserProfile[]>>(
    API.USER.GET_TOP_REVIEWERS
  );

  if (!response.data.status) {
    throw new Error(response.data.message ?? "Failed to fetch reviewers");
  }

  return response.data.data;
};

export const uploadUserImage = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<UserProfile>>(
    API.USER.UPLOAD_IMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (!response.data.status || !response.data.data) {
    throw new Error(response.data.message ?? "Upload failed");
  }

  return response.data.data;
};

export const updateUserProfile = async (
  payload: UpdateUserProfilePayload
): Promise<UserProfile> => {
  const response = await apiClient.patch<ApiResponse<UserProfile>>(
    API.USER.UPDATE_USER_PROFILE,
    payload
  );

  if (!response.data.status || !response.data.data) {
    throw new Error(response.data.message ?? "Failed to update user");
  }

  return response.data.data;
};
