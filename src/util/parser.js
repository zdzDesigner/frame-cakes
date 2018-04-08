function parseURL(url){
  let parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9._\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  let result = parse_url.exec(url)
  return ['url', 'scheme', 'slash','host', 
          'port', 'path', 'query', 'hash']
         .reduce((obj, field, index)=>{
            let ret = result[index]
            if('path'==field) ret = '/'+ret
            obj[field] = ret
            return obj
         },{})
}

function filterNull(query){
  return query&&query.split('&').filter((item)=>{
    let arr = item.split('=')
    if(arr[1]) return true
  }).join('&')
}
/**
 * [parseText 编译标示符]
 * @param  {[type]} text [v1classes{userid}audio-upload]
 * @param  {[type]} obj [{userid:aaa}]
 * @return {[type]}     [v1classesaaaaudio-upload]
 */
function parseText(text,obj){
    obj = obj || {}
    let url = text.replace(/(\{.*?\})/g,function(...arg){
        let key = arg[0].replace(/[\{|\}]/g,'').trim()
        // console.log(obj,key)
        let keyArr = key.split(':') 
        let keyVal = obj[keyArr[0]]
        let val =  typeof(keyVal) != 'undefined' 
                    ? keyVal 
                    : keyArr[1]
        // let val =  obj[keyArr[0]] || keyArr[1]
        if(typeof val === 'undefined') throw new Error(`在${text}中,参数${key}未赋值`)          
        
        // console.log('val',val)
        return val
    })
    // console.log('url',parseURL(url))
    let ourl= parseURL(url)
    // console.log(ourl.host,ourl.path,filterNull(ourl.query))
    let urlArr = [ourl.host,ourl.path]
    let query = filterNull(ourl.query)
    if(query) urlArr = urlArr.concat(['?',filterNull(ourl.query)])

    return urlArr.join('')

}




export default  {
  parseURL,
  parseText
}
