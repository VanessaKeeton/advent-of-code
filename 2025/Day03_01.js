const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day03_test.txt');
const filePath = path.join(__dirname, './Day03_input.txt');

async function totalOutputJoltage(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sum = 0;

  for await (const line of rl) {
    // console.log('FINAL for line: ', lineOutputJoltage(line));
    sum += +lineOutputJoltage(line)
  }
  console.log('the final sum: ', sum)
}

function lineOutputJoltage(inputStr) {
    // 1. Extract all digits into an array of numbers
    const digits = inputStr.replace(/\D/g, '').split('').map(Number);

    if (digits.length < 2) return digits.join('');

    // 2. Find the index of the first occurrence of the highest digit
    const maxVal = Math.max(...digits);
    const maxIdx = digits.indexOf(maxVal);

    // 3. Logic Branching
    if (maxIdx < digits.length - 1) {
        // CASE A: The highest digit is NOT the last digit
        // Find the highest digit in the remaining slice
        const remaining = digits.slice(maxIdx + 1);
        const secondMax = Math.max(...remaining);
        return `${maxVal}${secondMax}`;
    } else {
        // CASE B: The highest digit IS the last digit
        // Find the highest digit in the slice BEFORE it
        const preceding = digits.slice(0, maxIdx);
        const secondMax = Math.max(...preceding);
        return `${secondMax}${maxVal}`;
    }
}

// test: 357
// input: 17109
console.log(totalOutputJoltage(filePath));