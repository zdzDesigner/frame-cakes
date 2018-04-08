'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var merge = Vue.util.mergeOptions;
var urlTpl = function urlTpl() {};

var isObject = function isObject(val) {
    return Object.prototype.toString.call(val) == '[object Object]';
};

/**
 * [mergeMulti description]
 * mergeMulti({},{name:'zdz'},{age:33})
 */
var mergeMulti = function mergeMulti(data) {
    data = data || {};

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return args.reduce(function (pending, item) {
        return merge(pending, item);
    }, data);
};

exports.default = {
    isObject: isObject,
    merge: merge,
    mergeMulti: mergeMulti,
    urlTpl: urlTpl
};