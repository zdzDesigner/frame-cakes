import local from '../model/local'
import { axios } from '../model/resource'

export {
    authInit,
    setToken,
    setRmemAuth,
    getHeaders
}

function authInit(){
    setToken()
    setRmemAuth()
}

function setToken (){
    let token = local.$cookie.get('TOKEN')
    let headers = getHeaders()

    if(token && token != headers.get('Authorization')){
        headers.set('Authorization', token)
    }    

}

// 记住我
function setRmemAuth(){
    let rmemAuth = local.$cookie.get('RMEMAUTH')
    let headers = getHeaders()
    rmemAuth && headers.set('Rmem-auth', rmemAuth)
}

// 设置headers
function getHeaders(){

    let headers = axios.defaults.headers.common

    return {
        get(key){
            return headers[key]
        },
        set(key, token){
            headers[key] = token
        }
    }
}
