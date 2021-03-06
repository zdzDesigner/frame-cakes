import Axios from 'axios'
import core from '../../util'


const { parseText, logger } = core
const axios = Axios.create()

const CancelToken = Axios.CancelToken

// const abort = Axios.CancelToken.source()
// axios.abort = abort
// console.log('CancelToken',abort.token)

function convert(sub){

    var ROOT = sub.ROOT || ''
    delete sub.ROOT

    return Object.keys(sub).reduce(function(ctx,key){
        
        let headRequest = ['get','delete','head','options']
        let bodyRequest = ['post','put','patch']
        let item =  sub[key]
        let method = Object.keys(item).filter((subkey)=>{
            if(~headRequest.concat(bodyRequest).indexOf(subkey)){
                return true
            }    
        })[0]

        let rawUrl = item[method]
        // console.log(key,rawUrl)
        
        !item.payload && (item.payload = true)
        
        
        let type = item.payload ? 'json' : 'form'
        let abort = item.abort || false
        let binary = item.binary || false
        let response = item.response || false
        let withCredentials = item.withCredentials || false
        let compile = typeof item.compile == 'boolean' 
                            ? item.compile 
                            : true
        let mock = item.mock || false
        // console.log(item)
        
        let contentType = {
                'json':'application/json',
                'form':'application/x-www-form-urlencoded'
            }[type]
        

        ctx[key] = function(parse, data=null, config=null){
            let pend = null
            let url = compile ? parseText(rawUrl,parse) : rawUrl

            logger('frame','--- %s',rawUrl)
            logger('frame','+++ %s method:%s',url,method)

            if (compile && !rawUrl.match(/\{(.+?)\}/)) {
                if (config) {
                    logger('frame', '~url参数%s貌似无用', JSON.stringify(parse));
                } else {
                    config = data;
                    data = parse;
                    parse = null;
                }
            }
            if(!compile){
                config = data;
                data = parse;
                parse = null;
            }

            
            if(~headRequest.indexOf(method)){
                config = data
                data = null
                config = expandHeaders({config, contentType, apiname:key, baseURL:ROOT, abort, binary, withCredentials, mock})
                pend = axios[method](url,config)
            }

            if(~bodyRequest.indexOf(method)){
                config = expandHeaders({config, contentType, apiname:key, baseURL:ROOT, abort, binary, withCredentials, mock})
                // console.log(data,type)
                type == 'form' && (data = serialize(data))
                pend = axios[method](url,data,config)
            }

            // return pend

            pend.catch(function(err){
                // console.log({err})
            })

            return {
                then:function(res, rej){
                    rej = rej || function(){}
                    return pend.then(res,rej)
                },
                catch:function(capture){
                    capture = capture || function(){}
                    return pend.catch(capture)
                }
            }
        }
        return ctx
        
    },{})
}

function expandHeaders(params){
    let {config, contentType, apiname
        , baseURL, abort, binary
        , withCredentials, mock} = params

    config = config || {}
    config.headers = config.headers||{}
    config.headers['content-type'] = contentType


    abort && (config.cancelToken = 
                new CancelToken(function(cancel) {
                    config.$$abort = cancel
                }))

    config.$$apiname = apiname
    baseURL && (config.baseURL = baseURL)
    withCredentials && (config.withCredentials = withCredentials)
    binary && (config.responseType = 'arraybuffer')
    mock && (config.headers['mock-remote'] = mock)

    // console.log(config)
    return config
}

function serialize(data){
    return Object.keys(data).map((key)=> `${key}=${data[key]}`)
            .join('&')
}

function interceptors(){
    const requests = {}
    axios.interceptors.request.use(function (config) {
        let apiname = config.$$apiname
        let request = requests[apiname] = requests[apiname] || []

        if(request.length){
            // console.log(requests, apiname)
            request.shift().abort(`~ repeat request ${config.$$apiname} is abort`)
        }
        config.$$abort && request.push({ abort:config.$$abort })
        return config
    }, function (error) {
        return Promise.reject(error)
    })
}
interceptors()

export default convert
export { axios }