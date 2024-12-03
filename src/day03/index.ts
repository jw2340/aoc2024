import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const re = /mul\(\d+,\d+\)/g;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matches = input.match(re);
  if (matches === null) return;

  const factors = matches.map((match) => {
    const [part1, part2] = match.split(",");
    const factor1 = part1.slice("mul(".length);
    const factor2 = part2.slice(0, part2.length - 1);
    return [Number(factor1), Number(factor2)];
  });
  const sum = factors.reduce((acc, factor) => {
    return acc + factor[0] * factor[1];
  }, 0);

  return sum;
};

const doRe = /do\(\)/g;
const dontRe = /don\'t\(\)/g;

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matches = [
    ...input.matchAll(re),
    ...input.matchAll(doRe),
    ...input.matchAll(dontRe),
  ];
  matches.sort((a, b) => {
    if (!a.index || !b.index) {
      return 0;
    }
    return a.index - b.index;
  });

  let sum = 0;
  let doMultiply = true;
  matches.forEach((match) => {
    const val = match[0];
    if (val === "do()") {
      doMultiply = true;
    } else if (val === "don't()") {
      doMultiply = false;
    }
    if (val.startsWith("mul") && doMultiply === true) {
      const [part1, part2] = val.split(",");
      const factor1 = part1.slice("mul(".length);
      const factor2 = part2.slice(0, part2.length - 1);
      sum += Number(factor1) * Number(factor2);
    }
  });

  return sum;
};

const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const input2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
run({
  part1: {
    tests: [
      {
        input,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: input2,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
