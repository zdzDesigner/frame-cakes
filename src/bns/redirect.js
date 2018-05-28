function getRedirectUrl () {
    const baseUrl =  window.location.host;
    let redirectUrl = '';
  
    if (baseUrl.indexOf('dui.ai') > -1) {
        let mainUrl = baseUrl.replace(/^(www.|www.data.|data.)/, '')
        
        redirectUrl = `http://authentication.${mainUrl}/?service=${encodeURIComponent(location.href)}#/pc/login/commons`
    } 
    return redirectUrl
}

export default {
    getRedirectUrl
}
