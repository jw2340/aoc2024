import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  const left: number[] = [];
  const right: number[] = [];

  lines.forEach((line) => {
    const [l, r] = line.split("   ");
    left.push(Number(l));
    right.push(Number(r));
  });

  left.sort();
  right.sort();
  let sum = 0;
  left.forEach((el, i) => {
    sum += Math.abs(el - right[i]);
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  const left: number[] = [];
  const right: number[] = [];

  lines.forEach((line) => {
    const [l, r] = line.split("   ");
    left.push(Number(l));
    right.push(Number(r));
  });

  let sum = 0;
  left.forEach((el) => {
    let freq = 0;
    right.forEach((rightEl) => {
      if (rightEl === el) {
        freq++;
      }
    });
    sum += el * freq;
  });

  return sum;
};

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
