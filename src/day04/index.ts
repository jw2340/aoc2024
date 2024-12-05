import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isValidCoordinate = (
  array: { val: string; visiting: boolean }[][] | string[][],
  i: number,
  j: number,
) => {
  return i >= 0 && i < array.length && j >= 0 && j < array[0].length;
};

const directions = ["N", "S", "E", "W", "NE", "SE", "NW", "SW"] as const;
type Direction = (typeof directions)[number];

const getNeighbor = (i: number, j: number, direction: Direction) => {
  if (direction === "N") {
    return { i: i - 1, j };
  }
  if (direction === "S") {
    return { i: i + 1, j };
  }
  if (direction === "E") {
    return { i, j: j + 1 };
  }
  if (direction === "W") {
    return { i, j: j - 1 };
  }
  if (direction === "NE") {
    return { i: i - 1, j: j + 1 };
  }
  if (direction === "SE") {
    return { i: i + 1, j: j + 1 };
  }
  if (direction === "NW") {
    return { i: i - 1, j: j - 1 };
  }
  if (direction === "SW") {
    return { i: i + 1, j: j - 1 };
  }
  throw new Error("unreachable");
};

const traverse = (
  array: { val: string; visiting: boolean }[][],
  buffer: string[],
  i: number,
  j: number,
  direction: Direction,
  resultCount: number[],
) => {
  if (!isValidCoordinate(array, i, j)) {
    return false;
  }

  const val = array[i][j];

  if (val.visiting === true) {
    return false;
  }

  buffer.push(val.val);
  val.visiting = true;
  const str = buffer.join("");

  if (str === "XMAS") {
    resultCount.push(1);
    buffer.pop();
    val.visiting = false;
    return true;
  }
  if (str !== "X" && str !== "XM" && str !== "XMA") {
    buffer.pop();
    val.visiting = false;
    return false;
  }

  const neighbor = getNeighbor(i, j, direction);
  traverse(array, buffer, neighbor.i, neighbor.j, direction, resultCount);

  buffer.pop();
  val.visiting = false;
};

const part1 = (rawInput: string) => {
  const array = parseInput(rawInput)
    .split("\n")
    .map((line) => {
      return line.split("").map((val) => ({ val, visiting: false }));
    });

  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      directions.forEach((direction) => {
        let resultCount: number[] = [];
        let buffer: string[] = [];
        traverse(array, buffer, i, j, direction, resultCount);
        count += resultCount.length;
      });
    }
  }

  return count;
};

const isValidShape = (array: string[][], i: number, j: number) => {
  if (!isValidCoordinate(array, i, j)) {
    return false;
  }
  const val = array[i][j];
  if (val !== "A") return false;

  if (!isValidCoordinate(array, i - 1, j - 1)) {
    return false;
  }
  if (!isValidCoordinate(array, i + 1, j + 1)) {
    return false;
  }
  let str = array[i - 1][j - 1] + val + array[i + 1][j + 1];
  if (str !== "MAS" && str !== "SAM") {
    return false;
  }

  if (!isValidCoordinate(array, i - 1, j + 1)) {
    return false;
  }
  if (!isValidCoordinate(array, i + 1, j - 1)) {
    return false;
  }
  str = array[i - 1][j + 1] + val + array[i + 1][j - 1];
  if (str !== "MAS" && str !== "SAM") {
    return false;
  }
  return true;
};

const part2 = (rawInput: string) => {
  const array = parseInput(rawInput)
    .split("\n")
    .map((line) => {
      return line.split("");
    });

  let count = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      if (isValidShape(array, i, j)) {
        count += 1;
      }
    }
  }

  return count;
};

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
