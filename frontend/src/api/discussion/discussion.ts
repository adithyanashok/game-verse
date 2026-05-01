import apiClient from "../../services/apiClient";
import { API } from "../../services/endpoints";
import type { ApiResponse, CreateDiscussionPayload, Discussion } from "../../features/discussions/types";

export const getDiscussions = async (): Promise<Discussion[]> => {
  const res = await apiClient.get<ApiResponse<Discussion[]>>(API.DISCUSSIONS.GET_ALL);
  if (!res.data.status) {
    throw new Error(res.data.message ?? "Failed to load discussions");
  }
  return res.data.data;
};

export const createDiscussion = async (payload: CreateDiscussionPayload): Promise<Discussion> => {
  const res = await apiClient.post<ApiResponse<Discussion>>(API.DISCUSSIONS.CREATE, payload);
  if (!res.data.status) {
    throw new Error(res.data.message ?? "Failed to create discussion");
  }
  return res.data.data;
};

export const getDiscussion = async (id: string): Promise<Discussion> => {
  const res = await apiClient.get<ApiResponse<Discussion>>(API.DISCUSSIONS.GET_ONE(id));
  if (!res.data.status) {
    throw new Error(res.data.message ?? "Failed to load discussion");
  }
  return res.data.data;
};
