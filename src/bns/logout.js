import local from '../model/local'
import util from '../util'
import redirect from './redirect.js'

export default function(){
    local.$cookie.clear('TOKEN')
    local.$cookie.clear('TOKEN',{ domain : '.'+ util.parseURL(location.href).host })
    local.$cookie.clear('groupKey')
    local.$cookie.clear('groupKey',{ domain : '.'+ util.parseURL(location.href).host })
    location.href = redirect.getRedirectUrl()    
}

