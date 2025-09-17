// utils 
// how to inject env variables in vite 
// react project 
// atomic design philosophy 
// logic code can be written in custom hook
// A finite state machine

const LAST_SCORE_KEY = "lastScore";
const HIGH_SCORE_KEY = "highestScore";
const LEADERBOARD_KEY = "leaderboard";

export function saveLastScore(score) {
  localStorage.setItem(LAST_SCORE_KEY, score)
  console.log(score)
}

export function loadLastScore() {
  return parseInt(localStorage.getItem(LAST_SCORE_KEY)) || 0;
}

export function saveHighestScore(score) {
  const currentHigh = loadHighestScore();
  if (score > currentHigh) {
    localStorage.setItem(HIGH_SCORE_KEY, score);
  }
}

export function loadHighestScore() {
  return parseInt(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
}


export function saveToLeaderboard(name, score) {
  const leaderboard = loadLeaderboard();
  leaderboard.push({ name, score });

  leaderboard.sort((a, b) => b.score - a.score);
  const top10 = leaderboard.slice(0, 10);

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
}

// Load leaderboard
export function loadLeaderboard() {
  return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
}