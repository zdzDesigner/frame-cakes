import util from '../util'
import local from '../model/local'
import logout from './logout.js'
import { setToken } from './set-headers.js'


const logoutCodeList = ['103108','103144','103100','103602','103601']

export default function authUpdate(aop){

    return function (response) {
        setToken()
        // console.log(response.data)
        if( ~logoutCodeList.indexOf(response.data.code+'') || ~logoutCodeList.indexOf(response.data.errId+'')){
            logout()
        }
        // if( response.data.code == '103108' || response.data.code == '103144' || response.data.code == '103100' || response.data.code == '103602'
        //     || response.data.errId == '103108' || response.data.errId == '103144' || response.data.errId == '103100' || response.data.errId == '103602'){
        //     logout()
        // }

        // 该账号未初始化
        if(response.data.code == '103122' || response.data.errId == '103122'){
            location.href = `http://${location.host}/console/home/developer.html#/pc/choose`
            return
        }
        util.isFunction(aop) && aop(response)
        return response
    }
}
