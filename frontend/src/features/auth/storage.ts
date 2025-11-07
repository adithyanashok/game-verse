import type { User } from "./types";

const STORAGE_KEY = "gameverse-auth";

export interface PersistedAuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const isBrowser = typeof window !== "undefined";

export const loadPersistedAuth = (): PersistedAuthState | null => {
  if (!isBrowser) {
    return null;
  }
  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return null;
    }
    return JSON.parse(serialized) as PersistedAuthState;
  } catch (error) {
    console.warn("Failed to parse persisted auth state", error);
    return null;
  }
};

export const persistAuthState = (state: PersistedAuthState): void => {
  if (!isBrowser) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to persist auth state", error);
  }
};

export const clearPersistedAuth = (): void => {
  if (!isBrowser) {
    return;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear auth state", error);
  }
};
