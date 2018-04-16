import util from '../util'
import local from '../model/local'



export default function auth(aop){

    return function (response) {
        // console.log(response.data)
        if(response.data.code == '103108' || response.data.code == '103144'){
            local.$cookie.clear('TOKEN')
            local.$cookie.clear('TOKEN','.'+ util.parseUrl(location.href).host)
            local.$cookie.clear('groupKey')
            local.$cookie.clear('groupKey','.'+ util.parseUrl(location.href).host)
            location.href = util.getRedirectUrl()
        }
        util.isFunction(aop) && aop(response)
        return response
    }
}
