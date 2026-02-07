const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day06_test.txt');
const filePath = path.join(__dirname, './Day06_input.txt');

async function processFileByFirstEmptyLine(filePath) {
    const numberGrid = [];
    let lastLine;

    try {
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Handles both \r\n and \n line endings
        });

        rl.on('line', (line) => {
          numberGrid.push(line.split('').reverse());
          lastLine = line.split('').reverse();
        });

        // Use a promise to wait for the 'close' event, indicating processing is complete
        await new Promise((resolve) => rl.once('close', resolve));

        numberGrid.pop(); // Remove the last line which is the operator line
        return { numberGrid, operator: lastLine };

    } catch (err) {
        console.error('Error reading file:', err);
    }
}

processFileByFirstEmptyLine(filePath).then(({ numberGrid, operator }) => {
  let grandTotal = 0;

  let columnTotal = 0;
  let column = [];

  for(let i = 0; i < operator.length; i++) {
    let currentNumber= '';
    for(let j = 0; j < numberGrid.length; j++) {
      const numString = numberGrid[j][i];
      currentNumber = currentNumber + numString; // string
    }
    column.push(currentNumber);

    if (operator[i] !== ' ') {
      // Process the column based on the operator
      if (operator[i] === '+') {
        columnTotal = column.reduce((acc, val) => {
          // make both acc and val numbers before adding
          return +acc + +val;
        }, 0);
      } else if (operator[i] === '-') {
        columnTotal = column.reduce((acc, val) => +acc - +val, 0);
      } else if (operator[i] === '*') {
        columnTotal = column.reduce((acc, val) => {
          if (val.trim() === '') return +acc; // If val is just a space, treat it as 1 for multiplication
          return +acc * +val;
        }, 1);
      } else if (operator[i] === '/') {
        columnTotal = column.reduce((acc, val) => {
          if (val.trim() === ' ') return +acc; // If val is just a space, treat it as 1 for division
          return +acc / +val;
        }, 1);
      }
      grandTotal += columnTotal;
      column = []; // Reset column for the next operator
    }

  }
  console.log('grandTotal', grandTotal);
});
