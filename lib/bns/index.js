'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHeaders = exports.setRmemAuth = exports.setToken = exports.auth = undefined;

var _interceptor = require('./interceptor.js');

var _interceptor2 = _interopRequireDefault(_interceptor);

var _logout = require('./logout.js');

var _logout2 = _interopRequireDefault(_logout);

var _setHeaders = require('./set-headers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = {
    init: _setHeaders.authInit,
    update: _interceptor2.default,
    destroy: _logout2.default
};

exports.auth = auth;
exports.setToken = _setHeaders.setToken;
exports.setRmemAuth = _setHeaders.setRmemAuth;
exports.getHeaders = _setHeaders.getHeaders;