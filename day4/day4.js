"use strict";
exports.__esModule = true;
exports.d4part2 = exports.d4part1 = void 0;
var input4_1 = require("./input4");
var ROW_LENGTH = 5;
var d4part1 = function (drawns, input) {
    var markTable = new Array(input.length);
    for (var d = 0; d < drawns.length; d++) {
        for (var i = 0; i < input.length / ROW_LENGTH; i++) {
            var marksInRow = 0;
            for (var j = 0; j < ROW_LENGTH; j++) {
                var index = j + i * ROW_LENGTH;
                if (drawns[d] === input[index]) {
                    markTable[index] = "x";
                    if (isWinnerCol(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH, j, markTable)) {
                        return countWinnerScore(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH, input, markTable, drawns[d]);
                    }
                }
                marksInRow += markTable[index] === "x" ? 1 : 0;
                if (marksInRow === 5) {
                    return countWinnerScore(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH, input, markTable, drawns[d]);
                }
            }
        }
    }
};
exports.d4part1 = d4part1;
var isWinnerCol = function (i, j, markTable) {
    var markInCol = 0;
    for (var k = 0; k < ROW_LENGTH; k++, i++) {
        var index = j + i * ROW_LENGTH;
        markInCol += markTable[index] === "x" ? 1 : 0;
    }
    return markInCol === 5;
};
var countWinnerScore = function (index, input, markTable, winnerNumber) {
    var res = 0;
    for (var i = 0; i < ROW_LENGTH * ROW_LENGTH; i++, index++) {
        if (markTable[index] !== "x") {
            res += input[index];
        }
    }
    return res * winnerNumber;
};
var d4part2 = function (drawns, input) {
    var markTable = new Array(input.length);
    var score = 0;
    for (var d = 0; d < drawns.length; d++) {
        for (var i = 0; i < input.length / ROW_LENGTH; i++) {
            var marksInRow = 0;
            if (markTable[i * ROW_LENGTH] === "w") {
                continue;
            }
            for (var j = 0; j < ROW_LENGTH; j++) {
                var index = j + i * ROW_LENGTH;
                if (drawns[d] === input[index]) {
                    markTable[index] = "x";
                    if (isWinnerCol(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH, j, markTable)) {
                        score = countWinnerScore(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH, input, markTable, drawns[d]);
                        markTable = markWinnerBoard(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH, markTable);
                    }
                }
                marksInRow += markTable[index] === "x" ? 1 : 0;
                if (marksInRow === 5) {
                    score = countWinnerScore(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH, input, markTable, drawns[d]);
                    markTable = markWinnerBoard(~~(index / (ROW_LENGTH * ROW_LENGTH)) * ROW_LENGTH * ROW_LENGTH, markTable);
                }
            }
        }
    }
    return score;
};
exports.d4part2 = d4part2;
var markWinnerBoard = function (index, markTable) {
    for (var i = 0; i < ROW_LENGTH * ROW_LENGTH; i++, index++) {
        markTable[index] = "w";
    }
    return markTable;
};
console.log((0, exports.d4part2)(input4_1.d4InputDrawn, input4_1.d4Input));
