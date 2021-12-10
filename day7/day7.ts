import { d7Dummy, d7Input } from './input7';
export const d7part1 = (input: number[]) => {
    let max: number = getHighestNumber(input); 
    let fuel: number = Infinity;
    for (let k = 0; k < max; k++) {
        let currentFuel: number = 0;
        for (let i = 0; i < input.length; i++) {
            currentFuel += Math.abs(input[i] - k);
        }
        if(currentFuel < fuel) {
            fuel = currentFuel;
        }
    }
    return fuel;
}

export const d7part2 = (input: number[]) => {
    let max: number = getHighestNumber(input); 
    let fuel: number = Infinity;
    for (let k = 0; k < max; k++) {
        let currentFuel: number = 0;
        for (let i = 0; i < input.length; i++) {
            currentFuel += (Math.abs((input[i] - k))*(1+Math.abs((input[i] - k))))/2;
        }
        if(currentFuel < fuel) {
            fuel = currentFuel;
        }
    }
    return fuel;
}

const getHighestNumber = (input: number[]) => {
    let max = 0;
    for (let i = 0; i < input.length; i++) {
        if (max < input[i]) {
          max =input[i];
        }
    }
    return max;
  };

console.log(d7part2(d7Input));
