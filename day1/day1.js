// part2 threeSum.

const fs = require('fs');

// Read and parse the input file into an array of numbers
const numbers = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n')
  .map(Number);

const TARGET = 2020;

/* ---------------------------
   Part 1 — Two-sum (a + b = 2020)
   --------------------------- */
function twoSumProduct(nums) {
  const seen = new Set();

  for (const a of nums) {
    const b = TARGET - a;         // complement value
    if (seen.has(b)) return a * b;
    seen.add(a);
  }

  return null;
}

/* ---------------------------
   Part 2 — Three-sum (a + b + c = 2020)
   Fix 'a', then solve two-sum for the rest.
   --------------------------- */
function threeSumProduct(nums) {
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    const a = nums[i];
    const needed = TARGET - a;    // now look for b + c = needed
    const seen = new Set();

    for (let j = i + 1; j < len; j++) {
      const b = nums[j];
      const c = needed - b;       // complement for the inner two-sum
      if (seen.has(c)) return a * b * c;
      seen.add(b);
    }
  }

  return null;
}

// Print results
console.log("Part 1:", twoSumProduct(numbers));
console.log("Part 2:", threeSumProduct(numbers));