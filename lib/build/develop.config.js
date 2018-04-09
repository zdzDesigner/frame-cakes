'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpack = require('webpack');
var merge = require('webpack-merge');
var opn = require('opn');
var colors = require('colors');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var spawn = require('child_process').spawn;
var shell = require('shelljs');
var babel = require('babel-core');
var flow = require('flow-bin');
var config = require(process.cwd() + '/webpack.config.js');
var _package = require(process.cwd() + '/package.json');
// var BrowserSync = require('browser-sync-webpack-plugin')

module.exports = exec;

function exec(conf, webpackExtend) {
    var publicPath = _package.publicPath;
    var defaultPort = conf.port;
    var env = getArgv();
    var port = env.port || defaultPort || 8088;
    var mock = env.mock || false;
    var toshell = false;

    var webpackConfig = merge.smart(config, {
        watch: true,
        watchOptions: {
            poll: true
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                    preLoaders: {
                        js: 'vue-flow-loader'
                    }
                }

            }]
        },
        // devtool: 'cheap-module-eval-source-map',
        plugins: [new webpack.DefinePlugin({
            'APP_MOCK': (0, _stringify2.default)(mock),
            'APP_PORT': (0, _stringify2.default)(port)
        }), new NyanProgressPlugin()]
    });

    if (webpackExtend) webpackConfig = merge.smart(webpackConfig, webpackExtend);

    webpack(webpackConfig, function (err, status) {
        if (err) throw err;

        spawn('flow', {
            stdio: 'inherit',
            shell: true
        }).on('exit', function (code, err) {
            console.log(colors.green('flow logs =============='), '\n\n');
        });

        process.stdout.write(status.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false

        }) + '\n');
        if (!toshell) {
            shell.cd('dist');
            shell.exec('proxy-mock -p ' + port, {
                async: true
            }).stdout.on('data', function (data) {
                if (!toshell) {
                    var serverPath = 'http://localhost:' + port + publicPath;
                    // opn(serverPath)
                    console.log('服务地址：', serverPath);
                }
                toshell = true;
            });
        }
    });
}

// shell.exec('yarn check --integrity', {async: true}, function(status) {
//   if(status != 0) {
//     shell.echo(colors.red('***********'))
//     shell.echo(colors.red('本地 node_modules 模块 与 yarn.lock 中版本不匹配'))
//     shell.echo(colors.red('请执行 yarn upgrade 命令更新包'))
//     shell.echo(colors.red('***********'))
//     shell.exit(1)
//   }
// })


/**
 * [getArgv 获取npm run 中的参数]
 * @return {[type]} [description]
 */
function getAllArgv() {
    var argv;
    try {
        argv = JSON.parse(process.env.npm_config_argv).original;
    } catch (ex) {
        argv = process.argv;
    }
    return argv.slice(2);
}
/**
 * [getPort 获取端口]
 * @return {[]} [undefined || port]
 */
function getArgv() {
    var argv = getAllArgv(),
        port,
        mock,
        tokens = ['-p', 'mock'];

    // console.log(argv)
    tokens.forEach(function (key) {
        var index = argv.indexOf(key);
        if (~index) {
            '-p' == key && (port = argv[index + 1]);
            'mock' == key && (mock = true);
        }
    });

    // console.log({port,mock})
    return { port: port, mock: mock };
}