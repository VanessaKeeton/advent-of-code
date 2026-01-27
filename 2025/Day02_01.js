const fs = require('fs');
const path = require('path');
const readline = require('readline');


const filePath = path.join(__dirname, './Day02_test.txt');
// const filePath = path.join(__dirname, './Day02_input.txt');

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
  let sum = 0;
  for (let i = 0; i < ranges.length; i++) {
    let [num1, num2] = ranges[i].split('-').map(Number);
    while(num1 <= num2) {
      const s = Math.abs(num1).toString();
      console.log('s is: ', s)

      // Rule: If the length is odd, it cannot have two equal halves
      if (s.length % 2 !== 0) {
        console.log('number is odd')
        num1++
      } else {
        const mid = s.length / 2;
        const firstHalf = s.slice(0, mid);
        const secondHalf = s.slice(mid);
        console.log('halves: ', firstHalf + ' | ' + secondHalf)

        if (firstHalf === secondHalf) {
          console.log("numbers are same")
          sum = sum + num1;
          console.log('sum is ', sum)
        }
        num1++;
      }
    }

  }

  return sum;
}

// answer for input 53420042388
console.log(processCSV(filePath));