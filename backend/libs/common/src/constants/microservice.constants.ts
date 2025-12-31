export const MICROSERVICE_CONFIG = {
  GAME_SERVICE: {
    host: process.env.GAME_HOST || 'localhost',
    port: 4000,
  },
  REVIEW_SERVICE: {
    host: process.env.REVIEW_HOST || 'localhost',
    port: 5000,
  },
  AUTH_SERVICE: {
    host: process.env.AUTH_HOST || 'localhost',
    port: 6000,
  },
  USER_SERVICE: {
    host: process.env.USER_HOST || 'localhost',
    port: 7000,
  },
  DISCUSSION_SERVICE: {
    host: process.env.DISCUSSION_HOST || 'localhost',
    port: 8000,
  },
  API_GATEWAY: {
    port: 3000,
  },
};
