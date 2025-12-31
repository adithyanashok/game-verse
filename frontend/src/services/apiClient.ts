import axios from "axios";

import { loadPersistedAuth } from "../features/auth/storage";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  const persisted = loadPersistedAuth();
  if (persisted?.accessToken) {
    config.headers = config.headers ?? {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${persisted.accessToken}`;
    }
  }
  return config;
});

export default apiClient;
