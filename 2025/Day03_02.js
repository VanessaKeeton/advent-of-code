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

function lineOutputJoltage(line) {
    // 1. Extract all digits
    const digits = line.replace(/\D/g, '').split('').map(Number);
    const targetLength = 12;

    // Handle case where string has fewer than 12 digits
    if (digits.length <= targetLength) {
        return digits.join('');
    }

    let result = [];
    let searchStart = 0;

    // 2. Iterate to find 12 digits
    for (let i = 0; i < targetLength; i++) {
        let maxVal = -1;
        let maxIdx = -1;

        /**
         * The searchEnd is the furthest we can look while still 
         * leaving enough digits to fulfill the rest of the 12-digit requirement.
         * For 12 total, if we are looking for the 'i-th' digit:
         * remaining needed = (targetLength - 1 - i)
         */
        let searchEnd = digits.length - (targetLength - i);

        for (let j = searchStart; j <= searchEnd; j++) {
            if (digits[j] > maxVal) {
                maxVal = digits[j];
                maxIdx = j;
            }
            // Optimization: If we find a 9, we can't do better, so stop searching this range
            if (maxVal === 9) break;
        }

        result.push(maxVal);
        searchStart = maxIdx + 1; // Start next search after the current selection
    }

    return result.join('');
}

// test: 3121910778619
// input: 169347417057382
console.log(totalOutputJoltage(filePath));