function getRedirectUrl () {
  const baseUrl =  window.location.host;
  let redirectUrl = '';

  if (baseUrl.indexOf('dui.ai') > -1) {
    let mainUrl
    let _rgls = /(review\.dui\.ai)|(dev\.dui\.ai)|(t\.dui\.ai)|(stable\.dui\.ai)|(beta\.dui\.ai)|(dui\.ai)/g.exec(baseUrl)
    if (!_rgls) {
      console.log('域名有误，没有匹配到！')
    } else {
      mainUrl = _rgls[0]
    }
    redirectUrl = `http://authentication.${mainUrl}/?service=${encodeURIComponent(location.href)}#/pc/login/commons`
  } 
  return redirectUrl
}

export default {
  getRedirectUrl
}
