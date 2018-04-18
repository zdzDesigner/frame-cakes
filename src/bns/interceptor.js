import util from '../util'
import local from '../model/local'
import logout from './logout.js'
import { setToken } from './set-headers.js'




export default function authUpdate(aop){

    return function (response) {
        setToken()
        // console.log(response.data)
        if( response.data.code == '103108' || response.data.code == '103144' 
            || response.data.errId == '103108' || response.data.errId == '103144'){
            logout()
        }
        util.isFunction(aop) && aop(response)
        return response
    }
}
