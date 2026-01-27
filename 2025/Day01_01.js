const fs = require('fs');
const path = require('path');
const readline = require('readline');

// const filePath = path.join(__dirname, './Day01_input.txt');
const filePath = path.join(__dirname, './Day01_test.txt');

async function processLineByLine() {
  console.log("in process")
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // Recognizes all instances of CR LF (\r\n) as a single line break
  });

  let count = 0;
  let sum = 50;

  for await (const line of rl) {
    // Process each line individually here
    // console.log(`Line from file: ${line}`);
    const dir = line.slice(0, 1); 

    // Extract the rest of the string and convert it to a number
    const number = +line.slice(1);
    
    if(dir === 'L') {
      console.log('is L')
      sum -= number;
    } else {
      console.log('is R')
      sum += number;
    }
    console.log(sum)

    if (sum === 0 || sum % 100 === 0) {
      console.log('sum ', sum)
      count++
    }
  }

  console.log(count);
}

processLineByLine();

console.log()