'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHeaders = exports.setRmemAuth = exports.setToken = exports.authInit = undefined;

var _local = require('../model/local');

var _local2 = _interopRequireDefault(_local);

var _resource = require('../model/resource');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.authInit = authInit;
exports.setToken = setToken;
exports.setRmemAuth = setRmemAuth;
exports.getHeaders = getHeaders;


function authInit() {
    setToken();
    setRmemAuth();
}

function setToken() {
    var token = _local2.default.$cookie.get('TOKEN');
    var headers = getHeaders();

    if (token && token != headers.get('Authentication')) {
        headers.set('Authentication', token);
    }
}

// 记住我
function setRmemAuth() {
    var rmemAuth = _local2.default.$cookie.get('RMEMAUTH');
    var headers = getHeaders();
    rmemAuth && headers.set('Rmem-auth', rmemAuth);
}

// 设置headers
function getHeaders() {

    var headers = _resource.axios.defaults.headers.common;

    return {
        get: function get(key) {
            return headers[key];
        },
        set: function set(key, token) {
            headers[key] = token;
        }
    };
}