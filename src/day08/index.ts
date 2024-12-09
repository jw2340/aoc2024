import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(""));

const isValidCoordinate = (array: string[][], i: number, j: number) => {
  return i >= 0 && i < array.length && j >= 0 && j < array[0].length;
};

const calculateAntinodes = (pair: { [key: string]: number }[]) => {
  const first = pair[0];
  const second = pair[1];
  const diffX = first.i - second.i;
  const diffY = first.j - second.j;
  return [
    { i: first.i + diffX, j: first.j + diffY },
    { i: second.i - diffX, j: second.j - diffY },
  ];
};

const part1 = (rawInput: string) => {
  const board = parseInput(rawInput);
  const nodeCoordinates: { [key: string]: { [key: string]: number }[] } = {};
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const node = board[i][j];
      if (node !== ".") {
        if (!nodeCoordinates[node]) {
          nodeCoordinates[node] = [];
        }
        nodeCoordinates[node].push({ i, j });
      }
    }
  }
  const pairs = [];
  for (const node in nodeCoordinates) {
    const coordinates = nodeCoordinates[node];
    for (let i = 0; i < coordinates.length; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        pairs.push([coordinates[i], coordinates[j]]);
      }
    }
  }

  const newBoard = parseInput(rawInput);
  pairs.forEach((pair) => {
    const antinodes = calculateAntinodes(pair);
    antinodes.forEach((antinode) => {
      if (isValidCoordinate(newBoard, antinode.i, antinode.j)) {
        newBoard[antinode.i][antinode.j] = "#";
      }
    });
  });

  let sum = 0;
  newBoard.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "#") {
        sum += 1;
      }
    });
  });

  return sum;
};

const calculateAntinodes2 = (
  pair: { [key: string]: number }[],
  board: string[][],
) => {
  const first = pair[0];
  const second = pair[1];
  const diffX = first.i - second.i;
  const diffY = first.j - second.j;
  const count = board.length > board[0].length ? board.length : board[0].length;
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({ i: first.i + diffX * i, j: first.j + diffY * i });
    result.push({ i: second.i - diffX * i, j: second.j - diffY * i });
  }
  return result;
};

const part2 = (rawInput: string) => {
  const board = parseInput(rawInput);
  const nodeCoordinates: { [key: string]: { [key: string]: number }[] } = {};
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const node = board[i][j];
      if (node !== ".") {
        if (!nodeCoordinates[node]) {
          nodeCoordinates[node] = [];
        }
        nodeCoordinates[node].push({ i, j });
      }
    }
  }
  const pairs = [];
  for (const node in nodeCoordinates) {
    const coordinates = nodeCoordinates[node];
    for (let i = 0; i < coordinates.length; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        pairs.push([coordinates[i], coordinates[j]]);
      }
    }
  }

  const newBoard = parseInput(rawInput);
  pairs.forEach((pair) => {
    const antinodes = calculateAntinodes2(pair, newBoard);
    antinodes.forEach((antinode) => {
      if (isValidCoordinate(newBoard, antinode.i, antinode.j)) {
        newBoard[antinode.i][antinode.j] = "#";
      }
    });
  });

  let sum = 0;
  newBoard.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "#") {
        sum += 1;
      }
    });
  });

  return sum;
};

const input = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
