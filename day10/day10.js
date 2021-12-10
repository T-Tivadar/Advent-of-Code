"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.d10part2 = exports.d10part1 = void 0;
var input10_1 = require("./input10");
var BRACKETS = [
    { key: "(", pair: ")", value: 3, score: 1 },
    { key: "[", pair: "]", value: 57, score: 2 },
    { key: "{", pair: "}", value: 1197, score: 3 },
    { key: "<", pair: ">", value: 25137, score: 4 },
];
var d10part1 = function (input) {
    var errorScore = 0;
    for (var i = 0; i < input.length; i++) {
        errorScore += validateBrackets(input[i])[0];
    }
    return errorScore;
};
exports.d10part1 = d10part1;
var validateBrackets = function (row) {
    var brackets = __spreadArray([], BRACKETS, true);
    var open = [];
    for (var i = 0; i < row.length; i++) {
        var char = row.charAt(i);
        for (var j = 0; j < brackets.length; j++) {
            if (char === brackets[j].key) {
                open.push(char);
            }
            if (char === brackets[j].pair) {
                if (brackets.find(function (bracket) { return bracket.key === open[open.length - 1]; })
                    .pair === char) {
                    open.pop();
                }
                else {
                    return [brackets[j].value, open];
                }
            }
        }
    }
    return [0, open];
};
var d10part2 = function (input) {
    var openBrackets = [];
    for (var i = 0; i < input.length; i++) {
        var validate = validateBrackets(input[i]);
        if (validate[0] === 0) {
            openBrackets.push(validate[1]);
        }
    }
    var scores = [];
    for (var i = 0; i < openBrackets.length; i++) {
        var closeBracketsScores = openBrackets[i]
            .reverse()
            .map(function (bracket) { return BRACKETS.find(function (b) { return b.key === bracket; }).score; });
        var score = 0;
        for (var j = 0; j < closeBracketsScores.length; j++) {
            score = 5 * score + closeBracketsScores[j];
        }
        scores.push(score);
    }
    var sorted = scores.sort(function (a, b) { return a - b; });
    return sorted[Math.ceil((sorted.length - 1) / 2)];
};
exports.d10part2 = d10part2;
console.log((0, exports.d10part2)(input10_1.d10input));
