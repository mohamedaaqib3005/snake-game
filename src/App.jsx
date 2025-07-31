import React, { useState, useEffect } from 'react';
import './App.css';

const GRID_SIZE = 10;

function App() {
  const [snake, setSnake] = useState([
    [5, 4], // head
    [5, 3],
    [5, 2], // tail
  ]);
  const DIRECTIONS = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
  };

  const direction = 'ArrowRight';

  const isSnakeCell = (row, col) =>
    snake.some(([r, c]) => r === row && c === col);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        const [headRow, headCol] = prev[0];
        const [dRow, dCol] = DIRECTIONS[direction];
        let newRow = headRow + dRow;
        let newCol = headCol + dCol;
        const newHead = [newRow, newCol];
        return [newHead, ...prev.slice(0, -1)];
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="grid">
      {[...Array(GRID_SIZE)].map((_, row) =>
        [...Array(GRID_SIZE)].map((_, col) => (
          <div
            key={`${row}-${col}`}
            className={`cell ${isSnakeCell(row, col) ? 'snake' : ''}`}
          ></div>
        ))
      )}
    </div>
  );
}

export default App;

