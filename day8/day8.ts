import { input } from "./../day1/input";
import { d8Dummy, d8input } from "./input8";
const UNIQUE_NUMBERS = [
  { number: 1, segments: 2 },
  { number: 4, segments: 4 },
  { number: 7, segments: 3 },
  { number: 8, segments: 7 },
];

const NUMBERS = [
  { number: 0, segments: "abcdef" },
  { number: 1, segments: "bc" },
  { number: 2, segments: "abged" },
  { number: 3, segments: "abgcd" },
  { number: 4, segments: "fgbc" },
  { number: 5, segments: "afgcd" },
  { number: 6, segments: "afedcg" },
  { number: 7, segments: "abc" },
  { number: 8, segments: "abcdefg" },
  { number: 9, segments: "abcdfg" },
];
const segments = "abcdefg";

class Numbers {
  constructor(
    public zero: string = "",
    public one: string = "",
    public two: string = "",
    public three: string = "",
    public four: string = "",
    public five: string = "",
    public six: string = "",
    public seven: string = "",
    public eight: string = "",
    public nine: string = ""
  ) {}
}

class SSDisplay {
  constructor(
    public A: string = "",
    public B: string = "",
    public C: string = "",
    public D: string = "",
    public E: string = "",
    public F: string = "",
    public G: string = ""
  ) {}
}

export const d8part1 = (input: string[]) => {
  const output: string[] = [];
  for (let i = 0; i < input.length; i++) {
    const split = input[i].split(" | ");
    output.push(split[1]);
  }

  let res = 0;

  for (let i = 0; i < output.length; i++) {
    const split = output[i].split(" ").map((number) => number.length);
    for (let j = 0; j < UNIQUE_NUMBERS.length; j++) {
      for (let k = 0; k < split.length; k++) {
        if (UNIQUE_NUMBERS[j].segments === split[k]) {
          res++;
        }
      }
    }
  }
  return res;
};

export const d8part2 = (input: string[]) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const split = input[i].split(" | ");
    const encodedInput = split[0].split(" ");
    const output = split[1].split(" ");
    const decodedNumbers: string[] = decodeInput(encodedInput);
    let number = "";
    for (let j = 0; j < output.length; j++) {
      for (let k = 0; k < decodedNumbers.length; k++) {
        if (compareStrings(decodedNumbers[k], output[j])) {
          number += k;
        }
      }
    }
    if (number.length > 4) {
      console.log(i + ": " + number);
      console.log(decodedNumbers);
    }
    sum += +number;
  }
  return sum;
};

const decodeInput = (encodedInput: string[]) => {
  let sSDisplay = new SSDisplay();
  let numbers = new Numbers();
  const uniqueNumbers: { number: number; segments: string }[] = [];
  for (let i = 0; i < UNIQUE_NUMBERS.length; i++) {
    for (let j = 0; j < encodedInput.length; j++) {
      if (UNIQUE_NUMBERS[i].segments === encodedInput[j].length) {
        uniqueNumbers.push({
          number: UNIQUE_NUMBERS[i].number,
          segments: encodedInput[j],
        });
      }
    }
  }

  numbers.one = uniqueNumbers.find((number) => number.number === 1)!.segments;
  numbers.four = uniqueNumbers.find((number) => number.number === 4)!.segments;
  numbers.seven = uniqueNumbers.find((number) => number.number === 7)!.segments;
  numbers.eight = uniqueNumbers.find((number) => number.number === 8)!.segments;

  sSDisplay.A = diffSegments(numbers.four, numbers.seven);

  let tmp = diffSegments(numbers.seven, numbers.four);
  for (let i = 0; i < encodedInput.length; i++) {
    if (
      compareStrings(
        diffSegments(numbers.one.charAt(0), numbers.eight),
        encodedInput[i]
      )
    ) {
      numbers.six = encodedInput[i];
      sSDisplay.B = numbers.one.charAt(0);
      sSDisplay.C = numbers.one.charAt(1);
    } else if (
      compareStrings(
        diffSegments(numbers.one.charAt(1), numbers.eight),
        encodedInput[i]
      )
    ) {
      numbers.six = encodedInput[i];
      sSDisplay.B = numbers.one.charAt(1);
      sSDisplay.C = numbers.one.charAt(0);
    }
    if (
      compareStrings(
        diffSegments(tmp.charAt(0), numbers.eight),
        encodedInput[i]
      )
    ) {
      numbers.zero = encodedInput[i];
      sSDisplay.G = tmp.charAt(0);
      sSDisplay.F = tmp.charAt(1);
    } else if (
      compareStrings(
        diffSegments(tmp.charAt(1), numbers.eight),
        encodedInput[i]
      )
    ) {
      numbers.zero = encodedInput[i];
      sSDisplay.G = tmp.charAt(1);
      sSDisplay.F = tmp.charAt(0);
    }
  }

  tmp = addSegments(numbers.four, numbers.seven);

  for (let i = 0, j = 0; i < encodedInput.length; i++) {
    for (j = 0; j < segments.length; j++) {
      if (
        compareStrings(addSegments(tmp, segments.charAt(j)), encodedInput[i]) &&
        encodedInput[i].length === 6
      ) {
        numbers.nine = encodedInput[i];
        sSDisplay.D = segments.charAt(j);
        sSDisplay.E = diffSegments(encodedInput[i], numbers.eight);
      }
    }
  }
  numbers.two =
    sSDisplay.A + sSDisplay.B + sSDisplay.G + sSDisplay.E + sSDisplay.D;
  numbers.three =
    sSDisplay.A + sSDisplay.B + sSDisplay.G + sSDisplay.C + sSDisplay.D;
  numbers.five =
    sSDisplay.A + sSDisplay.F + sSDisplay.G + sSDisplay.C + sSDisplay.D;
  return [
    numbers.zero,
    numbers.one,
    numbers.two,
    numbers.three,
    numbers.four,
    numbers.five,
    numbers.six,
    numbers.seven,
    numbers.eight,
    numbers.nine,
  ];
};

const addSegments = (seg1: string, seg2: string) => {
  let dif: string = "";
  for (let i = 0; i < seg2.length; i++) {
    if (!seg1.includes(seg2.charAt(i))) {
      dif += seg2.charAt(i);
    }
  }
  return (seg1 += dif);
};

const diffSegments = (seg1: string, seg2: string) => {
  let dif: string = "";
  for (let i = 0; i < seg2.length; i++) {
    if (!seg1.includes(seg2.charAt(i))) {
      dif += seg2.charAt(i);
    }
  }
  return dif;
};

const stringValue = (str: string) => {
  let segmentValue = 0;
  for (let j = 0; j < str.length; j++) {
    segmentValue += str.charCodeAt(j);
  }
  return segmentValue;
};

const compareStrings = (str1: string, str2: string) => {
  if (str1.length !== str2.length) {
    return false;
  }
  for (let i = 0; i < str1.length; i++) {
    if (!str1.includes(str2.charAt(i))) {
      return false;
    }
  }
  return true;
};

console.log(d8part2(d8input));
