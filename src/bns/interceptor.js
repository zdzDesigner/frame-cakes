import util from '../util'
import local from '../model/local'
import logout from './logout.js'
import { setToken } from './set-headers.js'
import jumpErrorPage from './jumpErrorPage.js'


const logoutCodeList = ['103108','103100','103602','103601','4011']
const jumpErrorPageList = ['103144']
export default function authUpdate(aop){

    return function (response) {
        setToken()
        let code = String(response.data.code)

        // console.log(response.data)
        if( ~logoutCodeList.indexOf(code)){
            logout()    
        }
        
        if( ~jumpErrorPageList.indexOf(code)){
            jumpErrorPage()
        }

        // 该账号未初始化
        if('103119' == code){
            location.href = `http://${location.host}/console/home/developer.html#/pc/choose`
            return
        }
        util.isFunction(aop) && aop(response)
        return response
    }
}
