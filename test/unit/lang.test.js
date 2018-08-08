const expect = require('chai').expect
const { isType, isObject, isFunction, CTS } = require('../../lib/util/lang.js')


describe('isType 类型检测', function() {
    
    let collection = [
        {type:'Object',value:{name:'obj'}},
        {type:'Number',value:3},
        {type:'String',value:'aaa'},
        {type:'Boolean',value:false}]    

    collection.forEach(function(item){
        it(`${JSON.stringify(item.value)} 是 ${item.type} 类型`, function() {
            expect(isObject(item.type, item.value)).to.be.equal(false)
        })
    })
    
})

describe('isObject 类型检测', function() {

    it('{} 是 object类型', function() {
        expect(isObject({})).to.be.equal(true)
    })
    let collection = [3, 'aaa', false]    
    collection.forEach(function(item){
        it(`${JSON.stringify(item)} 不是 object类型`, function() {
            expect(isObject(item)).to.be.equal(false)
        })
    })
    
})

describe('isFunction 类型检测',function(){
    it('Function 是 isFunction 类型', function() {
        expect(isFunction(Function)).to.be.equal(true)
    })
    let collection = [3, 'aaa', false, {name:'object'}]    
    collection.forEach(function(item){
        it(`${JSON.stringify(item)} 不是 isFunction 类型`, function() {
            expect(isFunction(item)).to.be.equal(false)
        })
    })
})


describe('CTS construct to string',function(){
    let collection = [String, Number, Boolean, Array, Object]
    collection.forEach(function(item){
        it(`${item.name} 类型转换为 ${JSON.stringify(item.name)}`,function() {
            expect(CTS(item)).to.be.equal(item.name)
        })    
    })
    
})
