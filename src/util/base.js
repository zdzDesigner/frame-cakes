import Vue from 'vue'

const merge = Vue.util.mergeOptions
const urlTpl = function(){}


function getType(val,type){
    return Object.prototype.toString.call(val) == `[object ${type}]`
}

const isObject = (val)=> getType(val, 'Object')
const isFunction = (val)=> getType(val, 'Function')

/**
 * [mergeMulti description]
 * mergeMulti({},{name:'zdz'},{age:33})
 */
const mergeMulti = function(data,...args){
    data = data ||{}
    return args.reduce(function(pending,item){
        return merge(pending,item)
    },data)
}



/**
 * [deep json递归器]
 * @param  {[type]}   val [description]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
function deep(val, cb){
    if(Array.isArray(val)){
        return val.map((item)=>deep(item, cb))
    }else if(isObject(val)){
        return Object.keys(val)
                .reduce((pend, key)=>{
                    pend[key] = deep(val[key], cb)
                    return pend
                },{})
    }else{
        return cb(val)
    }
}





export default {
    isFunction,
    isObject,
    merge,
    mergeMulti,
    urlTpl,
    deep
}