const fs = require('fs');

// Read all boarding passes
const lines = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n');

// Convert boarding pass string to seat ID
function seatIdFromCode(code) {
  const rowCode = code.slice(0, 7);  // first 7 chars
  const colCode = code.slice(7);     // last 3 chars

  // F/L -> 0, B/R -> 1, then parse as binary
  const rowBin = rowCode.replace(/F/g, '0').replace(/B/g, '1');
  const colBin = colCode.replace(/L/g, '0').replace(/R/g, '1');

  const row = parseInt(rowBin, 2);
  const col = parseInt(colBin, 2);

  return row * 8 + col;
}

// Compute all seat IDs
const seatIds = lines.map(seatIdFromCode);

// Part 1: highest seat ID
const part1 = Math.max(...seatIds);

// Part 2: find missing seat ID with neighbors present
seatIds.sort((a, b) => a - b);

let part2 = null;
for (let i = 0; i < seatIds.length - 1; i++) {
  const current = seatIds[i];
  const next = seatIds[i + 1];
  if (next === current + 2) {
    part2 = current + 1; // gap of 2 => missing one in between
    break;
  }
}

console.log('Part 1 (max seat ID):', part1);
console.log('Part 2 (your seat ID):', part2);