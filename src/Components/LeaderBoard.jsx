// custom hook 
// dont store derived state in use effect
// xstate 
// grokking simplicity 
// project react cosden solutions
// use debugger not console.log console debug console.info 
// https://overreacted.io/
// src/Components/LeaderBoard.jsx
import React from "react";
import { useSelector } from "react-redux";
import "../styles/LeaderBoard.css";

function LeaderboardModal({ isOpen, onPlayAgain }) {
  const { lastScore, highestScore, leaderboard } = useSelector(state => state.leaderboard);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 style={{ color: "red" }}>Game Over</h2>
        <p>
          Your Score: {lastScore}
          {lastScore === highestScore && " 🏆"}
        </p>

        <p>
          Highest Score 🏆 : {highestScore}
        </p>

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






