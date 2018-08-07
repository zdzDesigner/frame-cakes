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
    var name = process.env.PRODUCT_NAME || conf.name || ''
    var version = process.env.PRODUCT_TAG || conf.version || 'v0.1.0'
    var title = conf.title || '前端基础构建'

    var CDN_PATH = process.env.CDN_PATH
    var dirname = process.cwd()
    var ENV = process.env.NODE_ENV

    var outPath = path.join(dirname, ENV == 'pro' ? `./dist/console/${name}-${version}/` :  `./dist/console/${name}/`)
    var publicPath = ENV == 'pro' && CDN_PATH ? `${CDN_PATH}/console/${name}-${version}/` : `/console/${name}/`
    
    var config = {
        entry: {
            app: path.join(dirname, './src/app/index.js')
        },
        output: {
            path: outPath,
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
            publicPath: publicPath
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
                loader: 'url-loader?limit=18192&name=./images/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader:'file-loader?name=./style/fonts/[name].[ext]'
            }]
        },
        resolve: {
            alias: {
                VUEX: path.resolve(dirname, './src/app/model/vuex'),
                VIEW: path.resolve(dirname, './src/app/view'),
                UTIL: path.resolve(dirname, './src/app/util'),
                SERVICE: path.resolve(dirname, './src/app/service')

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
                root: dirname,
                verbose: true,
                dry: false
            }),
            new webpack.DefinePlugin({
                'APP_ENV': JSON.stringify(ENV),
                'APP_VERSION': JSON.stringify(version)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['manifest'].reverse()
            }),

            new CopyWebpackPlugin([{
                from:'src/app/view/assets/images',
                to: 'images'
            }]),
            new InlineManifestWebpackPlugin(),
            new ExtractTextPlugin('style/app.css'),
            new HtmlWebpackPlugin({
                title:title,
                template:'index.ejs',
                env:ENV ? '':'http://172.16.20.47',
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
