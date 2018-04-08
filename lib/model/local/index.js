'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require('store2');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cookie = _store2.default.cookie = {};
cookie.get = function (cookie_name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split('; ');
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=');
        if (cookie_name == arr[0]) {
            return arr[1];
        }
    }
    return '';
};

cookie.set = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
};

cookie.clear = function (name) {
    cookie.set(name, '', -1);
};

exports.default = {
    $local: _store2.default.local,
    $session: _store2.default.session,
    $cookie: _store2.default.cookie
    // console.log(Object.keys(store) 
    //             ,Object.keys(store.local) 
    //             ,Object.keys(store.session));

};