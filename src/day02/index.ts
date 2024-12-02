import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  let sum = 0;
  lines.forEach((line) => {
    const elements = line.split(" ").map(Number);
    let isIncreasing = true;
    if (elements[0] > elements[elements.length - 1]) {
      isIncreasing = false;
    }
    for (let i = 0; i < elements.length - 1; i++) {
      const diff = elements[i + 1] - elements[i];
      if (isIncreasing) {
        if (diff > 3 || diff < 1) {
          return;
        }
      } else {
        if (diff < -3 || diff > -1) {
          return;
        }
      }
    }
    sum += 1;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  const unsafeLines: string[] = [];
  let sum = 0;

  lines.forEach((line) => {
    const elements = line.split(" ").map(Number);
    let isIncreasing = true;
    if (elements[0] > elements[elements.length - 1]) {
      isIncreasing = false;
    }
    for (let i = 0; i < elements.length - 1; i++) {
      const diff = elements[i + 1] - elements[i];
      if (isIncreasing) {
        if (diff > 3 || diff < 1) {
          unsafeLines.push(line);
          return;
        }
      } else {
        if (diff < -3 || diff > -1) {
          unsafeLines.push(line);
          return;
        }
      }
    }
    sum += 1;
  });

  unsafeLines.forEach((line) => {
    const elements = line.split(" ").map(Number);
    for (let i = 0; i < elements.length; i++) {
      const combo = elements
        .slice(0, i)
        .concat(elements.slice(i + 1, elements.length));
      let isIncreasing = true;
      let isSafe = true;
      if (combo[0] > combo[combo.length - 1]) {
        isIncreasing = false;
      }
      for (let i = 0; i < combo.length - 1; i++) {
        const diff = combo[i + 1] - combo[i];
        if (isIncreasing) {
          if (diff > 3 || diff < 1) {
            isSafe = false;
            break;
          }
        } else {
          if (diff < -3 || diff > -1) {
            isSafe = false;
            break;
          }
        }
      }
      if (isSafe === true) {
        sum += 1;
        break;
      }
    }
  });

  return sum;
};

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
