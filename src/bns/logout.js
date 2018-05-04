import local from '../model/local'
import util from '../util'
import redirect from './redirect.js'

export default function(){
	let host = util.parseURL(location.href).host;
	host = host.replace(/^www\./,'')

    local.$cookie.clear('TOKEN')
    local.$cookie.clear('TOKEN',{ domain : '.'+  host})
    local.$cookie.clear('groupKey')
    local.$cookie.clear('groupKey',{ domain : '.'+ host })
    location.href = redirect.getRedirectUrl()    
}

