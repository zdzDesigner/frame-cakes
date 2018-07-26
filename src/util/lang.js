import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'



const isType = (type, obj) => Object.prototype.toString.call(obj) == `[object ${type}]`
const isObject = (val)=> isType('Object', val)
const isFunction = (val)=> isType('Function', val)


/**
 * [CTS 获取类型字符]
 * @param {[type]} constructor [Class]
 * String => 'String'
 * Number => 'Number'
 * ...Class => 'Class'
 */
function CTS(constructor){
    constructor = constructor || ''
    return ['Number', 'String', 'Boolean', 
            'Object', 'Array'].filter((type)=>{
        return ~ constructor.toString().indexOf(type)    
    })[0]
}

/**
 * [hasCnStr 是否存在中文字符串]
 * @param  {[String]} text  [这是一个测试字符串，just a test。]
 * @return {[Boolean]}      [true]
 */
function hasCnStr (text) {
  const cn_pattern = new RegExp("[\u4E00-\u9FA5]+")
  return cn_pattern.test(text)
}

/**
 * [textTruncate 按最大长度截断文字]
 * @param  {[String]} text   [这是一个测试字符串，just a test。]
 * @param  {[Number]} maxlen [3]
 * @return {[Boolean]}       [true]
 */
function textTruncate (text, maxlen){
  if (text && text.length > maxlen) {
    return text.substring(0, maxlen) + '...'
  } else {
    return text || ''
  }
}



export default  {
  hasCnStr,
  textTruncate,
  isType,
  isObject,
  isFunction,
  isNil,
  CTS
}
