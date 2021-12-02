import { d2input } from "./input2";

export const d2part1 = (input: string[]) => {
  let position = { horizontal: 0, depth: 0 };
  for (let i = 0; i < input.length; i++) {
    const move = input[i].split(" ");
    switch (move[0]) {
      case "forward":
        position.horizontal += +move[1];
        break;
      case "down":
        position.depth += +move[1];
        break;
      case "up":
        position.depth -= +move[1];
        break;

      default:
        break;
    }
  }
  console.log(position.horizontal * position.depth);
};

export const d2part2 = (input: string[]) => {
  let position = { horizontal: 0, depth: 0, aim: 0 };
  for (let i = 0; i < input.length; i++) {
    const move = input[i].split(" ");
    switch (move[0]) {
      case "forward":
        position.horizontal += +move[1];
        position.depth += position.aim * +move[1];
        break;
      case "down":
        position.aim += +move[1];
        break;
      case "up":
        position.aim -= +move[1];
        break;

      default:
        break;
    }
  }
  console.log(position.horizontal * position.depth);
};

d2part2(d2input);
