import local from '../model/local'
import { primaryDomain } from './domain'
// import util from '../util'

export default function(){
	// let host = util.parseURL(location.href).host;
	// host = host.replace(/^www\./,'')

    local.$cookie.clear('groupKey')
    local.$cookie.clear('groupKey',{ domain : '.'+ primaryDomain })
    location.href = location.origin + '/console/assets/errors/index.html#/404'
}