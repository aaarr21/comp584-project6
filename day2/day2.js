const fs = require('fs');

// Read input lines.
const lines = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n');

let part1 = 0;
let part2 = 0;

for (const line of lines) {
  // Example: "1-3 a: abcde".
  const [range, letterPart, password] = line.split(' ');
  const [min, max] = range.split('-').map(Number);
  const letter = letterPart[0]; // Remove ':'

  // --- Part 1 ---
  const count = password.split('').filter(c => c === letter).length;
  if (count >= min && count <= max) part1++;

  // --- Part 2 ---
  const pos1 = password[min - 1] === letter;
  const pos2 = password[max - 1] === letter;
  if (pos1 !== pos2) part2++;   // XOR: Exactly one is true.
}

console.log("Part 1 valid passwords:", part1);
console.log("Part 2 valid passwords:", part2);