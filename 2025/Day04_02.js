const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day04_test.txt');
const filePath = path.join(__dirname, './Day04_input.txt');

async function makeGrid(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const grid = [];
  for await (const line of rl) {
    if (line.trim().length > 0) {
      grid.push([...line.trim()]);
    }
  }

  return grid;
}

let grid = [];
makeGrid(filePath).then((res) => {
  grid = res;
  let loop = true;
  let finalCount = 0;
  while(loop) {
    let passCount = 0;
    let nextGrid = grid.map(a => [...a]);
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '@') {
          // 1. Get the actual count for this specific cell
          const adjacentAtCount = getAdjacentRowCount(grid, i, j);
        
          // 2. Only increment if the condition is met
          if (adjacentAtCount < 4) {
            passCount++;
            nextGrid[i][j] = 'x';
            // console.log(nextGrid[i].join(''));
            // Optional: log exactly which positions are triggering it
            // console.log(`Position [${i},${j}] has only ${adjacentAtCount} neighbors.`);
          }
        }
      }
    }
    if(passCount === 0) {
      loop = false;
    }

    finalCount += passCount;
    grid = nextGrid;
  }
  // console.log(grid);
  console.log('FINAL COUNT: ', finalCount);
})

function getAdjacentRowCount(grid, row, col) {
    const rowLimit = grid.length;
    const colLimit = grid[0].length;
    // console.log('colLimit ', colLimit)
    let count = 0;

    // The 8 relative directions (dr = delta row, dc = delta column)
    const offsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
    ];

    offsets.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;

        // Boundary Check: Ensure the cell exists within the grid
        if (newRow >= 0 && newRow < rowLimit && newCol >= 0 && newCol < colLimit) {
            if(grid[newRow][newCol] === '@') {
              count++;
            }
        }
    });

    return count;
};