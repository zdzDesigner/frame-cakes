import Vue from 'vue'


const merge = Vue.util.mergeOptions
const urlTpl = function(){}



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
    merge,
    mergeMulti,
    urlTpl
}