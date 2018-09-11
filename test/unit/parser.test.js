const expect = require('chai').expect

const { parseURL, compilerText, validURLQuery, compilerURL } = require('../../lib/util/parser.js')

global.APP_ENV = 'dev'
console.log({compilerURL})

describe('parseURL 解析URL',function () {

    /**
     *  new URL() api
     *  TODO:: 
     *      hash:"#get-user"
     *      host:"www.baidu.com:8000"
     *      hostname:"www.baidu.com"
     *      href:"http://zdz:qaz@www.baidu.com:8000/u?id=2323#get-user"
     *      origin:"http://www.baidu.com:8000"
     *      password:"qaz"
     *      pathname:"/u"
     *      port:"8000"
     *      protocol:"http:"
     *      search:"?id=2323"
     *      username:"zdz"
     */

    // console.log(parseURL('http://www.baidu.com:8000?id=2323#get-user'))
    it('http://www.baidu.com:8000/api/v1/user/info?id=2323#get-user',function(done){
        let urlobj = { 
            url: 'http://www.baidu.com:8000/api/v1/user/info?id=2323#get-user',
            scheme: 'http',
            slash: '//',
            host: 'www.baidu.com',
            port: '8000',
            path: '/api/v1/user/info',
            query: 'id=2323',
            hash: 'get-user' 
        }
        let url = 'http://www.baidu.com:8000/api/v1/user/info?id=2323#get-user'
        Object.keys(urlobj).forEach(function(key){
            expect(parseURL(url)[key]).to.be.equal(urlobj[key])    
        })

        
        done()
    })

    it('http://www.baidu.com/api/v1/user/info?id=2323#get-user',function(done){
        let urlobj = { 
            url: 'http://www.baidu.com/api/v1/user/info?id=2323#get-user',
            scheme: 'http',
            slash: '//',
            host: 'www.baidu.com',
            port: undefined,
            path: '/api/v1/user/info',
            query: 'id=2323',
            hash: 'get-user' 
        }
        let url = 'http://www.baidu.com/api/v1/user/info?id=2323#get-user'

        Object.keys(urlobj).forEach(function(key){
            expect(parseURL(url)[key]).to.be.equal(urlobj[key])    
        })
        
        done()
    })


   
    
})

describe('validURLQuery 有效的url query', function(){
    it('获取有效的url query',function(){
        expect(validURLQuery('name=zdz&age')).to.be.equal('name=zdz')
        expect(validURLQuery('name=zdz&age=')).to.be.equal('name=zdz')
        expect(validURLQuery('?name=zdz&age')).to.be.equal('?name=zdz')
        expect(validURLQuery('?name=zdz&age=')).to.be.equal('?name=zdz')
    })
})

describe('compilerText 文本编译',function(){
    it('raw: hello {xx} ,{xx:"world"} => hello world',function(){
        expect(compilerText('hello {xx}', {xx:'world'})).to.be.equal('hello world')
    })
    it('默认值 raw: hello {xx:zdz} => hello zdz',function(){
        expect(compilerText('hello {xx:zdz}')).to.be.equal('hello zdz')
    })
})


describe('compilerURL 测试',function(){
    
    it('compilerURL raw to ripe',function(done){
        let raw = 'api/v1.0/knowledgeSkill/talkinggenius/?page={page}&size={size}&templateId={templateId:}'
        let ripe ='api/v1.0/knowledgeSkill/talkinggenius/?page=10&size=20'
        expect(compilerURL(raw, {page:10,size:20})).to.be.equal(ripe)
        let ripe2 ='api/v1.0/knowledgeSkill/talkinggenius/?page=10&size=20&templateId=232243'
        expect(compilerURL(raw, {page:10,size:20,templateId:232243})).to.be.equal(ripe2)
        done()
    })
})