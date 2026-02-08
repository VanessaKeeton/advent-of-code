const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day07_test.txt');
const filePath = path.join(__dirname, './Day07_input.txt');

async function processFileByFirstEmptyLine(filePath) {
    const grid = [];

    try {
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Handles both \r\n and \n line endings
        });

        rl.on('line', (line) => {
          grid.push(line.split(''));
        });

        // Use a promise to wait for the 'close' event, indicating processing is complete
        await new Promise((resolve) => rl.once('close', resolve));

        return grid;

    } catch (err) {
        console.error('Error reading file:', err);
    }
}

processFileByFirstEmptyLine(filePath).then((grid) => {
  const beamStart = grid[0].findIndex((i) => i === 'S');
  
  // Create a cache: "rowIndex,colIndex" -> BigInt (number of paths)
  const memo = new Map();

  function findThePath(rowIndex, colIndex) {
    // 1. Base Case: If we reached the bottom row
    if (rowIndex === grid.length - 1) {
      return 1n; // Use BigInt for very large numbers
    }

    // 2. Check Cache: Have we been at this specific spot before?
    const key = `${rowIndex},${colIndex}`;
    if (memo.has(key)) return memo.get(key);

    let totalPaths = 0n;
    let nextRow = rowIndex + 1;
    let nextChar = grid[nextRow][colIndex];

    if (nextChar === '^') {
      // Split logic: Go left AND right
      // We assume dir is handled by checking colIndex - 1 and colIndex + 1
      totalPaths += findThePath(nextRow, colIndex - 1);
      totalPaths += findThePath(nextRow, colIndex + 1);
    } else {
      // Continue straight down
      totalPaths += findThePath(nextRow, colIndex);
    }

    // 3. Save result in cache before returning
    memo.set(key, totalPaths);
    return totalPaths;
  }

  if (beamStart !== -1) {
    const result = findThePath(0, beamStart);
    console.log('finalPathCount is:', result.toString());
  }
});
