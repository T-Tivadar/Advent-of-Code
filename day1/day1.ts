import { input } from "./input";

export const part1 = (input: number[]) => {
  let res = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] < input[i]) {
      res++;
    }
  }
  console.log(res);
};

export const part2 = (input: number[]) => {
  let res = 0;
  for (let i = 3; i < input.length; i++) {
    let A = input[i - 3] + input[i - 2] + input[i - 1];
    let B = input[i - 2] + input[i - 1] + input[i];
    if (A < B) {
      res++;
    }
  }
  console.log(res);
};

part2(input);
