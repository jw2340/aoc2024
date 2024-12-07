import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Board = (number | string)[][];

const findStart = (board: Board): [number, number] => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const val = board[i][j];
      if (val === "^") {
        return [i, j];
      }
    }
  }
  throw Error("unreachable");
};

const isValidCoordinate = (array: Board, i: number, j: number) => {
  return i >= 0 && i < array.length && j >= 0 && j < array[0].length;
};

const getNextCoordinate = (val: string | number, i: number, j: number) => {
  if (val === "^") {
    return [i - 1, j];
  }
  if (val === "v") {
    return [i + 1, j];
  }
  if (val === ">") {
    return [i, j + 1];
  }
  if (val === "<") {
    return [i, j - 1];
  }
  throw Error("unreachable");
};

const rotate = (board: Board, i: number, j: number) => {
  const val = board[i][j];
  if (val === "^") {
    board[i][j] = ">";
    return;
  }
  if (val === "v") {
    board[i][j] = "<";
    return;
  }
  if (val === ">") {
    board[i][j] = "v";
    return;
  }
  if (val === "<") {
    board[i][j] = "^";
    return;
  }
  throw Error("unreachable");
};

const getSum = (board: Board) => {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === "X") {
        sum += 1;
      }
    }
  }
  return sum;
};

const part1 = (rawInput: string) => {
  const board = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));
  const [xStart, yStart] = findStart(board);

  let xCur = xStart;
  let yCur = yStart;
  while (isValidCoordinate(board, xCur, yCur)) {
    let next = getNextCoordinate(board[xCur][yCur], xCur, yCur);
    let xNext = next[0];
    let yNext = next[1];

    if (isValidCoordinate(board, xNext, yNext)) {
      while (board[xNext][yNext] === "#") {
        rotate(board, xCur, yCur);
        next = getNextCoordinate(board[xCur][yCur], xCur, yCur);
        xNext = next[0];
        yNext = next[1];
      }
      board[xNext][yNext] = board[xCur][yCur];
    }

    board[xCur][yCur] = "X";
    xCur = xNext;
    yCur = yNext;
  }

  return getSum(board);
};

const part2 = (rawInput: string) => {
  const board: Board = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));
  let sum = 0;
  const [xStart, yStart] = findStart(board);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === ".") {
        const visited: { [key: string]: number } = {};
        const newBoard: Board = parseInput(rawInput)
          .split("\n")
          .map((line) => line.split(""));
        newBoard[i][j] = "#";

        let xCur = xStart;
        let yCur = yStart;
        while (isValidCoordinate(newBoard, xCur, yCur)) {
          let next = getNextCoordinate(newBoard[xCur][yCur], xCur, yCur);
          let xNext = next[0];
          let yNext = next[1];

          if (isValidCoordinate(newBoard, xNext, yNext)) {
            while (newBoard[xNext][yNext] === "#") {
              rotate(newBoard, xCur, yCur);
              next = getNextCoordinate(newBoard[xCur][yCur], xCur, yCur);
              xNext = next[0];
              yNext = next[1];
            }
            newBoard[xNext][yNext] = newBoard[xCur][yCur];
          }

          const key = xCur + "," + yCur;
          if (visited[key]) {
            visited[key]++;
          } else {
            visited[key] = 1;
          }
          if (visited[key] === 10) {
            sum += 1;
            break;
          }

          xCur = xNext;
          yCur = yNext;
        }
      }
    }
  }

  return sum;
};

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
