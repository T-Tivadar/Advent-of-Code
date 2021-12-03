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
  const byte0: string[] = [];
  const byte1: string[] = [];
  let numberOf1 = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === "1") {
      numberOf1++;
      byte1.push(input[i]);
    } else {
      byte0.push(input[i]);
    }
  }
  if (numberOf1 >= input.length / 2) {
    return findOxygen(byte1, 1) * findCO2(byte0, 1);
  } else {
    return findOxygen(byte0, 1) * findCO2(byte1, 1);
  }
};

const findOxygen = (oxygen: string[], position: number): any => {
  if (oxygen.length === 1) {
    return parseInt(oxygen[0], 2);
  }
  const byte0: string[] = [];
  const byte1: string[] = [];
  let numberOf1 = 0;
  for (let i = 0; i < oxygen.length; i++) {
    if (oxygen[i][position] === "1") {
      numberOf1++;
      byte1.push(oxygen[i]);
    } else {
      byte0.push(oxygen[i]);
    }
  }
  if (numberOf1 >= oxygen.length / 2) {
    return findOxygen(byte1, ++position);
  } else {
    return findOxygen(byte0, ++position);
  }
};

const findCO2 = (co2: string[], position: number): any => {
  if (co2.length === 1) {
    return parseInt(co2[0], 2);
  }
  const byte0: string[] = [];
  const byte1: string[] = [];
  let numberOf1 = 0;
  for (let i = 0; i < co2.length; i++) {
    if (co2[i][position] === "1") {
      numberOf1++;
      byte1.push(co2[i]);
    } else {
      byte0.push(co2[i]);
    }
  }
  if (numberOf1 >= co2.length / 2) {
    return findCO2(byte0, ++position);
  } else {
    return findCO2(byte1, ++position);
  }
};
console.log(d3part2(d3Input));
