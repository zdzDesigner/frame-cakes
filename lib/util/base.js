'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = _vue2.default.util.mergeOptions;
var urlTpl = function urlTpl() {};

function getType(val, type) {
    return Object.prototype.toString.call(val) == '[object ' + type + ']';
}

var isObject = function isObject(val) {
    return getType(val, 'Object');
};
var isFunction = function isFunction(val) {
    return getType(val, 'Function');
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
    isFunction: isFunction,
    isObject: isObject,
    merge: merge,
    mergeMulti: mergeMulti,
    urlTpl: urlTpl
};