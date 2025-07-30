import React from 'react';
import './App.css';

const stateGrid = [
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
  [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];

function App() {
  return (
    <div id="grid">
      {stateGrid.map((row, rowIndex) =>
        row.map((state, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${state === 1 ? 'active' : ''}`}
          ></div>
        ))
      )}
    </div>
  );
}

export default App;
