import { createSlice } from "@reduxjs/toolkit";

const LAST_SCORE_KEY = "lastScore";

const HIGH_SCORE_KEY = "highestScore";

const LEADERBOARD_KEY = "leaderboard";

function safeParseJSON(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
}

const initialState = {
  lastScore: 0,

  highestScore: 0,

  [LEADERBOARD_KEY]: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",

  initialState,

  reducers: {
    setLastScore(state, action) {

      state.lastScore = action.payload;
    },

    setHighestScore(state, action) {
      if (state.leaderboard.length > 0) {
        const topScore = state.leaderboard[0].score;
        console.log({topScore})
        state.highestScore = Math.max(state.highestScore, topScore);
      }
    },

    setLeaderboard(state, action) {
      state.leaderboard = [...action.payload].sort((a, b) => b.score - a.score);

    },

    resetLeaderboard(state) {
      state.lastScore = 0;

      state.highestScore = 0;

      state.leaderboard = [];
    },
  },
});

export const {
  setLastScore,

  setHighestScore,

  setLeaderboard,

  resetLeaderboard,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;

export const persistLastScore = (score) => (dispatch) => {
  localStorage.setItem(LAST_SCORE_KEY, String(score));
  console.log(LAST_SCORE_KEY)
  dispatch(setLastScore(score));
};

export const persistHighestScore = (score) => (dispatch) => {
  // const currentHigh = getState().leaderboard.highestScore;

  // if (score > currentHigh) {

  localStorage.setItem(HIGH_SCORE_KEY, String(score));

  dispatch(setHighestScore(score));

  // }
};

export const persistAddToLeaderboard = ({  score }) => (dispatch) => {
  const rawBoard = localStorage.getItem(LEADERBOARD_KEY);
  const current = safeParseJSON(rawBoard, []);
  console.log(current);
  const sorted = [...current].sort((a, b) => b.score - a.score);
  const qualifies = sorted.length < 10 || score > sorted[sorted.length - 1].score;

  if (!qualifies) return ;
  var name = prompt("Congrats! You made the Top 10  Enter your name:");

  const updated = [...sorted, { name, score }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));

   dispatch(setLeaderboard(updated));
   dispatch(setHighestScore(score));
};

