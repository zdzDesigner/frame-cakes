'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (data, callback) {
    function loop(data, keys, key) {
        var once = true;
        key && keys.push(key);
        (0, _keys2.default)(data).forEach(function (item) {

            if (isObject(data[item])) {
                loop(data[item], keys, item);
                keys.pop();
            } else {
                if (once) {
                    // console.log(keys,data)
                    callback(keys, data);
                    once = false;
                }
            }
        });
    }
    loop(data, []);
};

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = _base2.default.isObject;