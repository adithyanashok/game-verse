export const MICROSERVICE_CONFIG = {
  GAME_SERVICE: {
    host:
      process.env.GAME_HOST ||
      (process.env.NODE_ENV === 'production' ? 'game' : 'localhost'),
    port: 4000,
  },
  REVIEW_SERVICE: {
    host:
      process.env.REVIEW_HOST ||
      (process.env.NODE_ENV === 'production' ? 'review' : 'localhost'),
    port: 5000,
  },
  AUTH_SERVICE: {
    host:
      process.env.AUTH_HOST ||
      (process.env.NODE_ENV === 'production' ? 'auth' : 'localhost'),
    port: 6000,
  },
  USER_SERVICE: {
    host:
      process.env.USER_HOST ||
      (process.env.NODE_ENV === 'production' ? 'user' : 'localhost'),
    port: 7000,
  },
  DISCUSSION_SERVICE: {
    host:
      process.env.DISCUSSION_HOST ||
      (process.env.NODE_ENV === 'production' ? 'discussion' : 'localhost'),
    port: 8000,
  },
  API_GATEWAY: {
    port: 3000,
  },
};
