/**
 * @description webpack 配置
 * @author zdzDesigner
 */
var webpack = require('webpack')
var merge = require('webpack-merge')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = getConfig

function getConfig(conf, webpackExtend) {
    var ENV = process.env.NODE_ENV
    var PUBLIC_PATH = conf.publicPath || '/'
    var DOMAIN_PATH = ENV ? ('ENV_DOMAIN' + PUBLIC_PATH) : PUBLIC_PATH
    var VERSION = conf.version || 'v0.1.0'
    var TITLE = conf.title || '前端基础构建'
    var DIR_NAME = conf.dirname || process.cwd()
    
    console.log('dirname:',DIR_NAME)

    var config = {
        entry: {
            app: DIR_NAME + '/src/app/index.js'
        },
        output: {
            path:DIR_NAME + '/dist'+ PUBLIC_PATH,
            filename: 'js/[name]_[chunkhash:8].js',
            chunkFilename: 'js/[name]_[chunkhash:8].js',
            publicPath: DOMAIN_PATH
        },

        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  extractCSS: true
                }
            },{
                test: /\.js$/,
                loader: 'babel-loader'
            },{    
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },{    
                test: /\.scss$/,
                // loader: 'css-loader!sass-loader'
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },{
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options:{
                    limit:18192,
                    name:'images/[hash:8].[name].[ext]',
                    publicPath:PUBLIC_PATH
                }
            }, {
                test: /\.(svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader:'file-loader',
                options:{
                    name:'style/fonts/[hash:8].[name].[ext]',
                    publicPath:PUBLIC_PATH
                }
            }]
        },
        resolve: {
            alias: {
                VUEX: path.resolve(DIR_NAME, './src/app/model/vuex'),
                VIEW: path.resolve(DIR_NAME, './src/app/view'),
                UTIL: path.resolve(DIR_NAME, './src/app/util'),
                SERVICE: path.resolve(DIR_NAME, './src/app/service')

            }
        },
        externals: {
            'vue':'Vue',
            'vuex':'Vuex',
            'vue-router':'VueRouter',
            'axios':'axios'
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: DIR_NAME,
                verbose: true,
                dry: false
            }),
            new webpack.DefinePlugin({
                'APP_ENV': JSON.stringify(ENV),
                'APP_VERSION': JSON.stringify(VERSION)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['manifest'].reverse()
            }),

            new CopyWebpackPlugin([{
                from:'src/app/view/assets/images',
                to: 'images'
            }]),
            new InlineManifestWebpackPlugin(),
            new ExtractTextPlugin('style/app_[chunkhash:8].css'),
            new HtmlWebpackPlugin({
                title:TITLE,
                template:'index.ejs',
                env: ENV ? 'ENV_DOMAIN' : 'http://172.16.20.49',
                chunks: ['app'],
                inject:false,
                minify: {
                    collapseWhitespace: true
                }
            })
            
        ]
    }

    return merge.smart(config, webpackExtend)

}
