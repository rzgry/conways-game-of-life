import "./styles.css";
import sleep from "./sleep";
import _get from "lodash/get";

const GRID_SIZE = 30;
const BLOCK_SIZE = 15;

const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

ctx.canvas.width = GRID_SIZE * BLOCK_SIZE;
ctx.canvas.height = GRID_SIZE * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// randomly generate a grid of alive and dead cells
// true = alive, false = dead
function generateGrid(gridSize) {
  const grid = [];

  for (let i = 0; i < gridSize; i += 1) {
    const row = [];
    for (let j = 0; j < gridSize; j += 1) {
      row.push(Boolean(Math.round(Math.random())));
    }
    grid.push(row);
  }

  return grid;
}

// deep copy grid into a new 2d array
function deepCopyGrid(grid) {
  return grid.map((row) => [...row]);
}

// get a count of alive neighbors for cell at position i,j
function countAliveNeighbors(grid, i, j) {
  const neighbors = [
    _get(grid, `[${i - 1}][${j}]`),
    _get(grid, `[${i - 1}][${j + 1}]`),
    _get(grid, `[${i}][${j - 1}]`),
    _get(grid, `[${i}][${j + 1}]`),
    _get(grid, `[${i + 1}][${j - 1}]`),
    _get(grid, `[${i - 1}][${j - 1}]`),
    _get(grid, `[${i + 1}][${j}]`),
    _get(grid, `[${i + 1}][${j + 1}]`),
  ];

  const aliveNeighborsCount = neighbors.reduce(
    (aliveCount, currentNeighbor) => {
      if (currentNeighbor) {
        aliveCount += 1;
      }
      return aliveCount;
    },
    0
  );

  return aliveNeighborsCount;
}

// given a grid it applies the rules
// for a single iteration of the game of life
// and returns a new grid
// true = cell alive, false = cell dead
function applyRules(grid) {
  const newGrid = deepCopyGrid(grid);

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid.length; j += 1) {
      const aliveNeighborsCount = countAliveNeighbors(grid, i, j);
      // if cell is alive the cell dies if < 2 or more than 3 neighbors
      if (grid[i][j] && (aliveNeighborsCount < 2 || aliveNeighborsCount > 3)) {
        newGrid[i][j] = false;
        // else if the cell is dead and it has 3 alive neighbors the cell becomes alive
      } else if (!grid[i][j] && aliveNeighborsCount === 3) {
        newGrid[i][j] = true;
      }
    }
  }

  return newGrid;
}

function drawGrid(grid) {
  ctx.clearRect(0, 0, grid.length, grid.length);
  ctx.fillStyle = "#FF0000";
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j]) {
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

async function gameOfLife() {
  let iterationsTxtElement = document.getElementById("iterations");
  let resetBtnElement = document.getElementById("reset");

  let grid = generateGrid(GRID_SIZE);
  let iterations = 0;

  resetBtnElement.onclick = () => {
    grid = generateGrid(GRID_SIZE);
    iterations = 0;
  };

  while (true) {
    drawGrid(grid);
    iterationsTxtElement.textContent = `Iterations: ${iterations}`;
    grid = applyRules(grid);
    iterations += 1;
    await sleep(200);
  }
}

gameOfLife();
