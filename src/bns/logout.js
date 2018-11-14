import local from '../model/local'
// import util from '../util'
import redirect from './redirect.js'
import { primaryDomain } from './domain'

export default function(notRememberUrl){
  // let host = util.parseURL(location.href).host;
  // let _rgls = /(review\.dui\.ai)|(dev\.dui\.ai)|(t\.dui\.ai)|(stable\.dui\.ai)|(beta\.dui\.ai)|(dui\.ai)/g.exec(host)

  // if (!_rgls) {
  //     console.log('域名有误，没有匹配到！')
  // } else {
  //   host = _rgls[0]
  // host = host.replace(/^www\./,'')
  
  local.$cookie.clear('TOKEN')
  local.$cookie.clear('TOKEN',{ domain : '.'+  primaryDomain})
  local.$cookie.clear('groupKey')
  local.$cookie.clear('groupKey',{ domain : '.'+ primaryDomain })
  location.href = redirect.getRedirectUrl(notRememberUrl)    
  // }
}

