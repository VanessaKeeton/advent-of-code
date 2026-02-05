const fs = require('fs');
const path = require('path');
const readline = require('readline');


const filePath = path.join(__dirname, './Day05_test.txt');
// const filePath = path.join(__dirname, './Day05_input.txt');

async function processFileByFirstEmptyLine(filePath) {
    const ranges = [];
    const ids = [];
    let foundEmptyLine = false;

    try {
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // Handles both \r\n and \n line endings
        });

        rl.on('line', (line) => {
            // Trim the line to handle lines with just whitespace as "empty"
            if (!foundEmptyLine && line.trim() === '') {
                foundEmptyLine = true;
            } else if (!foundEmptyLine) {
               const dash = line.indexOf('-');
              ranges.push([
                Number(line.slice(0, dash)),
                Number(line.slice(dash + 1))
              ]);

            } else {
                ids.push(+line);
            }
        });

        // Use a promise to wait for the 'close' event, indicating processing is complete
        await new Promise((resolve) => rl.once('close', resolve));

        console.log('--- Ranges ---');
        console.log(ranges);
        console.log('--- Ids ---');
        console.log(ids);
        
        return { ranges, ids };

    } catch (err) {
        console.error('Error reading file:', err);
    }
}

processFileByFirstEmptyLine(filePath).then((res) => {
const data = res;
const orderedIds = data.ids.sort((a,b) => a - b);
  let fresh = 0;
  orderedIds.forEach(id => {
  for(i = 0; i < data.ranges.length; i++) {
    if(id >= data.ranges[i][0] && id <= data.ranges[i][1]) {
      fresh++
      break;
    }
  }
});
console.log('fresh ', fresh)
});
