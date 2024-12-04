const test = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './Day04_input.txt');
const inputText = fs.readFileSync(filePath, 'utf8');

// make a grid of the rows
// const grid = test.split("\n").map(row => row.split(''));
const grid = inputText.split("\n").map(row => row.split(''));

// console.log('Grid:', grid);

// map the characters to their positions in the grid
const preprocessGrid = (grid) => {
  const charMap = {};
  grid.forEach((row, i) => {
    row.forEach((char, j) => {
      if (!charMap[char]) {
        charMap[char] = [];
      }
      charMap[char].push([i, j]);
    });
  });
  return charMap;
};

const charMap = preprocessGrid(grid);
// console.log('Character Map:', charMap);

// Validate that the diagonals are correct
const validateXShape = (center, grid, gridSize) => {
  const [i, j] = center;

  // Ensure diagonals are within bounds
  const isInBounds = (x, y) => x >= 0 && x < gridSize && y >= 0 && y < gridSize;
  if (
    !isInBounds(i - 1, j - 1) || !isInBounds(i + 1, j + 1) || // Diagonal 1
    !isInBounds(i - 1, j + 1) || !isInBounds(i + 1, j - 1)    // Diagonal 2
  ) {
    return false;
  }

  // Extract diagonal 1 (top-left to bottom-right)
  const d1 = [
    grid[i - 1][j - 1],
    grid[i][j],
    grid[i + 1][j + 1]
  ];

  // Extract diagonal 2 (top-right to bottom-left)
  const d2 = [
    grid[i - 1][j + 1],
    grid[i][j],
    grid[i + 1][j - 1]
  ];

  // Check if diagonals match either MAS or SAM
  const isMAS = (diag) => diag[0] === 'M' && diag[1] === 'A' && diag[2] === 'S';
  const isSAM = (diag) => diag[0] === 'S' && diag[1] === 'A' && diag[2] === 'M';

  const d1Valid = isMAS(d1) || isSAM(d1);
  const d2Valid = isMAS(d2) || isSAM(d2);

  return d1Valid && d2Valid;
};



const countXShapes = (grid) => {
  const gridSize = grid.length;
  const charMap = preprocessGrid(grid); // Preprocess grid to map coordinates of 'M', 'A', 'S'
  const centers = charMap['A'] || [];   // Only consider cells containing 'A' as potential centers

  let count = 0;
  centers.forEach(center => {
    if (validateXShape(center, grid, gridSize)) {
      count++;
    }
  });

  return count;
};

console.log('Count of MAS Xs', countXShapes(grid));