import local from '../model/local'
import util from '../util'
import redirect from './redirect.js'

export default function(){
  let host = util.parseURL(location.href).host;
  let _rgls = /(review\.dui\.ai)|(dev\.dui\.ai)|(t\.dui\.ai)|(stable\.dui\.ai)|(beta\.dui\.ai)|(dui\.ai)/g.exec(host)
  if (!_rgls) {
      console.log('域名有误，没有匹配到！')
  } else {
    host = _rgls[0]
    local.$cookie.clear('TOKEN')
    local.$cookie.clear('TOKEN',{ domain : '.'+  host})
    local.$cookie.clear('groupKey')
    local.$cookie.clear('groupKey',{ domain : '.'+ host })
    location.href = redirect.getRedirectUrl()    
  }
}

