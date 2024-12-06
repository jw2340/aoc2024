import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Order = {
  [key: number]: Set<number>;
};

const updateOrder = (order: Order, line: string): void => {
  const [first, second] = line.split("|").map(Number);
  if (!order[first]) {
    order[first] = new Set();
  }
  order[first].add(second);
};

const getMiddlePageIfValid = (order: Order, updates: number[]): number => {
  for (let i = 0; i < updates.length - 1; i++) {
    const cur = updates[i];
    const next = updates[i + 1];
    if (!order[cur] || !order[cur].has(next)) {
      return 0;
    }
  }
  // got here so ordering is correct
  const mid = (updates.length - 1) / 2;
  return updates[mid];
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  let sum = 0;
  const order: Order = {};

  lines.forEach((line) => {
    if (line.includes("|")) {
      updateOrder(order, line);
    } else if (line.includes(",")) {
      const updates = line.split(",").map(Number);
      sum += getMiddlePageIfValid(order, updates);
    }
  });

  return sum;
};

const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const swapOrder = (order: Order, arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    const cur = arr[i];
    const next = arr[i + 1];
    if (!order[cur] || !order[cur].has(next)) {
      swap(arr, i, i + 1);
    }
  }
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  let sum = 0;
  const order: Order = {};
  const unordered: number[][] = [];

  lines.forEach((line) => {
    if (line.includes("|")) {
      updateOrder(order, line);
    } else if (line.includes(",")) {
      const updates = line.split(",").map(Number);
      const val = getMiddlePageIfValid(order, updates);
      if (val === 0) {
        unordered.push(updates);
      }
    }
  });

  unordered.forEach((arr) => {
    while (getMiddlePageIfValid(order, arr) === 0) {
      swapOrder(order, arr);
    }
    sum += getMiddlePageIfValid(order, arr);
  });

  return sum;
};

const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

// 75,97,47,61,53 => 97,75,47,61,53
// 61,13,29 => 61,29,13
// 97,13,75,29,47 => 97,75,47,29,13

run({
  part1: {
    tests: [
      {
        input,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
