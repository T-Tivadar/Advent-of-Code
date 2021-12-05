import { d5Dummy, d5Inpit } from "./input5";

export const d5part1 = (input: string[]) => {
  const maxindex = gethighestNumber(input);

  let table: number[][] = [];
  for (let i = 0; i <= maxindex; i++) {
    table.push(new Array<number>(maxindex + 1).fill(0));
  }

  for (let k = 0; k < input.length; k++) {
    const split = input[k].split(",");
    if (split[0] === split[2]) {
      table = markHorizontal(split, table);
    } else if (split[1] === split[3]) {
      table = markVertical(split, table);
    }
  }
  return evaluateTable(table);
};

const markHorizontal = (split: string[], table: number[][]) => {
  const j = +split[0];
  for (
    let i = Math.min(+split[1], +split[3]);
    i <= Math.max(+split[1], +split[3]);
    i++
  ) {
    table[i][j]++;
  }
  return table;
};

const markVertical = (split: string[], table: number[][]) => {
  const i = +split[1];
  for (
    let j = Math.min(+split[0], +split[2]);
    j <= Math.max(+split[0], +split[2]);
    j++
  ) {
    table[i][j]++;
  }
  return table;
};

const markDiagonal = (split: string[], table: number[][]) => {
  let startX = +split[0];
  let startY = +split[1];
  let endX = +split[2];
  let endY = +split[3];
  const xMagnitude = endX - startX;
  const yMagnitude = endY - startY;
  if (Math.abs(xMagnitude) === Math.abs(yMagnitude)) {
    for (let i = 0; i <= Math.abs(xMagnitude); i++) {
      table[startY + i * Math.sign(yMagnitude)][
        startX + i * Math.sign(xMagnitude)
      ]++;
    }
  }
  return table;
};

const evaluateTable = (table: number[][]) => {
  let res = 0;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      if (table[i][j] > 1) {
        res++;
      }
    }
  }
  return res;
};

const gethighestNumber = (input: string[]) => {
  let max = 0;
  for (let i = 0; i < input.length; i++) {
    const split = input[i].split(",");
    for (let i = 0; i < split.length; i++) {
      if (max < parseInt(split[i])) {
        max = parseInt(split[i]);
      }
    }
  }
  return max;
};

export const d5part2 = (input: string[]) => {
  const maxindex = gethighestNumber(input);

  let table: number[][] = [];
  for (let i = 0; i <= maxindex; i++) {
    table.push(new Array<number>(maxindex + 1).fill(0));
  }

  for (let k = 0; k < input.length; k++) {
    const split = input[k].split(",");
    if (split[0] === split[2]) {
      table = markHorizontal(split, table);
    } else if (split[1] === split[3]) {
      table = markVertical(split, table);
    } else {
      table = markDiagonal(split, table);
    }
  }
  return evaluateTable(table);
};

console.log(d5part2(d5Inpit));
