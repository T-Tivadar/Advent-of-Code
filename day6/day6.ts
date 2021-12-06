import { d6Dummy, d6Input } from "./input6";

export const d6part1 = (input: number[]) => {
  const lanternFish: number[] = new Array<number>(9).fill(0);
  for (let i = 0; i < input.length; i++) {
    lanternFish[input[i]]++;
  }

  for (let k = 1; k <= 256; k++) {
    let oldLanternFish: number[] = [...lanternFish];

    for (let i = lanternFish.length - 1; i > 0; i--) {
      lanternFish[i - 1] = oldLanternFish[i];
    }
    lanternFish[6] += oldLanternFish[0];
    lanternFish[lanternFish.length - 1] = oldLanternFish[0];
  }

  let res = 0;
  for (let i = 0; i < lanternFish.length; i++) {
    res += lanternFish[i];
  }

  return res;
};

console.log(d6part1(d6Input));
