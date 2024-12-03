const test = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './Day03_input.txt');
const inputText = fs.readFileSync(filePath, 'utf8');

// parse the input text, multiple number that match /mul\((\d{1,3}),(\d{1,3})\)/g, and add them together
// stop adding when you read a string of don't(), and start again after you read do().
const parseAndSum = (inputText) => {
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const controlRegex = /don't\(\)|do\(\)/g;

  let sum = 0;
  let adding = true;

  // Extract control sequences and mul() calls in order
  const tokens = [...inputText.matchAll(controlRegex), ...inputText.matchAll(mulRegex)]
    .sort((a, b) => a.index - b.index); // Sort by occurrence in the text

  tokens.forEach(token => {
    if (token[0] === "don't()") {
      adding = false;
    } else if (token[0] === "do()") {
      adding = true;
    } else if (token[0].startsWith('mul(') && adding) {
      // If adding is enabled, calculate the product and add to sum
      const a = parseInt(token[1], 10);
      const b = parseInt(token[2], 10);
      sum += a * b;
    }
  });

  return sum;
};
  
console.log(parseAndSum(inputText));
