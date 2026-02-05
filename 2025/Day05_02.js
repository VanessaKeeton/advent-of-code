const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day05_test.txt');
const filePath = path.join(__dirname, './Day05_input.txt');

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

        // console.log('--- Ranges ---');
        // console.log(ranges);
        // console.log('--- Ids ---');
        // console.log(ids);
        
        return { ranges, ids };

    } catch (err) {
        console.error('Error reading file:', err);
    }
}

processFileByFirstEmptyLine(filePath).then((res) => {
const data = res;
  let fresh = 0;
  let last = 0;
  const orderedRanges = data.ranges.sort((a,b) => a[0] - b[0])
    orderedRanges.forEach(range => {
      if(last >= range[1]) {
        return;
      };
      let start = range[0];
     if(start <= last) {
        start = last + 1;
     }

    fresh += range[1] + 1 - start;
    last = range[1];
  });

  console.log('fresh count ', fresh)
});