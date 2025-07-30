const grid = document.getElementById("grid");

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        const cell = document.createElement("span");
        const state = stateGrid[row][col];

        cell.classList.add("cell");
        if (state === 1) {
            cell.classList.add("active");
        }

        grid.appendChild(cell);
    }
}
