const isProd = process.env.NODE_ENV === 'production';

const getServiceHost = (serviceName: string) => {
  return isProd ? serviceName : 'localhost';
};
export const MICROSERVICE_CONFIG = {
  GAME_SERVICE: {
    host: getServiceHost('game'),
    port: 4000,
  },

  REVIEW_SERVICE: {
    host: getServiceHost('review'),
    port: 5000,
  },

  AUTH_SERVICE: {
    host: getServiceHost('auth'),
    port: 6000,
  },

  USER_SERVICE: {
    host: getServiceHost('user'),
    port: 7000,
  },

  DISCUSSION_SERVICE: {
    host: getServiceHost('discussion'),
    port: 8000,
  },

  API_GATEWAY: {
    port: 3000,
  },
};
