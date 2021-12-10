"use strict";
exports.__esModule = true;
exports.d7part2 = exports.d7part1 = void 0;
var input7_1 = require("./input7");
var d7part1 = function (input) {
    var max = getHighestNumber(input);
    var fuel = Infinity;
    for (var k = 0; k < max; k++) {
        var currentFuel = 0;
        for (var i = 0; i < input.length; i++) {
            currentFuel += Math.abs(input[i] - k);
        }
        if (currentFuel < fuel) {
            fuel = currentFuel;
        }
    }
    return fuel;
};
exports.d7part1 = d7part1;
var d7part2 = function (input) {
    var max = getHighestNumber(input);
    var fuel = Infinity;
    for (var k = 0; k < max; k++) {
        var currentFuel = 0;
        for (var i = 0; i < input.length; i++) {
            currentFuel += (Math.abs((input[i] - k)) * (1 + Math.abs((input[i] - k)))) / 2;
        }
        if (currentFuel < fuel) {
            fuel = currentFuel;
        }
    }
    return fuel;
};
exports.d7part2 = d7part2;
var getHighestNumber = function (input) {
    var max = 0;
    for (var i = 0; i < input.length; i++) {
        if (max < input[i]) {
            max = input[i];
        }
    }
    return max;
};
console.log((0, exports.d7part2)(input7_1.d7Input));
