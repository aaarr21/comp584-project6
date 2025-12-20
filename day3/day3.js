const fs = require('fs');

// Read map as an array of strings (rows).
const rows = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n');

const height = rows.length;
const width = rows[0].length;

// Count trees for a given slope (right, down).
function treesForSlope(right, down) {
  let row = 0;
  let col = 0;
  let trees = 0;

  while (row < height) {
    const cell = rows[row][col % width]; // Wrap horizontally with modulo.
    if (cell === '#') trees++;

    row += down;
    col += right;
  }

  return trees;
}

// --- Part 1: Slope (3, 1) ---
const part1 = treesForSlope(3, 1);

// --- Part 2: Multiply trees for all slopes ---
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

let part2 = 1;
for (const [right, down] of slopes) {
  part2 *= treesForSlope(right, down);
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);