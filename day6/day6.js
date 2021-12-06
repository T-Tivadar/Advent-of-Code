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
exports.d6part1 = void 0;
var input6_1 = require("./input6");
var d6part1 = function (input) {
    var lanternFish = new Array(9).fill(0);
    for (var i = 0; i < input.length; i++) {
        lanternFish[input[i]]++;
    }
    for (var k = 1; k <= 256; k++) {
        var oldLanternFish = __spreadArray([], lanternFish, true);
        for (var i = lanternFish.length - 1; i > 0; i--) {
            lanternFish[i - 1] = oldLanternFish[i];
        }
        lanternFish[6] += oldLanternFish[0];
        lanternFish[lanternFish.length - 1] = oldLanternFish[0];
    }
    var res = 0;
    for (var i = 0; i < lanternFish.length; i++) {
        res += lanternFish[i];
    }
    return res;
};
exports.d6part1 = d6part1;
console.log((0, exports.d6part1)(input6_1.d6Input));
