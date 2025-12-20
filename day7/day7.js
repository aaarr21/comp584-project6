const fs = require('fs');

// Read input lines (rules).
const lines = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n');

// Parse rules into a map: outerColor -> [{count, color}, ...].
const contains = new Map();

for (const line of lines) {
  // Example line: "light red bags contain 1 bright white bag, 2 muted yellow bags."
  const [outerPart, innerPart] = line.split(' contain ');
  const outerColor = outerPart.replace(/ bags?$/, '');

  if (innerPart.startsWith('no other')) {
    contains.set(outerColor, []); // Contains nothing.
    continue;
  }

  const inner = innerPart.split(',').map(p => {
    // p examples: "1 bright white bag", "2 muted yellow bags."
    const m = p.trim().match(/^(\d+)\s+([a-z ]+?)\s+bags?\.?$/);
    if (!m) throw new Error('parse error: ' + p);
    return { count: Number(m[1]), color: m[2] };
  });

  contains.set(outerColor, inner);
}

// --- Part 1 ---
// Build reverse graph: childColor -> Set of parent colors that can directly hold it.
const reverse = new Map();
for (const [outer, inners] of contains.entries()) {
  for (const { color: child } of inners) {
    if (!reverse.has(child)) reverse.set(child, new Set());
    reverse.get(child).add(outer);
  }
}

// BFS/DFS from "shiny gold" upwards to collect all possible outer colors
function part1(target = 'shiny gold') {
  const seen = new Set();
  const stack = [target];

  while (stack.length) {
    const cur = stack.pop();
    const parents = reverse.get(cur);
    if (!parents) continue;
    for (const p of parents) {
      if (!seen.has(p)) {
        seen.add(p);
        stack.push(p);
      }
    }
  }

  return seen.size; // number of colors that can eventually contain target
}

// --- Part 2 ---
// Memoized recursion to count total bags inside a color.
const memo = new Map();

function totalInside(color) {
  if (memo.has(color)) return memo.get(color);

  const inners = contains.get(color) || [];
  // sum of count * (1 + totalInside(child))
  let sum = 0;
  for (const { count, color: child } of inners) {
    sum += count * (1 + totalInside(child));
  }

  memo.set(color, sum);
  return sum;
}

const answer1 = part1('shiny gold');
const answer2 = totalInside('shiny gold');

console.log('Part 1:', answer1);
console.log('Part 2:', answer2);