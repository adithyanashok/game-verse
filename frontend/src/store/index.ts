import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import gameReducer from "../features/games/gamesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    game: gameReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
