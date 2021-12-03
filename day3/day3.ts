import { d3Input } from "./input3";

export const d3part1 = (input: string[]) => {
  const byteLength = input[0].length;
  let gamma = "";
  let epsilon = "";
  for (let j = 0; j < byteLength; j++) {
    let numberOf1 = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i][j] === "1") {
        numberOf1++;
      }
    }
    if (numberOf1 > input.length / 2) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }
  const res = parseInt(gamma, 2) * parseInt(epsilon, 2);
  console.log("res:", res);
};

export const d3part2 = (input: string[]) => {
  const split = splitBytes(input, 0);
  if (split.numberOf1 >= input.length / 2) {
    return findOxygen(split.byte1, 1) * findCO2(split.byte0, 1);
  } else {
    return findOxygen(split.byte0, 1) * findCO2(split.byte1, 1);
  }
};

const findOxygen = (oxygen: string[], position: number): any => {
  if (oxygen.length === 1) {
    return parseInt(oxygen[0], 2);
  }
  const split = splitBytes(oxygen, position);
  if (split.numberOf1 >= oxygen.length / 2) {
    return findOxygen(split.byte1, ++position);
  } else {
    return findOxygen(split.byte0, ++position);
  }
};

const findCO2 = (co2: string[], position: number): any => {
  if (co2.length === 1) {
    return parseInt(co2[0], 2);
  }
  const split = splitBytes(co2, position);
  if (split.numberOf1 >= co2.length / 2) {
    return findCO2(split.byte0, ++position);
  } else {
    return findCO2(split.byte1, ++position);
  }
};

const splitBytes = (bytes: string[], position: number) => {
  const byte0: string[] = [];
  const byte1: string[] = [];
  let numberOf1 = 0;
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i][position] === "1") {
      numberOf1++;
      byte1.push(bytes[i]);
    } else {
      byte0.push(bytes[i]);
    }
  }
  return { numberOf1, byte0, byte1 };
};

console.log(d3part2(d3Input));
