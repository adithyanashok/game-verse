export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    PROFILE: "/auth/profile",
  },
  USER: {
    FETCH_ALL: "/users",
    FETCH_ONE: (id: string | number) => `/users/${id}`,
  },
  GAME: {
    GET_TOP_RATED_GAMES: "game/get-top-rated-games",
    CREATE: "/game/create",
    LIST: "/game/list",
    GET_GAME: "/game/get-game",
    GET_GAMES: "/game/get-games",
  },
  REVIEWS: {
    GET_BY_GAMEID: "/review/get-by-gameid",
    RECENT_REVIEW: "/review/recent-review",
    TRENDING_REVIEW: "/review/trending-review",
    GET_REVIEW: "/review/get-review",
    UPDATE_REVIEW_VIEW: "/review/update-view",
    LIKE_REVIEW: "/review/like-review",
    SEARCH_REVIEW: "/review/search-review",
    ADD_COMMENT: "/review/add-comment",
    GET_COMMENTS: "/review/get-comments",
    UPDATE_COMMENT: "/review/update-comment",
    DELETE_COMMENT: "/review/delete-comment",
  },
  GENRE: {
    CREATE: "/genre/create",
    GET_ALL: "/genre",
  },
};
