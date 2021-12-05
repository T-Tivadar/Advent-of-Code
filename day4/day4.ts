import { d4Dummy, d4DummyDrawn, d4Input, d4InputDrawn } from "./input4";

const ROW_LENGTH = 5;

export const d4part1 = (drawns: number[], input: number[]) => {
  const markTable: string[] = new Array(input.length);
  for (let d = 0; d < drawns.length; d++) {
    for (let i = 0; i < input.length / ROW_LENGTH; i++) {
      let marksInRow = 0;
      for (let j = 0; j < ROW_LENGTH; j++) {
        const index = j + i * ROW_LENGTH;
        if (drawns[d] === input[index]) {
          markTable[index] = "x";
          if (
            isWinnerCol(
              ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH,
              j,
              markTable
            )
          ) {
            return countWinnerScore(
              ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH,
              input,
              markTable,
              drawns[d]
            );
          }
        }
        marksInRow += markTable[index] === "x" ? 1 : 0;
        if (marksInRow === 5) {
          return countWinnerScore(
            ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH,
            input,
            markTable,
            drawns[d]
          );
        }
      }
    }
  }
};

const isWinnerCol = (i: number, j: number, markTable: string[]): boolean => {
  let markInCol: number = 0;
  for (let k = 0; k < ROW_LENGTH; k++, i++) {
    const index = j + i * ROW_LENGTH;
    markInCol += markTable[index] === "x" ? 1 : 0;
  }
  return markInCol === 5;
};

const countWinnerScore = (
  index: number,
  input: number[],
  markTable: string[],
  winnerNumber: number
) => {
  let res = 0;
  for (let i = 0; i < ROW_LENGTH * ROW_LENGTH; i++, index++) {
    if (markTable[index] !== "x") {
      res += input[index];
    }
  }
  return res * winnerNumber;
};

export const d4part2 = (drawns: number[], input: number[]) => {
  let markTable: string[] = new Array(input.length);
  let score = 0;
  for (let d = 0; d < drawns.length; d++) {
    for (let i = 0; i < input.length / ROW_LENGTH; i++) {
      let marksInRow = 0;
      if (markTable[i * ROW_LENGTH] === "w") {
        continue;
      }
      for (let j = 0; j < ROW_LENGTH; j++) {
        const index = j + i * ROW_LENGTH;
        if (drawns[d] === input[index]) {
          markTable[index] = "x";
          if (
            isWinnerCol(
              ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH,
              j,
              markTable
            )
          ) {
            score = countWinnerScore(
              ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH,
              input,
              markTable,
              drawns[d]
            );
            markTable = markWinnerBoard(
              ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH,
              markTable
            );
          }
        }
        marksInRow += markTable[index] === "x" ? 1 : 0;
        if (marksInRow === 5) {
          score = countWinnerScore(
            ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH,
            input,
            markTable,
            drawns[d]
          );
          markTable = markWinnerBoard(
            ~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH,
            markTable
          );
        }
      }
    }
  }
  return score;
};

const markWinnerBoard = (index: number, markTable: string[]) => {
  for (let i = 0; i < ROW_LENGTH * ROW_LENGTH; i++, index++) {
    markTable[index] = "w";
  }
  return markTable;
};

console.log(d4part2(d4InputDrawn, d4Input));
