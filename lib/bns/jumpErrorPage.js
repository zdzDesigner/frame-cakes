'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var host = _util2.default.parseURL(location.href).host;
    host = host.replace(/^www\./, '');

    _local2.default.$cookie.clear('groupKey');
    _local2.default.$cookie.clear('groupKey', { domain: '.' + host });
    location.href = location.origin + '/console/assets/errors/index.html#/404';
};

var _local = require('../model/local');

var _local2 = _interopRequireDefault(_local);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }