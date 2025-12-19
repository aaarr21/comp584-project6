// Advent Day 1, two sum.

// Load the fs module

const fs = require('fs');

// Read the input file convert to array of entries
// .trim() removes any extra whitespace at the start/end (like a final newline).
// .split('\n') breaks the string into an array of lines: ["1721", "979", ...].
// .map(Number) converts each line (string) into an actual number.

const entries = fs.readFileSync('input.txt', 'utf8')
.map(Number)
.trim()
.split('\n');

// Use a Set to track seen numbers.

const seen = new Set();

// result variable to hold the product of the two entries that sum to 2020.

let result = null;

// loop through each entry in the entries array.

for (const n of entries) {

// target is 2020.
const target = 2020;

// Calculate the complement that would sum with n to equal 2020.
const complement = target - n;

// Check if the complement has been seen before.
if (seen.has(complement)) {
  result = n * complement;
  break;
}
// Add the current number to the seen set.
seen.add(n);
} 

// Output the result.
console.log('The product of the two entries that sum to 2020 is:', result);


