export enum ServiceName {
  AUTH = 'AUTH_SERVICE',
  USER = 'USER_SERVICE',
  GAME = 'GAME_SERVICE',
  REVIEW = 'REVIEW_SERVICE',
}

export enum MessagePatterns {
  // Auth
  AUTH_SIGNUP = 'auth.signup',
  AUTH_SIGNIN = 'auth.signin',
  AUTH_VALIDATE = 'auth.validate',
  // User
  USER_CREATE = 'user.create',
  USER_FIND_BY_ID = 'user.findById',
  USER_FIND_BY_EMAIL = 'user.findByEmail',
  // Game
  GAME_CREATE = 'game.create',
  GAME_UPDATE = 'game.update',
  GAME_DELETE = 'game.delete',
  GAME_GET = 'game.get',
  FIND_ONE_GAME = 'game.findone',
  // Review
  CREATE_REVIEW = 'review.create',
  LIKE_REVIEW = 'review.like',
}
