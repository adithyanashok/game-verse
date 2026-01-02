const isProd = process.env.NODE_ENV === 'production';

const getServiceHost = (serviceName: string) => {
  return isProd ? serviceName : 'localhost';
};
export const MICROSERVICE_CONFIG = {
  GAME_SERVICE: {
    host: 'game',
    port: 4000,
  },

  REVIEW_SERVICE: {
    host: 'review',
    port: 5000,
  },

  AUTH_SERVICE: {
    host: 'auth',
    port: 6000,
  },

  USER_SERVICE: {
    host: 'user',
    port: 7000,
  },

  DISCUSSION_SERVICE: {
    host: 'discussion',
    port: 8000,
  },

  API_GATEWAY: {
    port: 3000,
  },
};
