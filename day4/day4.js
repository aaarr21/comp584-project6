const fs = require('fs');

// Read whole file and split passports by blank lines.
const passportsRaw = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .split('\n\n');

// Parse each passport into an object (e.g., { byr: '1980', iyr: '2012', ... }).
const passports = passportsRaw.map(block => {
  const fields = block.replace(/\n/g, ' ').split(' ');
  const obj = {};
  for (const f of fields) {
    const [key, value] = f.split(':');
    obj[key] = value;
  }
  return obj;
});

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

// --- Part 1: Just check that all required fields exist ---
function hasAllRequiredFields(p) {
  return required.every(key => key in p);
}

// --- Part 2: Validate the values ---

function isValidYear(str, min, max) {
  if (!/^\d{4}$/.test(str)) return false;
  const year = Number(str);
  return year >= min && year <= max;
}

function isValidHeight(hgt) {
  const m = /^(\d+)(cm|in)$/.exec(hgt);
  if (!m) return false;
  const value = Number(m[1]);
  const unit = m[2];

  if (unit === 'cm') return value >= 150 && value <= 193;
  if (unit === 'in') return value >= 59 && value <= 76;
  return false;
}

function isValidHair(hcl) {
  return /^#[0-9a-f]{6}$/.test(hcl);
}

function isValidEye(ecl) {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);
}

function isValidPid(pid) {
  return /^\d{9}$/.test(pid);
}

function isStrictlyValid(p) {
  if (!hasAllRequiredFields(p)) return false;

  return (
    isValidYear(p.byr, 1920, 2002) &&
    isValidYear(p.iyr, 2010, 2020) &&
    isValidYear(p.eyr, 2020, 2030) &&
    isValidHeight(p.hgt) &&
    isValidHair(p.hcl) &&
    isValidEye(p.ecl) &&
    isValidPid(p.pid)
  );
}

// Count totals for each part.
let part1 = 0;
let part2 = 0;

for (const p of passports) {
  if (hasAllRequiredFields(p)) part1++;
  if (isStrictlyValid(p)) part2++;
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);