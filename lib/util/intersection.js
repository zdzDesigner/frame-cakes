"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (arr1, arr2) {

    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        console.warn("intersection\u65B9\u6CD5\u7684\u4E24\u4E2A\u53C2\u6570\u5FC5\u987B\u4E3A\u6570\u7EC4\uFF01");
        return;
    }
    arr1 = arr1.sort();
    arr2 = arr2.sort();

    var a = 0;
    var b = 0;
    var arr = [];
    while (a < arr1.length && b < arr2.length) {
        if (arr1[a] < arr2[b]) {
            a++;
        } else if (arr1[a] > arr2[b]) {
            b++;
        } else if (arr1[a] == arr2[b]) {
            arr.push(arr1[a]);
            a++;
            b++;
        }
    }

    return arr;
};