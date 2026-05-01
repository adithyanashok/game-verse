export const buildUrl = (
  path: string,
  searchParams?: Record<string, string | null | undefined>,
) => {
  const params = new URLSearchParams();

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
  }

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};
