const fs = require('fs');
const path = require('path');
const readline = require('readline');


// const filePath = path.join(__dirname, './Day02_test.txt');
const filePath = path.join(__dirname, './Day02_input.txt');

async function processCSV(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // Split the comma-separated string into an array
    const values = line.split(',');
    console.log('FINAL for line: ', findBadIdsSum(values));
    // console.log('Row values:', values);
  }
}

function findBadIdsSum(ranges) {
  console.log(ranges);
  let sum = 0;
  for (let i = 0; i < ranges.length; i++) {
    let [num1, num2] = ranges[i].split('-').map(Number);
    sum += sumRepeatingPatterns(num1, num2);
    console.log(sum);
  }
  return sum;
}

function sumRepeatingPatterns(min, max) {
  let sum = 0;
  
  const minDigits = min.toString().length;
  const maxDigits = max.toString().length;
  
  for (let totalDigits = minDigits; totalDigits <= maxDigits; totalDigits++) {
    // For Part 1: only even digit counts can be split exactly in half
    if (totalDigits % 2 !== 0) continue;
    
    const patternLen = totalDigits / 2; // Exactly half
    
    // Calculate range of valid patterns
    const minPattern = Math.pow(10, patternLen - 1);
    const maxPattern = Math.pow(10, patternLen) - 1;
    
    // Generate all numbers from this pattern
    for (let pattern = minPattern; pattern <= maxPattern; pattern++) {
      const num = buildRepeatingNumber(pattern, 2); // Always 2 repetitions
      
      // Only sum if in range
      if (num >= min && num <= max) {
        sum += num;
      }
    }
  }
  
  return sum;
}

function buildRepeatingNumber(pattern, repetitions) {
  const patternLen = pattern.toString().length;
  const multiplier = Math.pow(10, patternLen);
  
  let result = 0;
  for (let i = 0; i < repetitions; i++) {
    result = result * multiplier + pattern;
  }
  return result;
}

// Example: sum from 11 to 100
// console.log(sumRepeatingPatterns(998, 1012)); // 998-1012

// answer for example 1227775554
// answer for input 53420042388
console.log(processCSV(filePath));