import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const parseLine = (line: string) => {
  const [first, second] = line.split(": ");
  const result = Number(first);
  const vals = second.split(" ").map(Number);
  return { result, vals };
};

const traverseHelper = (
  target: number,
  vals: number[],
  i: number,
  currentVal: number,
  numOperators: number,
): boolean => {
  if (i === vals.length) {
    return currentVal === target;
  }
  let neighbors;
  if (numOperators === 3) {
    neighbors = [
      currentVal + vals[i],
      currentVal * vals[i],
      Number(String(currentVal) + String(vals[i])),
    ];
  } else {
    neighbors = [currentVal + vals[i], currentVal * vals[i]];
  }
  for (let j = 0; j < neighbors.length; j++) {
    if (traverseHelper(target, vals, i + 1, neighbors[j], numOperators)) {
      return true;
    }
  }
  return false;
};

const traverse = (
  target: number,
  vals: number[],
  numOperators: number,
): boolean => {
  return traverseHelper(target, vals, 1, vals[0], numOperators);
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let sum = 0;
  lines.forEach((line) => {
    const { result, vals } = parseLine(line);
    if (traverse(result, vals, 2)) {
      sum += result;
    }
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let sum = 0;
  lines.forEach((line) => {
    const { result, vals } = parseLine(line);
    if (traverse(result, vals, 3)) {
      sum += result;
    }
  });

  return sum;
};

const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
