import React, { useEffect, useState } from "react";
import {
  loadLastScore,
  loadHighestScore,
  loadLeaderboard
} from "./LeaderBoardStore";

import "../styles/LeaderBoard.css"

function LeaderboardModal({ isOpen, onPlayAgain }) {
  const [yourScore, setYourScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const last = loadLastScore();
    const high = loadHighestScore();
    const board = loadLeaderboard();

    setYourScore(last);
    setHighestScore(high);
    setLeaderboard(board);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 style={{ color: "red" }}>Game Over</h2>
        <p>Your Score: {yourScore}</p>
        <p>Highest Score: {highestScore}</p>

        <h3>Leaderboard</h3>
        <ol>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.name} - {entry.score}
            </li>
          ))}
        </ol>

        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
}

export default LeaderboardModal;
