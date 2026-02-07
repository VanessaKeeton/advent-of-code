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
 
  // console.log('grid', grid);
  let beamSplitCount = 0;

  for (let i = 0; i < grid.length - 1; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i === 0 && grid[i][j] === 'S') {
        // console.log('Found S at position:', i, j);
        grid[i + 1][j] = '|'; // add the tachyon beam below the S
        break; // stop searching for S after the first one is found
      }

      if (grid[i][j] === '^' && grid[i - 1][j] === '|') {
        // console.log('Found ^ at position:', i, j);
        grid[i][j - 1] = '|'; // add the tachyon beam to the left of ^
        grid[i][j + 1] = '|'; // add the tachyon beam to the right of ^
        beamSplitCount++; // increment the count of beam splits

        if (grid[i + 1][j - 1] !== '^') {
          grid[i + 1][j - 1] = '|'; // add the tachyon beam below |
        }
        if (grid[i + 1][j + 1] !== '^') {
          grid[i + 1][j + 1] = '|'; // add the tachyon beam below |
        }
      }

      if (grid[i][j] === '|' && grid[i + 1][j] !== '^') {
        // console.log('Found | at position:', i, j);
        grid[i + 1][j] = '|'; // add the tachyon beam below |
      }
    }
  }

  // console.log('Final grid:');
  // grid.forEach(row => console.log(row.join('')));
  console.log('Total beam splits:', beamSplitCount);
});
