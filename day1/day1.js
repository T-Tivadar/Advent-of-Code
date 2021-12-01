"use strict";
exports.__esModule = true;
exports.part2 = exports.part1 = void 0;
var input_1 = require("./input");
var part1 = function (input) {
    var res = 0;
    for (var i = 1; i < input.length; i++) {
        if (input[i - 1] < input[i]) {
            res++;
        }
    }
    console.log(res);
};
exports.part1 = part1;
var part2 = function (input) {
    var res = 0;
    for (var i = 3; i < input.length; i++) {
        var A = input[i - 3] + input[i - 2] + input[i - 1];
        var B = input[i - 2] + input[i - 1] + input[i];
        if (A < B) {
            res++;
        }
    }
    console.log(res);
};
exports.part2 = part2;
(0, exports.part2)(input_1.input);
