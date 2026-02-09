const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day09_test.txt');
const filePath = path.join(__dirname, './Day09_input.txt');

async function processFile(filePath) {
    const grid = [];

    try {
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Handles both \r\n and \n line endings
        });

        rl.on('line', (line) => {
          grid.push(line.split(','));
        });

        // Use a promise to wait for the 'close' event, indicating processing is complete
        await new Promise((resolve) => rl.once('close', resolve));

        return grid;

    } catch (err) {
        console.error('Error reading file:', err);
    }
}

processFile(filePath).then((grid) => {
  console.log(grid);

  let biggest = 0;

  for(let i = 0; i < grid.length - 1; i++){
    for(let j = i+1; j < grid.length; j++) {
      let d1 = Math.abs(grid[i][0] - grid[j][0]) + 1;
      let d2 = Math.abs(grid[i][1] - grid[j][1]) + 1;

      let area = d1 * d2;

      biggest = Math.max(area, biggest);
    }
  }

  console.log('biggest is ', biggest);
});
