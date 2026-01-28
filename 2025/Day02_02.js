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
    }
  }

  function findBadIdsSum(ranges) {
    let sum = 0;
    for (let i = 0; i < ranges.length; i++) {
      let [num1, num2] = ranges[i].split('-').map(Number);
      sum += sumRepeatingPatterns(num1, num2);
    }
    return sum;
  }

  function sumRepeatingPatterns(min, max) {
    const validNumbers = new Set();
    
    const minDigits = min.toString().length;
    const maxDigits = max.toString().length;
    
    for (let totalDigits = minDigits; totalDigits <= maxDigits; totalDigits++) {
      // find the number of possible length splits and store the lengths to check
      let divisors = getDivisors(totalDigits);

      // while lengths to check run the pattern check
      // we start at 1 because divided by 1 is not a split of the number
      // and 1 will always be the lowest divisor
      for(let i = 1; i <= divisors.length; i++) {
        const repetitions = divisors[i];
        if (repetitions < 2) continue; // Must repeat at least twice
      
        const patternLen = totalDigits / repetitions;
      
        // Calculate range of valid patterns
        const minPattern = Math.pow(10, patternLen - 1);
        const maxPattern = Math.pow(10, patternLen) - 1;

        // Generate all numbers from this pattern
        for (let pattern = minPattern; pattern <= maxPattern; pattern++) {
          const num = buildRepeatingNumber(pattern, divisors[i]);
        
          // Only sum if in range
          if (num >= min && num <= max) {
            validNumbers.add(num);
          }
        }
      }
    }
    
    // Sum all unique valid numbers
    let sum = 0;
    for (let num of validNumbers) {
      sum += num;
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

  function getDivisors(n) {
      let divisors = [];
      // Only loop until the square root of n
      for (let i = 1; i * i <= n; i++) {
          if (n % i === 0) {
              divisors.push(i); // Add the found divisor
              
              // Add the "partner" divisor (n / i) if it's different
              if (i !== n / i) {
                  divisors.push(n / i);
              }
          }
      }
      // Sort them if you want them in order
      return divisors.sort((a, b) => a - b);
  }

  // answer for example 4174379265
  // answer for input 69553832684
  console.log(processCSV(filePath));