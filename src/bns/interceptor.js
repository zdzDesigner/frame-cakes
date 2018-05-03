import util from '../util'
import local from '../model/local'
import logout from './logout.js'
import { setToken } from './set-headers.js'
import jumpErrorPage from './jumpErrorPage.js'


const logoutCodeList = ['103108','103144','103100','103602','103601']
const jumpErrorPageList = ['103147','103144']
export default function authUpdate(aop){

    return function (response) {
        setToken()
        // console.log(response.data)
        if( ~logoutCodeList.indexOf(response.data.code+'') || ~logoutCodeList.indexOf(response.data.errId+'')){
            logout()
        }
        
        if( ~jumpErrorPageList.indexOf(response.data.code+'') || ~jumpErrorPageList.indexOf(response.data.errId+'')){
            jumpErrorPage()
        }

        // 该账号未初始化
        if(response.data.code == '103122' || response.data.errId == '103122'){
            location.href = `http://${location.host}/console/home/developer.html#/pc/choose`
            return
        }
        util.isFunction(aop) && aop(response)
        return response
    }
}
