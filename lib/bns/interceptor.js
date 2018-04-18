'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = authUpdate;

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _local = require('../model/local');

var _local2 = _interopRequireDefault(_local);

var _logout = require('./logout.js');

var _logout2 = _interopRequireDefault(_logout);

var _setHeaders = require('./set-headers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authUpdate(aop) {

    return function (response) {
        (0, _setHeaders.setToken)();
        // console.log(response.data)
        if (response.data.code == '103108' || response.data.code == '103144' || response.data.errId == '103108' || response.data.errId == '103144') {
            (0, _logout2.default)();
        }
        _util2.default.isFunction(aop) && aop(response);
        return response;
    };
}