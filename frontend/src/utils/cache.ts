export const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;

export const isCacheFresh = (
  timestamp?: number | null,
  ttl = DEFAULT_CACHE_TTL_MS,
) => {
  if (typeof timestamp !== "number") {
    return false;
  }

  return Date.now() - timestamp < ttl;
};
