const test = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './Day05_input.txt');
const inputText = fs.readFileSync(filePath, 'utf8');

const orderingRulesText = test.split('\n\n')[0];
const reprintsListText = test.split('\n\n')[1];

const orderingRules = orderingRulesText.split('\n').map(row => row.split('|'));
const reprintsList = reprintsListText.split('\n').map(row => row.split(','));

console.log(orderingRulesText);
console.log(reprintsListText);
console.log(orderingRules);
console.log(reprintsList);

// map ordering rules by the first element
const orderingRulesMap = orderingRules.reduce((acc, [first, second]) => {
  if (!acc[first]) {
    acc[first] = [];
  }
  acc[first].push(second);
  return acc;
}, {});

console.log(orderingRulesMap);

// find the rows that are in the correct order

const correctlyOrderedRows = reprintsList.filter(row => {
  for (let i = 0; i < row.length - 1; i++) {
    if (!orderingRulesMap[row[i]] || !orderingRulesMap[row[i]].includes(row[i + 1])) {
      return false;
    }
  }
  return true;
});

console.log(correctlyOrderedRows);

// find the middle number in each row (assume the row has an odd number of elements) and sum them
const sumOfMiddle = correctlyOrderedRows.reduce((acc, row) => {
  const middleIndex = Math.floor(row.length / 2);
  return acc + parseInt(row[middleIndex]);
}, 0);

// // hard coded example of the correctly ordered text
// const correctlyOrderedText = `75,47,61,53,29
// 97,61,53,29,13
// 75,29,13`;

// const correctlyOrderedRows = correctlyOrderedText.split('\n');

// function findMiddleEntry(str) {
//   const numbers = str.split(',').map(Number); // Split the string into an array of numbers

//   if (numbers.length === 0) {
//     return null; // Handle empty string case
//   }

//   const middleIndex = Math.floor(numbers.length / 2);

//   if (numbers.length % 2 === 0) {
//     // If the array has an even length, return the average of the two middle numbers
//     return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
//   } else {
//     // If the array has an odd length, return the middle number
//     return numbers[middleIndex];
//   }
// }

// const sumOfMiddle = correctlyOrderedRows.reduce((acc, row) => {
//   return acc + findMiddleEntry(row);
// }, 0);

console.log(sumOfMiddle);
