const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, './Day01_input.txt');
// const filePath = path.join(__dirname, './Day01_test.txt');
let totalZeros = 0;
let currStart = 50;

async function processLineByLine() {
  console.log("in process")
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // Recognizes all instances of CR LF (\r\n) as a single line break
  });

  for await (const line of rl) {
    // Process each line individually here
    // console.log(`Line from file: ${line}`);
    const dir = line.slice(0, 1); 

    // Extract the rest of the string and convert it to a number
    const number = +line.slice(1);

  const next = countZeroPasses(99,dir,number,currStart)
  totalZeros = totalZeros + next[0];
  currStart = next[1];

  }
  console.log(totalZeros);
}

function countZeroPasses(max,dir,steps,start) {
  // console.log('countZeroPasses entered', dir + steps);
  // make two pointers
  let i = start; // keep track of real number in sequence
  let p = steps; // keep track of steps across the sequence

  let count = 0; // number of times we hit 0

  if (dir === 'L') {
    if (i === 0) {
      count++;
      i = max;
      p--;
    }
    // Left Loop
    while(p > 0) {
      if (i == 0) {
        count++;
      }
      i--;
      // console.log('i: ', i, 'p: ', p);
      if(i === -1){
        i = max;
      }
      p--;
    }
  } else {
    if (i === 0) {
      count++;
      i++;
      p--;
    }
    // Right Loop
    while(p > 0) {
      if (i === 0) {
        count++
      }
      i++;
      if(i === max + 1) {
        i = 0;
      }
      p--;
    }
  }

  // console.log('count is: ', count);
  // console.log('index is:', i);
  return [count,i];
}

processLineByLine();
