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

var _jumpErrorPage = require('./jumpErrorPage.js');

var _jumpErrorPage2 = _interopRequireDefault(_jumpErrorPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logoutCodeList = ['103108', '103144', '103100', '103602', '103601'];
var jumpErrorPageList = ['103147', '103144'];
function authUpdate(aop) {

    return function (response) {
        (0, _setHeaders.setToken)();
        // console.log(response.data)
        if (~logoutCodeList.indexOf(response.data.code + '') || ~logoutCodeList.indexOf(response.data.errId + '')) {
            (0, _logout2.default)();
        }

        if (~jumpErrorPageList.indexOf(response.data.code + '') || ~jumpErrorPageList.indexOf(response.data.errId + '')) {
            (0, _jumpErrorPage2.default)();
        }

        // 该账号未初始化
        if (response.data.code == '103122' || response.data.errId == '103122') {
            location.href = 'http://' + location.host + '/console/home/developer.html#/pc/choose';
            return;
        }
        _util2.default.isFunction(aop) && aop(response);
        return response;
    };
}