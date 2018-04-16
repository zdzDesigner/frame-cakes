'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _functor = require('./functor.js');

var _functor2 = _interopRequireDefault(_functor);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _flatobj = require('./flatobj.js');

var _flatobj2 = _interopRequireDefault(_flatobj);

var _intersection = require('./intersection.js');

var _intersection2 = _interopRequireDefault(_intersection);

var _parser = require('./parser.js');

var _parser2 = _interopRequireDefault(_parser);

var _di = require('./di.js');

var _di2 = _interopRequireDefault(_di);

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _redirect = require('./redirect.js');

var _redirect2 = _interopRequireDefault(_redirect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = (0, _extends3.default)({}, _functor2.default, _base2.default, _parser2.default, _redirect2.default, {
    flatobj: _flatobj2.default,
    intersection: _intersection2.default,
    di: _di2.default,
    logger: _logger2.default

});

exports.default = util;
exports.logger = _logger2.default;