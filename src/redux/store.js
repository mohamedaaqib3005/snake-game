
import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "../features/leaderboard/leaderboardSlice";

export const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer
  }
});

