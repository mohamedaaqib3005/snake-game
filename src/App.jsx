import React, { useState, useEffect } from "react";
import "./App.css";
import Modal from "./Components/Modal";
import LeaderBoardModal from "./Components/LeaderBoard";
// import { persistHighestScore } from "./features/leaderboard/leaderboardSlice";
import { persistHighestScore, persistLastScore } from "./features/leaderboard/leaderboardSlice";
import { persistAddToLeaderboard } from "./features/leaderboard/leaderboardSlice";
import {
  saveLastScore,
  saveHighestScore,
  saveToLeaderboard,
} from "./Components/LeaderBoardStore";
import { useDispatch } from "react-redux";

const GRID_SIZE = 10;
const INITIAL_SNAKE = [
  [4, 4], // head
  [4, 3],
  [4, 2], // tail
];

const DIRECTIONS = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState("ArrowRight");
  // const directionRef = useRef(direction);
  // directionRef.current = direction;
  const [food, setFood] = useState([4, 6]);
  const [gameover, setGameover] = useState(false);
  const [score, setscore] = useState(0);
  const dispatch = useDispatch();

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const isSnakeCell = (row, col) =>
    snake.some(([r, c]) => r === row && c === col);

  const isFoodCell = (row, col) => food[0] == row && food[1] === col;

  useEffect(() => {
    const handleKey = (e) => {
      const newDir = e.key;
      if (!DIRECTIONS[newDir]) return;

      const [drNew, dcNew] = DIRECTIONS[newDir];
      const [headRow, headCol] = snake[0];
      const second = snake[1];

      // prevent 180° reversal
      if (
        second &&
        second[0] === headRow + drNew &&
        second[1] === headCol + dcNew
      ) {
        return;
      }

      setDirection((prevDir) => (prevDir !== newDir ? newDir : prevDir));
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [snake]);

  useEffect(() => {
    console.log("direc");
    const interval = setInterval(() => {
      if (gameover) return;
      console.log("prev");
      setSnake((prev) => {
        const [headRow, headCol] = prev[0];
        const [dRow, dCol] = DIRECTIONS[direction];
        let newRow = headRow + dRow;
        let newCol = headCol + dCol;

        // wrapping
        if (newRow < 0) newRow = GRID_SIZE - 1;
        if (newRow >= GRID_SIZE) newRow = 0;
        if (newCol < 0) newCol = GRID_SIZE - 1;
        if (newCol >= GRID_SIZE) newCol = 0;

        const newHead = [newRow, newCol];
        const hasEaten = food[0] === newRow && food[1] === newCol;

        const newSnake = hasEaten
          ? [newHead, ...prev]
          : [newHead, ...prev.slice(0, -1)];

        if (hasEaten) {
          console.log(food, "previous food ");
          console.log(prev[0], "previous snake head");
          setscore((prevScore) => {
            dispatch(persistHighestScore(prevScore + 1))
            console.log(prevScore);

            return prevScore + 1;
          });
          let newFood;
          do {
            newFood = [
              Math.floor(Math.random() * GRID_SIZE),
              Math.floor(Math.random() * GRID_SIZE),
            ];
          } while (
            newSnake.some(
              ([row, col]) => row === newFood[0] && col === newFood[1]
            )
          );
          setFood(newFood);
        }

        const body = prev.slice(1);

        if (body.some(([r, c]) => r === newRow && c === newCol)) {
          dispatch(persistLastScore(score))
          dispatch(persistAddToLeaderboard({ score}))
          setGameover(true);
          saveLastScore(score);
          saveHighestScore(score);
          saveToLeaderboard( score);

          setIsLeaderboardOpen(true);

          return prev;
        }

        return newSnake;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [direction, food]);

  return (
    <div className="game-container">
      <h2>Score: {score}</h2>
      <div id="grid">
        {[...Array(GRID_SIZE)].map((_, row) =>
          [...Array(GRID_SIZE)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`cell ${
                isSnakeCell(row, col)
                  ? "snake"
                  : isFoodCell(row, col)
                  ? "food"
                  : ""
              }`}
            ></div>
          ))
        )}
      </div>
      {gameover && (
        <LeaderBoardModal
          isOpen={isLeaderboardOpen}
          onPlayAgain={() => {
            setSnake(INITIAL_SNAKE);
            setDirection("ArrowRight");
            setFood([4, 6]);
            setscore(0);
            setGameover(false);
            setIsLeaderboardOpen(false);
          }}
        />
      )}

      <LeaderBoardModal
        isOpen={isLeaderboardOpen}
        onPlayAgain={() => {
          setSnake(INITIAL_SNAKE);
          setDirection("ArrowRight");
          setFood([4, 6]);
          setscore(0);
          setGameover(false);
          setIsLeaderboardOpen(false);
        }}
      />
    </div>
  );
}

export default App;


