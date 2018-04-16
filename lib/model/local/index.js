'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _store = require('store2');

var _store2 = _interopRequireDefault(_store);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [clear 清除cookie]
 * @ 清除单个 || 全部cookie 
 * @ feature 清除 指定 domain 全部cookie
 */
_jsCookie2.default.clear = function () {
    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
    }

    // const firstKey =  arg[0]
    if (!arg.length) {
        var cookies = _jsCookie2.default.get();
        (0, _keys2.default)(cookies).forEach(function (key) {
            _jsCookie2.default.remove.call(null, key);
        });
    } else {
        _jsCookie2.default.remove.apply(null, arg);
    }
};

exports.default = {
    $local: _store2.default.local,
    $session: _store2.default.session,
    $cookie: _jsCookie2.default
};