const childprocess = require('child_process')
const webpackBase = require(process.cwd()+'/webpack.config.js')
const _package = require(process.cwd()+'/package.json')
const argv = require('./service/get-argv.js')
const flowServer = require('./service/flow.js')
const webpackServer = require('./service/webpack.js')
const proxyMockServer = require('./service/proxy-mock.js')


module.exports = exec


function exec(config, webpackExtend){
    let publicPath = _package.publicPath
    let defaultPort = config.port 
    let domain = (config.proxy && config.proxy.domain) || false
    let recookie = config.proxy && config.proxy.recookie || false
    let {port, mock, isflow} = argv
    let flowProcess = null
    let proxyProcess = null
    port = port || defaultPort || 8088
    let conf = {port, mock, isflow}

    

    // console.log({port, mock, isflow})
    let {webpackCompiler,watchOptions} = webpackServer(webpackBase, webpackExtend, conf)
    let watching = webpackCompiler.watch(watchOptions,(err, status) => {
            if (err) throw err
            
            process.stdout.write(status.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n')
        
            if(isflow){
                flowProcess = flowServer()
            }

            if (!proxyProcess) {
                proxyProcess = proxyMockServer(port, domain, recookie, publicPath)
                proxyProcess.on('exit', function(code, sig){
                    console.log('proxy process exit:',{code, sig})
                    process.kill(process.pid)
                })
            }

            process.on('exit', function(code, sig){
                console.log('main process exit: ',{code, sig})
                proxyProcess && proxyProcess.kill()
                flowProcess && flowProcess.kill()
            })
            
        
        })

        
        
    // console.log({watching})
    // console.log(webpackCompiler)
    

}










