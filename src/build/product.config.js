var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require(process.cwd()+'/webpack.config.js')

module.exports = exec

function exec(conf, webpackExtend){
    

    var webpackConfig = merge.smart(config, {
        module: {
            rules: [
            {
                test: /\.js$/,
                loader: 'filter-mock-loader',
                exclude: /node_modules/
                
            }]
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'APP_MOCK': JSON.stringify(false)
            }),
            new webpack.optimize.UglifyJsPlugin({
                  compress: {
                    warnings: false
                  }
                })
        ]    
    })

    if(webpackExtend) webpackConfig = merge.smart(webpackConfig,webpackExtend)

    webpack(webpackConfig, function(err, status) {
        if (err) throw err

        process.stdout.write(status.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
    })
}

