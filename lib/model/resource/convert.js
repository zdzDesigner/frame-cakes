'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.axios = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _UTIL = require('UTIL');

var _UTIL2 = _interopRequireDefault(_UTIL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseText = _UTIL2.default.parseText,
    logger = _UTIL2.default.logger;

var axios = _axios2.default.create();

var CancelToken = _axios2.default.CancelToken;

// const abort = Axios.CancelToken.source()
// axios.abort = abort
// console.log('CancelToken',abort.token)

function convert(sub) {

    var ROOT = sub.ROOT || '';
    delete sub.ROOT;

    return (0, _keys2.default)(sub).reduce(function (ctx, key) {

        var headRequest = ['get', 'delete', 'head', 'options'];
        var bodyRequest = ['post', 'put', 'patch'];
        var item = sub[key];
        var method = (0, _keys2.default)(item).filter(function (subkey) {
            if (~headRequest.concat(bodyRequest).indexOf(subkey)) {
                return true;
            }
        })[0];

        var rawUrl = item[method];
        // console.log(key,rawUrl)

        !item.payload && (item.payload = true);
        !item.abort && (item.abort = false);

        var type = item.payload ? 'json' : 'form';
        var abort = item.abort;
        var binary = item.binary || false;
        var response = item.response || false;
        var compile = typeof item.compile == 'boolean' ? item.compile : true;
        // console.log(item)
        // let XHR = response ? axios : axiosData
        var XHR = axios;
        var contentType = {
            'json': 'application/json',
            'form': 'application/x-www-form-urlencoded'
        }[type];

        ctx[key] = function (parse) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var pend = null;
            var url = compile ? parseText(rawUrl, parse) : rawUrl;

            logger('frame', '--- %s', rawUrl);
            logger('frame', '+++ %s method:%s', url, method);

            if (compile && !rawUrl.match(/\{(.+?)\}/)) {
                if (config) {
                    logger('frame', '~url参数%s貌似无用', (0, _stringify2.default)(parse));
                } else {
                    config = data;
                    data = parse;
                    parse = null;
                }
            }
            if (!compile) {
                config = data;
                data = parse;
                parse = null;
            }

            if (~headRequest.indexOf(method)) {
                config = data;
                data = null;
                config = expandHeaders(config, contentType, key, ROOT, abort);
                pend = binary ? requestGet(url) : XHR[method](url, config);
            }

            if (~bodyRequest.indexOf(method)) {
                config = expandHeaders(config, contentType, key, ROOT, abort);
                // console.log(data,type)
                type == 'form' && (data = serialize(data));
                pend = binary ? requestPost(url, data) : XHR[method](url, data, config);
            }

            return pend;
        };
        return ctx;
    }, {});
}

function expandHeaders(config, contentType, apiname, baseURL, abort) {

    config = config || {};
    config.headers = config.headers || {};
    config.headers['content-type'] = contentType;

    abort && (config.cancelToken = new CancelToken(function (cancel) {
        config.$$abort = cancel;
    }));

    config.$$apiname = apiname;
    baseURL && (config.baseURL = baseURL);
    // console.log(config)
    return config;
}

function serialize(data) {
    return (0, _keys2.default)(data).map(function (key) {
        return key + '=' + data[key];
    }).join('&');
}

function interceptors() {
    var requests = {};
    axios.interceptors.request.use(function (config) {
        var apiname = config.$$apiname;
        var request = requests[apiname] = requests[apiname] || [];

        if (request.length) {
            // console.log(requests, apiname)
            request.shift().abort('~ repeat request ' + config.$$apiname + ' is abort');
        }
        config.$$abort && request.push({ abort: config.$$abort });
        return config;
    }, function (error) {
        return _promise2.default.reject(error);
    });
}
interceptors();

exports.default = convert;
exports.axios = axios;