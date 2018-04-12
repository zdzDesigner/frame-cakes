import store from 'store2'
import cookie from 'js-cookie'

/**
 * [clear 清除cookie]
 * @ 清除单个 || 全部cookie 
 * @ feature 清除 指定 domain 全部cookie
 */
cookie.clear = function(...arg){
    // const firstKey =  arg[0]
    if(!arg.length){
        let cookies = cookie.get()
        Object.keys(cookies).forEach(function(key){
            cookie.remove.call(null,key)    
        })
    }else{
        cookie.remove.apply(null,arg)    
    }
    
}

export default {
    $local:store.local,
    $session:store.session,
    $cookie:cookie
}
// console.log(Object.keys(store) 
//             ,Object.keys(store.local) 
//             ,Object.keys(store.session));