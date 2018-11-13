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
    let watching = null
    port = port || defaultPort || 8088
    let conf = {port, mock, isflow}

    

    // console.log({port, mock, isflow})
    let {webpackCompiler, watchOptions, memoryFS} = webpackServer(webpackBase, webpackExtend, conf)
    webpackCompiler.plugin('watch-close', (watching, callback) => {
        console.log('watch-colse ....')
        console.log('reset watch ....')
        // process.exit()
        watcher()
    })
    webpackCompiler.plugin('done', (stats) => {
        console.log('watch-done ....')
        // console.log({stats})
        console.log(stats.compilation.outputOptions)
        // watcher()
    })
    watcher()
    function watcher(){
        watching = webpackCompiler.watch(watchOptions,(err, status) => {
                if (err) return

                try{
                    memoryFS.mkdirpSync("/console/test/dir")
                    console.log('memoryFS dist:',memoryFS.readdirSync('/console'))
                }catch(err){
                    console.error(err.message)
                }

                process.stdout.write(status.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + '\n')

                if(isflow && !flowProcess){
                    flowProcess = flowServer()
                }
                
                if (!proxyProcess) {
                    proxyProcess = proxyMockServer(port, domain, recookie, publicPath)
                    proxyProcess.on('close', function(code, sig){
                        console.log('proxy process exit:',{code, sig})
                    })

                    process.on('exit', function(code, sig){
                        console.log('main process exit: ',{code, sig})
                        proxyProcess && proxyProcess.kill()
                        flowProcess && flowProcess.kill()
                    })
                }
            
            })
        
        // console.log({watching},{webpackCompiler})
        // setTimeout(()=>{
        //     watching.close(() => {
        //       // console.log('Watching Ended.----------------------')
        //     })
        // },10000)
    }

}










