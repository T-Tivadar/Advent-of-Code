"use strict";
exports.__esModule = true;
exports.d3part2 = exports.d3part1 = void 0;
var input3_1 = require("./input3");
var d3part1 = function (input) {
    var byteLength = input[0].length;
    var gamma = "";
    var epsilon = "";
    for (var j = 0; j < byteLength; j++) {
        var numberOf1 = 0;
        for (var i = 0; i < input.length; i++) {
            if (input[i][j] === "1") {
                numberOf1++;
            }
        }
        if (numberOf1 > input.length / 2) {
            gamma += "1";
            epsilon += "0";
        }
        else {
            gamma += "0";
            epsilon += "1";
        }
    }
    var res = parseInt(gamma, 2) * parseInt(epsilon, 2);
    console.log("res:", res);
};
exports.d3part1 = d3part1;
var d3part2 = function (input) {
    var byte0 = [];
    var byte1 = [];
    var numberOf1 = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i][0] === "1") {
            numberOf1++;
            byte1.push(input[i]);
        }
        else {
            byte0.push(input[i]);
        }
    }
    if (numberOf1 >= input.length / 2) {
        return findOxygen(byte1, 1) * findCO2(byte0, 1);
    }
    else {
        return findOxygen(byte0, 1) * findCO2(byte1, 1);
    }
};
exports.d3part2 = d3part2;
var findOxygen = function (oxygen, position) {
    if (oxygen.length === 1) {
        return parseInt(oxygen[0], 2);
    }
    var byte0 = [];
    var byte1 = [];
    var numberOf1 = 0;
    for (var i = 0; i < oxygen.length; i++) {
        if (oxygen[i][position] === "1") {
            numberOf1++;
            byte1.push(oxygen[i]);
        }
        else {
            byte0.push(oxygen[i]);
        }
    }
    if (numberOf1 >= oxygen.length / 2) {
        return findOxygen(byte1, ++position);
    }
    else {
        return findOxygen(byte0, ++position);
    }
};
var findCO2 = function (co2, position) {
    if (co2.length === 1) {
        return parseInt(co2[0], 2);
    }
    var byte0 = [];
    var byte1 = [];
    var numberOf1 = 0;
    for (var i = 0; i < co2.length; i++) {
        if (co2[i][position] === "1") {
            numberOf1++;
            byte1.push(co2[i]);
        }
        else {
            byte0.push(co2[i]);
        }
    }
    if (numberOf1 >= co2.length / 2) {
        return findCO2(byte0, ++position);
    }
    else {
        return findCO2(byte1, ++position);
    }
};
console.log((0, exports.d3part2)(input3_1.d3Input));
