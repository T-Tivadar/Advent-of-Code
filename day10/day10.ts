import { d10dummy, d10input } from "./input10";

const BRACKETS = [
  { key: "(", pair: ")", value: 3, score: 1 },
  { key: "[", pair: "]", value: 57, score: 2 },
  { key: "{", pair: "}", value: 1197, score: 3 },
  { key: "<", pair: ">", value: 25137, score: 4 },
];

export const d10part1 = (input: string[]) => {
  let errorScore: number = 0;
  for (let i = 0; i < input.length; i++) {
    errorScore += validateBrackets(input[i])[0];
  }
  return errorScore;
};

const validateBrackets = (row: string): [number, string[]] => {
  let brackets = [...BRACKETS];
  const open: string[] = [];
  for (let i = 0; i < row.length; i++) {
    const char = row.charAt(i);
    for (let j = 0; j < brackets.length; j++) {
      if (char === brackets[j].key) {
        open.push(char);
      }
      if (char === brackets[j].pair) {
        if (
          brackets.find((bracket) => bracket.key === open[open.length - 1])
            .pair === char
        ) {
          open.pop();
        } else {
          return [brackets[j].value, open];
        }
      }
    }
  }
  return [0, open];
};

export const d10part2 = (input: string[]) => {
  let openBrackets: string[][] = [];
  for (let i = 0; i < input.length; i++) {
    const validate = validateBrackets(input[i]);
    if (validate[0] === 0) {
      openBrackets.push(validate[1]);
    }
  }

  const scores: number[] = [];
  for (let i = 0; i < openBrackets.length; i++) {
    const closeBracketsScores = openBrackets[i]
      .reverse()
      .map((bracket) => BRACKETS.find((b) => b.key === bracket).score);
    let score = 0;
    for (let j = 0; j < closeBracketsScores.length; j++) {
      score = 5 * score + closeBracketsScores[j];
    }
    scores.push(score);
  }
  const sorted = scores.sort((a, b) => a - b);
  return sorted[Math.ceil((sorted.length - 1) / 2)];
};

console.log(d10part2(d10input));
