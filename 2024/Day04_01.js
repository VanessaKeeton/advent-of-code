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

// Extract rows
// const rows = test.split("\n");
const rows = inputText.split("\n");
// console.log("Rows:", rows);

// Extract columns
const columns = rows.map((row, i) => {
  return rows.map(row => row[i]).join('');
});
// console.log("Columns:", columns);

// Create a grid of the rows
const grid = rows.map(row => row.split(''));

// Extract top-left to bottom-right diagonals
const makeTopLeftToBottomRightDiagonals = (grid) => {
  const diagonals = [];
  const size = grid.length;
  for (let i = 0; i < size; i++) {
    let diagonal = '';
    for (let j = 0; j < size - i; j++) {
      diagonal += grid[j][j + i];
    }
    diagonals.push(diagonal);
  }
  for (let i = 1; i < size; i++) {
    let diagonal = '';
    for (let j = 0; j < size - i; j++) {
      diagonal += grid[j + i][j];
    }
    diagonals.push(diagonal);
  }
  return diagonals;
};

const topLeftToBottomRightDiagonals = makeTopLeftToBottomRightDiagonals(grid);
// console.log("Top-left to Bottom-right Diagonals:", topLeftToBottomRightDiagonals);

// Extract top-right to bottom-left diagonals
const makeTopRightToBottomLeftDiagonals = (grid) => {
  const diagonals = [];
  const size = grid.length;
  for (let i = 0; i < size; i++) {
    let diagonal = '';
    for (let j = 0; j < size - i; j++) {
      diagonal += grid[j][size - 1 - j - i];
    }
    diagonals.push(diagonal);
  }
  for (let i = 1; i < size; i++) {
    let diagonal = '';
    for (let j = 0; j < size - i; j++) {
      diagonal += grid[j + i][size - 1 - j];
    }
    diagonals.push(diagonal);
  }
  return diagonals;
};

const topRightToBottomLeftDiagonals = makeTopRightToBottomLeftDiagonals(grid);
// console.log("Top-right to Bottom-left Diagonals:", topRightToBottomLeftDiagonals);

// Combine all the rows, columns, and diagonals into one array
const allLines = rows.concat(
  columns,
  topLeftToBottomRightDiagonals,
  topRightToBottomLeftDiagonals
);
// console.log("All Lines:", allLines);

// Count occurrences of 'XMAS' or 'SAMX' allowing overlaps
const countXMAS = allLines.reduce((acc, line) => {
  let count = 0;
  for (let i = 0; i <= line.length - 4; i++) {
    const substring = line.substring(i, i + 4);
    if (substring === "XMAS" || substring === "SAMX") {
      count++;
    }
  }
  // console.log(`Line: ${line}, Count: ${count}`);
  return acc + count;
}, 0);

console.log("Count of 'XMAS' or 'SAMX':", countXMAS);
