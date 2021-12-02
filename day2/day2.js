"use strict";
exports.__esModule = true;
exports.d2part2 = exports.d2part1 = void 0;
var input2_1 = require("./input2");
var d2part1 = function (input) {
    var position = { horizontal: 0, depth: 0 };
    for (var i = 0; i < input.length; i++) {
        var move = input[i].split(" ");
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
exports.d2part1 = d2part1;
var d2part2 = function (input) {
    var position = { horizontal: 0, depth: 0, aim: 0 };
    for (var i = 0; i < input.length; i++) {
        var move = input[i].split(" ");
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
exports.d2part2 = d2part2;
(0, exports.d2part2)(input2_1.d2input);
