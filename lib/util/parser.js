'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function parseURL(url) {
  var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9._\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  var result = parse_url.exec(url);
  return ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'].reduce(function (obj, field, index) {
    var ret = result[index];
    if ('path' == field) ret = '/' + ret;
    obj[field] = ret;
    return obj;
  }, {});
}

function filterNull(query) {
  return query && query.split('&').filter(function (item) {
    var arr = item.split('=');
    if (arr[1]) return true;
  }).join('&');
}
/**
 * [parseText 编译标示符]
 * @param  {[type]} text [v1classes{userid}audio-upload]
 * @param  {[type]} obj [{userid:aaa}]
 * @return {[type]}     [v1classesaaaaudio-upload]
 */
function parseText(text, obj) {
  obj = obj || {};
  var url = text.replace(/(\{.*?\})/g, function () {
    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    var key = arg[0].replace(/[\{|\}]/g, '').trim();
    // console.log(obj,key)
    var keyArr = key.split(':');
    var keyVal = obj[keyArr[0]];
    var val = typeof keyVal != 'undefined' ? keyVal : keyArr[1];
    // let val =  obj[keyArr[0]] || keyArr[1]
    if (typeof val === 'undefined') throw new Error('\u5728' + text + '\u4E2D,\u53C2\u6570' + key + '\u672A\u8D4B\u503C');

    // console.log('val',val)
    return val;
  });
  // console.log('url',parseURL(url))
  var ourl = parseURL(url);
  // console.log(ourl.host,ourl.path,filterNull(ourl.query))
  var urlArr = [ourl.host, ourl.path];
  var query = filterNull(ourl.query);
  if (query) urlArr = urlArr.concat(['?', filterNull(ourl.query)]);

  return urlArr.join('');
}

exports.default = {
  parseURL: parseURL,
  parseText: parseText
};