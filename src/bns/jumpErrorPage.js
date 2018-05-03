import local from '../model/local'
import util from '../util'

export default function(){
    local.$cookie.clear('groupKey')
    local.$cookie.clear('groupKey',{ domain : '.'+ util.parseURL(location.href).host })
    location.href = location.origin + '/console/assets/errors/index.html#/404'
}
