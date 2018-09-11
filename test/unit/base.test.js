const expect = require('chai').expect
const { hasCnStr, textTruncate, mergeMulti } = require('../../lib/util/base.js')



describe('hasCnStr 判断字符串中是否含有中文',function(){
    let collection = [  
        {test:'hello 大柱',res:true},
        {test:'hello zdz',res:false}]
    collection.forEach(function(item){
        it(`${JSON.stringify(item.test)} 中${item.res?'含有':'无'}中文`,function(){
            expect(hasCnStr(item.test)).to.be.equal(item.res)
        })    
    })           
    
})


describe('textTruncate 字符溢出加点...（不区分中英文） ',function(){

    it('"今天天气很好" 限制三个字符 => "今天天..."', function(){
        expect(textTruncate('今天天气很好',3)).to.be.equal('今天天...')
    })

    it('"The weather is good today" 限制三个字符 => "The..."',function(){
        expect(textTruncate('The weather is good today',3)).to.be.equal('The...')
    })
    let collection = [undefined, null, '']
    collection.forEach(function(item){
        it(`${JSON.stringify(item)} 限制三个字符 => ""`, function(){
            expect(textTruncate(item,3)).to.be.equal('')
        })
    })
})


describe('mergeMulti 多个 object 浅合并',function(){
    let obj1 = {name:'zdz'} 
    let obj2 = {work:'do something'}
    let obj3 = {play:'荣耀'}
    let oobj = {
        name:'zdz',
        work:'do something',
        play:'荣耀'
    }
    it(`${JSON.stringify(obj1)} 合并 ${JSON.stringify(obj2)} 合并 ${JSON.stringify(obj3)}`, function(done) {
        // expect(mergeMulti({}, obj1, obj2, obj3)).
        let nobj = mergeMulti({}, obj1, obj2, obj3)
        Object.keys(nobj).forEach(function(key){
            expect(oobj[key]).to.be.equal(nobj[key])
        })

        done();
    })
})

