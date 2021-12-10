import { d9Dummy, d9input } from "./input9";

const mask = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export const d9part1 = (input: string[]) => {
  const table: number[][] = convertInputToTable(input);
  const lowestPoints: { i: number; j: number }[] = getLowestPoints(table);
  let riskLevel = 0;
  for (let i = 0; i < lowestPoints.length; i++) {
    riskLevel += table[lowestPoints[i].i][lowestPoints[i].j] + 1;
  }

  return riskLevel;
};

export const d9part2 = (input: string[]) => {
  const table: number[][] = convertInputToTable(input);
  const lowestPoints: { i: number; j: number }[] = getLowestPoints(table);
  const basinSizes: number[] = [];
  for (let i = 0; i < lowestPoints.length; i++) {
    basinSizes.push(
      findBasinSize(table, lowestPoints[i].i, lowestPoints[i].j) || 1
    );
  }

  const sorted = basinSizes.sort((a, b) => b - a);
  return sorted[0] * sorted[1] * sorted[2];
};

const findBasinSize = (
  table: number[][],
  startX: number,
  startY: number
): number => {
  const visited: { x: number; y: number }[] = [];
  const neighbors: { x: number; y: number }[] = [];
  neighbors.push({ x: startX, y: startY });
  let result = 0;
  while (neighbors.length > 0) {
    const node = neighbors.pop();
    const isVisited =
      visited.findIndex(({ x, y }) => node?.x === x && node?.y === y) >= 0;
    if (node && !isVisited) {
      result += 1;
      const x = node.x;
      const y = node.y;
      visited.push({ x, y });
      for (const [maskX, maskY] of mask) {
        if (
          isValidIndex(table, x + maskX, y + maskY) &&
          table[x][y] < table[x + maskX][y + maskY] &&
          table[x + maskX][y + maskY] !== 9
        ) {
          neighbors.push({ x: x + maskX, y: y + maskY });
        }
      }
    }
  }
  return result;
};

const isValidIndex = (table: number[][], i: number, j: number) => {
  return i >= 0 && j >= 0 && table.length > i && table[0].length > j;
};

const getLowestPoints = (table: number[][]) => {
  const lowestPoints: { i: number; j: number }[] = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      let minPoint = true;
      for (const [maskX, maskY] of mask) {
        if (isValidIndex(table, i + maskX, j + maskY)) {
          if (table[i][j] >= table[i + maskX][j + maskY]) {
            minPoint = false;
            break;
          }
        }
      }
      if (minPoint) {
        lowestPoints.push({ i, j });
      }
    }
  }
  return lowestPoints;
};

const convertInputToTable = (input: string[]) => {
  const table: number[][] = [];
  for (let i = 0; i < input.length; i++) {
    table.push(input[i].split("").map((num) => +num));
  }
  return table;
};

console.log(d9part2(d9input));
