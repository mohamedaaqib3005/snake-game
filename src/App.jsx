import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const GRID_SIZE = 10;
const INITIAL_SNAKE = [
  [5, 4], // head
  [5, 3],
  [5, 2], // tail
];

const DIRECTIONS = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState('ArrowRight');
  // const directionRef = useRef(direction);
  // directionRef.current = direction;
  const [food, setFood] = useState([4, 6]);

  const isSnakeCell = (row, col) =>
    snake.some(([r, c]) => r === row && c === col);

  const isFoodCell = (row, col) =>
    food[0] == row && food[1] === col;

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

      setDirection(newDir);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [snake]);

  useEffect(() => {
    const interval = setInterval(() => {

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
          let newFood;
          do {
            newFood = [
              Math.floor(Math.random() * GRID_SIZE),
              Math.floor(Math.random() * GRID_SIZE),
            ];
          } while (
            newSnake.some(([r, c]) => r === newFood[0] && c === newFood[1])
          );
          setFood(newFood);
        }

        return newSnake;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div id="grid">
      {[...Array(GRID_SIZE)].map((_, row) =>
        [...Array(GRID_SIZE)].map((_, col) => (
          <div
            key={`${row}-${col}`}
            className={`cell ${isSnakeCell(row, col)
              ? 'snake'
              : isFoodCell(row, col)
                ? 'food'
                : ''
              }`}

          ></div>
        ))
      )}

    </div>
  );
}

export default App;

