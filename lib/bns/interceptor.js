'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = auth;

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _local = require('../model/local');

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function auth(aop) {

    return function (response) {
        console.log(response.data);
        if (response.data.code == '103108' || response.data.code == '103144' || response.data.errId == '103108' || response.data.errId == '103144') {
            _local2.default.$cookie.clear('TOKEN');
            _local2.default.$cookie.clear('TOKEN', { domian: '.' + _util2.default.parseURL(location.href).host });
            _local2.default.$cookie.clear('groupKey');
            _local2.default.$cookie.clear('groupKey', { domian: '.' + _util2.default.parseURL(location.href).host });
            location.href = _util2.default.getRedirectUrl();
        }
        _util2.default.isFunction(aop) && aop(response);
        return response;
    };
}