'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpack = require('webpack');
var merge = require('webpack-merge');
var mock = require('filter-mock-loader');
var config = require(process.cwd() + '/webpack.config.js');

module.exports = exec;

function exec(conf, webpackExtend) {

    var webpackConfig = merge.smart(config, {
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'filter-mock-loader',
                exclude: /node_modules/

            }]
        },
        plugins: [new webpack.optimize.DedupePlugin(), new webpack.DefinePlugin({
            'APP_MOCK': (0, _stringify2.default)(false)
        }), new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })]
    });

    if (webpackExtend) webpackConfig = merge.smart(webpackConfig, webpackExtend);

    webpack(webpackConfig, function (err, status) {
        if (err) throw err;

        process.stdout.write(status.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');
    });
}