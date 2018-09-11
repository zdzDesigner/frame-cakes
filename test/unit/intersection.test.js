const expect = require('chai').expect
const {intersection} = require('../../lib/util/intersection.js')



describe('intersection 取数组交集', function(){
    it('取数组交集', function(){
        let a = ['sdf','b','we','dd']
        let b = ['sdf','we','ee']
        let res = ['sdf','we']
        expect(intersection(a, b).join()).to.be.equal(res.join())
    })
})