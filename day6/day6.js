const fs = require('fs');

// Read file and split into groups (separated by blank lines)
const groups = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n\n');

// -------- Part 1: union (anyone answered "yes") --------
let part1 = 0;

for (const group of groups) {
  // Remove newlines, get all chars in one string
  const answers = group.replace(/\n/g, '');
  // Use a Set to keep unique letters
  const set = new Set(answers.split(''));
  part1 += set.size;
}

// -------- Part 2: intersection (everyone answered "yes") --------
let part2 = 0;

for (const group of groups) {
  const people = group.trim().split('\n');

  // Start with the set of the first person's answers
  let common = new Set(people[0].split(''));

  // Intersect with every other person's answers
  for (let i = 1; i < people.length; i++) {
    const personSet = new Set(people[i].split(''));
    common = new Set([...common].filter(c => personSet.has(c)));
  }

  part2 += common.size;
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);