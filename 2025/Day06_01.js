const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day06_test.txt');
const filePath = path.join(__dirname, './Day06_input.txt');

async function processFileByFirstEmptyLine(filePath) {
    const numberGrid = [];
    let lastLine;

    function cleanLine(line) {
      // 1. Replace one or more whitespace characters (spaces, tabs) with a single space.
      // The '\s+' regex matches one or more whitespace characters globally ('g' flag).
      let cleaned = line.replace(/\s+/g, ' ');

      // 2. Trim leading/trailing whitespace from the resulting line.
      cleaned = cleaned.trim();
  
      return cleaned;
    }


    try {
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Handles both \r\n and \n line endings
        });

        rl.on('line', (line) => {
          let cleanedLine = cleanLine(line);
          // console.log('cleanedLine', `"${cleanedLine}"`);
          // console.log('lastLine before', lastLine);
          numberGrid.push(cleanedLine.split(' ').map(Number));
          lastLine = cleanedLine.split(' ');
        });

        // Use a promise to wait for the 'close' event, indicating processing is complete
        await new Promise((resolve) => rl.once('close', resolve));

        console.log('lastLine', lastLine);
        console.log('numberGrid', numberGrid);
        numberGrid.pop(); // Remove the last line which is the operator line
        console.log('numberGrid after pop', numberGrid);
        return { numberGrid, operator: lastLine };

    } catch (err) {
        console.error('Error reading file:', err);
    }
}

processFileByFirstEmptyLine(filePath).then(({ numberGrid, operator }) => {
  let grandTotal = 0;
  for(let i = 0; i < operator.length; i++) {
    console.log('operator[i]', operator[i]);
    console.log('numberGrid[i]', numberGrid[i]);
    const op = operator[i];
    // calculate total for this column based on operator
    let totalsByColumn = numberGrid[0][i]; // start with the first number in the column
    for(let j = 1; j < numberGrid.length; j++) {
      const num = numberGrid[j][i];
      console.log('num', num);
      if(op === '+') {
        totalsByColumn += num;
      } else if(op === '-') {
        totalsByColumn -= num;
      } else if(op === '*') {
        totalsByColumn *= num;
      } else if(op === '/') {
        totalsByColumn /= num;
      }
    }
    grandTotal += totalsByColumn;
    console.log(`Total for column ${i} with operator ${op}:`, totalsByColumn);
  }

  console.log('grandTotal', grandTotal);

});
