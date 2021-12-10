"use strict";
exports.__esModule = true;
exports.d8part2 = exports.d8part1 = void 0;
var input8_1 = require("./input8");
var UNIQUE_NUMBERS = [
    { number: 1, segments: 2 },
    { number: 4, segments: 4 },
    { number: 7, segments: 3 },
    { number: 8, segments: 7 },
];
var NUMBERS = [
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
var segments = "abcdefg";
var Numbers = /** @class */ (function () {
    function Numbers(zero, one, two, three, four, five, six, seven, eight, nine) {
        if (zero === void 0) { zero = ""; }
        if (one === void 0) { one = ""; }
        if (two === void 0) { two = ""; }
        if (three === void 0) { three = ""; }
        if (four === void 0) { four = ""; }
        if (five === void 0) { five = ""; }
        if (six === void 0) { six = ""; }
        if (seven === void 0) { seven = ""; }
        if (eight === void 0) { eight = ""; }
        if (nine === void 0) { nine = ""; }
        this.zero = zero;
        this.one = one;
        this.two = two;
        this.three = three;
        this.four = four;
        this.five = five;
        this.six = six;
        this.seven = seven;
        this.eight = eight;
        this.nine = nine;
    }
    return Numbers;
}());
var SSDisplay = /** @class */ (function () {
    function SSDisplay(A, B, C, D, E, F, G) {
        if (A === void 0) { A = ""; }
        if (B === void 0) { B = ""; }
        if (C === void 0) { C = ""; }
        if (D === void 0) { D = ""; }
        if (E === void 0) { E = ""; }
        if (F === void 0) { F = ""; }
        if (G === void 0) { G = ""; }
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
        this.E = E;
        this.F = F;
        this.G = G;
    }
    return SSDisplay;
}());
var d8part1 = function (input) {
    var output = [];
    for (var i = 0; i < input.length; i++) {
        var split = input[i].split(" | ");
        output.push(split[1]);
    }
    var res = 0;
    for (var i = 0; i < output.length; i++) {
        var split = output[i].split(" ").map(function (number) { return number.length; });
        for (var j = 0; j < UNIQUE_NUMBERS.length; j++) {
            for (var k = 0; k < split.length; k++) {
                if (UNIQUE_NUMBERS[j].segments === split[k]) {
                    res++;
                }
            }
        }
    }
    return res;
};
exports.d8part1 = d8part1;
var d8part2 = function (input) {
    var sum = 0;
    for (var i = 0; i < input.length; i++) {
        var split = input[i].split(" | ");
        var encodedInput = split[0].split(" ");
        var output = split[1].split(" ");
        var decodedNumbers = decodeInput(encodedInput);
        var number = "";
        for (var j = 0; j < output.length; j++) {
            for (var k = 0; k < decodedNumbers.length; k++) {
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
exports.d8part2 = d8part2;
var decodeInput = function (encodedInput) {
    var sSDisplay = new SSDisplay();
    var numbers = new Numbers();
    var uniqueNumbers = [];
    for (var i = 0; i < UNIQUE_NUMBERS.length; i++) {
        for (var j = 0; j < encodedInput.length; j++) {
            if (UNIQUE_NUMBERS[i].segments === encodedInput[j].length) {
                uniqueNumbers.push({
                    number: UNIQUE_NUMBERS[i].number,
                    segments: encodedInput[j]
                });
            }
        }
    }
    numbers.one = uniqueNumbers.find(function (number) { return number.number === 1; }).segments;
    numbers.four = uniqueNumbers.find(function (number) { return number.number === 4; }).segments;
    numbers.seven = uniqueNumbers.find(function (number) { return number.number === 7; }).segments;
    numbers.eight = uniqueNumbers.find(function (number) { return number.number === 8; }).segments;
    sSDisplay.A = diffSegments(numbers.four, numbers.seven);
    var tmp = diffSegments(numbers.seven, numbers.four);
    for (var i = 0; i < encodedInput.length; i++) {
        if (compareStrings(diffSegments(numbers.one.charAt(0), numbers.eight), encodedInput[i])) {
            numbers.six = encodedInput[i];
            sSDisplay.B = numbers.one.charAt(0);
            sSDisplay.C = numbers.one.charAt(1);
        }
        else if (compareStrings(diffSegments(numbers.one.charAt(1), numbers.eight), encodedInput[i])) {
            numbers.six = encodedInput[i];
            sSDisplay.B = numbers.one.charAt(1);
            sSDisplay.C = numbers.one.charAt(0);
        }
        if (compareStrings(diffSegments(tmp.charAt(0), numbers.eight), encodedInput[i])) {
            numbers.zero = encodedInput[i];
            sSDisplay.G = tmp.charAt(0);
            sSDisplay.F = tmp.charAt(1);
        }
        else if (compareStrings(diffSegments(tmp.charAt(1), numbers.eight), encodedInput[i])) {
            numbers.zero = encodedInput[i];
            sSDisplay.G = tmp.charAt(1);
            sSDisplay.F = tmp.charAt(0);
        }
    }
    tmp = addSegments(numbers.four, numbers.seven);
    for (var i = 0, j = 0; i < encodedInput.length; i++) {
        for (j = 0; j < segments.length; j++) {
            if (compareStrings(addSegments(tmp, segments.charAt(j)), encodedInput[i]) &&
                encodedInput[i].length === 6) {
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
var addSegments = function (seg1, seg2) {
    var dif = "";
    for (var i = 0; i < seg2.length; i++) {
        if (!seg1.includes(seg2.charAt(i))) {
            dif += seg2.charAt(i);
        }
    }
    return (seg1 += dif);
};
var diffSegments = function (seg1, seg2) {
    var dif = "";
    for (var i = 0; i < seg2.length; i++) {
        if (!seg1.includes(seg2.charAt(i))) {
            dif += seg2.charAt(i);
        }
    }
    return dif;
};
var stringValue = function (str) {
    var segmentValue = 0;
    for (var j = 0; j < str.length; j++) {
        segmentValue += str.charCodeAt(j);
    }
    return segmentValue;
};
var compareStrings = function (str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    for (var i = 0; i < str1.length; i++) {
        if (!str1.includes(str2.charAt(i))) {
            return false;
        }
    }
    return true;
};
console.log((0, exports.d8part2)(input8_1.d8input));
