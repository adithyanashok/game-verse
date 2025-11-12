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
  AUTH_REFRESH = 'auth.refresh',
  // User
  USER_CREATE = 'user.create',
  USER_FIND_BY_ID = 'user.findById',
  USER_FIND_BY_EMAIL = 'user.findByEmail',
  UPDATE_USER = 'user.update',
  GET_USER = 'user.get.profile',
  // Game
  GAME_CREATE = 'game.create',
  GAME_UPDATE = 'game.update',
  GAME_DELETE = 'game.delete',
  GAME_GET = 'game.get',
  GET_GAMES = 'games.get',
  FIND_ONE_GAME = 'game.findone',

  CREATE_GENRE = 'game.genre',
  DELETE_GENRE = 'game.genre.delete',
  // Review
  CREATE_REVIEW = 'review.create',
  LIKE_REVIEW = 'review.like',
  GET_REVIEW = 'review.get',
  GET_TOP_RATED_GAME_IDS = 'review.top.rated.gameids',
  GET_TOP_RATED_GAMES = 'review.top.rated.games',
  INCREASE_VIEWS = 'review.views',
  TRENDING_REVIEWS = 'review.trending',
  RECENT_REVIEWS = 'review.recent',
  SEARCH_REVIEWS = 'review.search',
  GET_REVIEW_BY_GAMEID = 'review.gameId',
  UPDATE_REVIEWS = 'review.update',
  DELETE_REVIEWS = 'review.delete',
  GET_OVERALL_RATING = 'review.rating',
  // Comment
  COMMENT_REVIEWS = 'review.comment',
  GET_COMMENT = 'comment.get',
  UPDATE_COMMENT = 'comment.update',
  DELETE_COMMENT = 'comment.delete',
}
