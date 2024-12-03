const test = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './Day03_input.txt');
const inputText = fs.readFileSync(filePath, 'utf8');

// extract out all strings that are in the format of mul(1,2)
const regex = /mul\((\d+),(\d+)\)/g;

// const matches = test.match(regex);
const matches = inputText.match(regex);

// console.log(matches);

// extract the numbers from each set and multiply them, then add the results together
const result = matches.reduce((acc, match) => {
  const [num1, num2] = match.match(/\d+/g);
  return acc += num1 * num2;
}, 0);

console.log(result);
