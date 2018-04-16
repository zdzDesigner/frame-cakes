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



export default {
    isFunction,
    isObject,
    merge,
    mergeMulti,
    urlTpl
}