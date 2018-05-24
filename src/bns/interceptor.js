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
        // console.log(response.data)
        if( ~logoutCodeList.indexOf(response.data.code+'')){
            response.data.code == '4011'
                && console.log('4011:',response.request.responseURL)
                
            logout()
        }
        
        if( ~jumpErrorPageList.indexOf(response.data.code+'')){
            jumpErrorPage()
        }

        // 该账号未初始化
        if(response.data.code == '103119'){
            location.href = `http://${location.host}/console/home/developer.html#/pc/choose`
            return
        }
        util.isFunction(aop) && aop(response)
        return response
    }
}
