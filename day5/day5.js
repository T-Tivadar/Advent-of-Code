"use strict";
exports.__esModule = true;
exports.d5part2 = exports.d5part1 = void 0;
var input5_1 = require("./input5");
var d5part1 = function (input) {
    var maxindex = gethighestNumber(input);
    var table = [];
    for (var i = 0; i <= maxindex; i++) {
        table.push(new Array(maxindex + 1).fill(0));
    }
    for (var k = 0; k < input.length; k++) {
        var split = input[k].split(",");
        if (split[0] === split[2]) {
            table = markHorizontal(split, table);
        }
        else if (split[1] === split[3]) {
            table = markVertical(split, table);
        }
    }
    return evaluateTable(table);
};
exports.d5part1 = d5part1;
var markHorizontal = function (split, table) {
    var j = +split[0];
    for (var i = Math.min(+split[1], +split[3]); i <= Math.max(+split[1], +split[3]); i++) {
        table[i][j]++;
    }
    return table;
};
var markVertical = function (split, table) {
    var i = +split[1];
    for (var j = Math.min(+split[0], +split[2]); j <= Math.max(+split[0], +split[2]); j++) {
        table[i][j]++;
    }
    return table;
};
var markDiagonal = function (split, table) {
    var startX = +split[0];
    var startY = +split[1];
    var endX = +split[2];
    var endY = +split[3];
    var xMagnitude = endX - startX;
    var yMagnitude = endY - startY;
    if (Math.abs(xMagnitude) === Math.abs(yMagnitude)) {
        for (var i = 0; i <= Math.abs(xMagnitude); i++) {
            table[startY + i * Math.sign(yMagnitude)][startX + i * Math.sign(xMagnitude)]++;
        }
    }
    return table;
};
var evaluateTable = function (table) {
    var res = 0;
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[0].length; j++) {
            if (table[i][j] > 1) {
                res++;
            }
        }
    }
    return res;
};
var gethighestNumber = function (input) {
    var max = 0;
    for (var i = 0; i < input.length; i++) {
        var split = input[i].split(",");
        for (var i_1 = 0; i_1 < split.length; i_1++) {
            if (max < parseInt(split[i_1])) {
                max = parseInt(split[i_1]);
            }
        }
    }
    return max;
};
var d5part2 = function (input) {
    var maxindex = gethighestNumber(input);
    var table = [];
    for (var i = 0; i <= maxindex; i++) {
        table.push(new Array(maxindex + 1).fill(0));
    }
    for (var k = 0; k < input.length; k++) {
        var split = input[k].split(",");
        if (split[0] === split[2]) {
            table = markHorizontal(split, table);
        }
        else if (split[1] === split[3]) {
            table = markVertical(split, table);
        }
        else {
            table = markDiagonal(split, table);
        }
    }
    return evaluateTable(table);
};
exports.d5part2 = d5part2;
console.log((0, exports.d5part2)(input5_1.d5Inpit));
