import React,{ useState } from 'react';
import './App.css';

const GRID_SIZE = 10;

function App() {
  const [snake] = useState([
    [5, 4], // head
    [5, 3],
    [5, 2], // tail
  ]);

  const isSnakeCell = (row, col) =>
    snake.some(([r, c]) => r === row && c === col);

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

