const test = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

// const test = '3267: 81 40 27'

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './Day07_input.txt');
const inputText = fs.readFileSync(filePath, 'utf8');

// const testInputArray = test.split('\n');
const testInputArray = inputText.split('\n');

console.log(testInputArray);

const getSides = (string) => string.split(': ');
const sumOfall = (arr) => arr.reduce((acc, cur) => acc + cur, 0)
const productOfAll = (arr) => arr.reduce((acc, cur) => acc * cur)

const testOpperators = (testValue, numbersToTest) => {
  // will need to convert to numbers before passing in
  // test add all
  if (sumOfall(numbersToTest) === testValue) return true;

  // test multiply all
  console.log(productOfAll(numbersToTest))
  if (productOfAll(numbersToTest) === testValue) return true;

  // test sliding * through all other +
    for (let index = 0; index < numbersToTest.length; index++) {
      // at 0 start with numbersToTest[0] and mult with numberToTest[1] then all all others
      if(index === 0) {
        const arr1 = numbersToTest.slice(0,2);
        const arr2 = numbersToTest.slice(2);

        const result = productOfAll(arr1) + sumOfall(arr2);
        if(result === testValue) return true
      }else {
        const arr1 = numbersToTest.slice(0,1+index);
        const numToMult = numbersToTest[1+index]
        const arr2 = numbersToTest.slice(2+index);

        const result = (sumOfall(arr1) * numToMult) + sumOfall(arr2);
        if(result === testValue) return true;
      }
    }

  // test sliding + through all other *
    for (let index = 0; index < numbersToTest.length; index++) {
      // at 0 start with numbersToTest[0] and add with numberToTest[1] then multi left to right
      if(index === 0) {
        const arr1 = numbersToTest.slice(0,2);
        const arr2 = numbersToTest.slice(2);
        console.log('arr2', arr2)

        const result = productOfAll([sumOfall(arr1), ...arr2]);
        console.log(result, testValue);
        if(result === testValue) return true
      }else {
        const arr1 = numbersToTest.slice(0,1+index);
        const numToAdd = numbersToTest[1+index]
        const arr2 = numbersToTest.slice(2+index);

        const result = productOfAll([(productOfAll(arr1) + numToAdd), ...arr2]);
        if(result === testValue) return true
      }
    }

  return false;
}

let finalSum = 0;
testInputArray.forEach((row) => {
  const sides = getSides(row);
  const testValue = Number(sides[0])
  console.log('sides', sides)
  const numbersToTest = sides[1].split(' ').map(Number);
  // console.log('numbersToTest', numbersToTest)

  console.log(testOpperators(testValue, numbersToTest))
  if (testOpperators(testValue, numbersToTest)) finalSum = finalSum + testValue;
})

console.log(finalSum);