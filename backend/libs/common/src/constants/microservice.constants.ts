const getHost = (envVar: string, productionFallback: string) => {
  return (
    process.env[envVar] ||
    (process.env.NODE_ENV === 'production' ? productionFallback : 'localhost')
  );
};

export const MICROSERVICE_CONFIG = {
  get GAME_SERVICE() {
    return {
      host: getHost('GAME_HOST', 'game'),
      port: 4000,
    };
  },
  get REVIEW_SERVICE() {
    return {
      host: getHost('REVIEW_HOST', 'review'),
      port: 5000,
    };
  },
  get AUTH_SERVICE() {
    return {
      host: getHost('AUTH_HOST', 'auth'),
      port: 6000,
    };
  },
  get USER_SERVICE() {
    return {
      host: getHost('USER_HOST', 'user'),
      port: 7000,
    };
  },
  get DISCUSSION_SERVICE() {
    return {
      host: getHost('DISCUSSION_HOST', 'discussion'),
      port: 8000,
    };
  },
  API_GATEWAY: {
    port: 3000,
  },
};
