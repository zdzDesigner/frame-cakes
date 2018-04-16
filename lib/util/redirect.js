'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getRedirectUrl() {
    var baseUrl = window.location.host;
    var redirectUrl = '';

    if (baseUrl.indexOf('dui.ai') > -1) {
        var mainUrl = baseUrl === 'www.dui.ai' ? 'dui.ai' : baseUrl;

        redirectUrl = 'http://authentication.' + mainUrl + '/?service=' + encodeURIComponent(location.href) + '#/pc/login/commons';
    }
    return redirectUrl;
}

exports.default = {
    getRedirectUrl: getRedirectUrl
};