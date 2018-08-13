const expect = require('chai').expect
const {isMatch, compiler, creater, looper, schemer} = require('../../lib/model/resource/schemer.js')

console.log({isMatch,compiler, creater, looper, schemer})

describe('schemer 测试', function () {
    it('isMatch construct and instance', function(done){
        expect(isMatch(String,'a')).to.be.equal(true)
        expect(isMatch(Number,1)).to.be.equal(true)
        expect(isMatch(Boolean,false)).to.be.equal(true)
        expect(isMatch(Object,{})).to.be.equal(true)
        expect(isMatch(Array,[])).to.be.equal(true)
        done()
    })

    it('compiler 简单类型编译', function(done){
        
        let idata = compiler({name:String,list:[Number,String]},true,'zdz')
        expect(idata.name).to.be.equal('String')
        expect(idata.list.join(',')).to.be.equal('Number,String')
        done()
    })
    
})
