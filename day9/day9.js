"use strict";
exports.__esModule = true;
exports.d9part2 = exports.d9part1 = void 0;
var input9_1 = require("./input9");
var mask = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];
var d9part1 = function (input) {
    var table = convertInputToTable(input);
    var lowestPoints = getLowestPoints(table);
    var riskLevel = 0;
    for (var i = 0; i < lowestPoints.length; i++) {
        riskLevel += table[lowestPoints[i].i][lowestPoints[i].j] + 1;
    }
    return riskLevel;
};
exports.d9part1 = d9part1;
var d9part2 = function (input) {
    var table = convertInputToTable(input);
    var lowestPoints = getLowestPoints(table);
    var basinSizes = [];
    for (var i = 0; i < lowestPoints.length; i++) {
        basinSizes.push(findBasinSize(table, lowestPoints[i].i, lowestPoints[i].j) || 1);
    }
    var sorted = basinSizes.sort(function (a, b) { return b - a; });
    return sorted[0] * sorted[1] * sorted[2];
};
exports.d9part2 = d9part2;
var findBasinSize = function (table, startX, startY) {
    var visited = [];
    var neighbors = [];
    neighbors.push({ x: startX, y: startY });
    var result = 0;
    var _loop_1 = function () {
        var node = neighbors.pop();
        var isVisited = visited.findIndex(function (_a) {
            var x = _a.x, y = _a.y;
            return (node === null || node === void 0 ? void 0 : node.x) === x && (node === null || node === void 0 ? void 0 : node.y) === y;
        }) >= 0;
        if (node && !isVisited) {
            result += 1;
            var x = node.x;
            var y = node.y;
            visited.push({ x: x, y: y });
            for (var _i = 0, mask_1 = mask; _i < mask_1.length; _i++) {
                var _a = mask_1[_i], maskX = _a[0], maskY = _a[1];
                if (isValidIndex(table, x + maskX, y + maskY) &&
                    table[x][y] < table[x + maskX][y + maskY] &&
                    table[x + maskX][y + maskY] !== 9) {
                    neighbors.push({ x: x + maskX, y: y + maskY });
                }
            }
        }
    };
    while (neighbors.length > 0) {
        _loop_1();
    }
    return result;
};
var isValidIndex = function (table, i, j) {
    return i >= 0 && j >= 0 && table.length > i && table[0].length > j;
};
var getLowestPoints = function (table) {
    var lowestPoints = [];
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            var minPoint = true;
            for (var _i = 0, mask_2 = mask; _i < mask_2.length; _i++) {
                var _a = mask_2[_i], maskX = _a[0], maskY = _a[1];
                if (isValidIndex(table, i + maskX, j + maskY)) {
                    if (table[i][j] >= table[i + maskX][j + maskY]) {
                        minPoint = false;
                        break;
                    }
                }
            }
            if (minPoint) {
                lowestPoints.push({ i: i, j: j });
            }
        }
    }
    return lowestPoints;
};
var convertInputToTable = function (input) {
    var table = [];
    for (var i = 0; i < input.length; i++) {
        table.push(input[i].split("").map(function (num) { return +num; }));
    }
    return table;
};
console.log((0, exports.d9part2)(input9_1.d9input));
