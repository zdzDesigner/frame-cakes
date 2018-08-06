## 小部件


### resource 请求封装

> 差值参数

```js 
region_post:{
    post:'./region/update?id={id}',
}
配置中参数规则
{id} => 参数必填
{id:3} => 默认参数
{id:} => 默认为空,region_post({}) 映射的接口为 => ./region/update
```

> payload 请求方式

1. application/json
2. application/x-www-form-urlencoded

payload:Boolean , default:true

```js 
region_post:{
    post:'./region/update?id={id}',
    payload:false
}
```

> withCredentials 跨域携带凭证 

withCredentials:Boolean , default:false

```js 
region_post:{
    post:'./region/update?id={id}',
    payload:false
}
```

> abort 中断请求

当重复发送请求时，中断未响应的请求（但保留最后一个请求）

payload:Boolean , default:false

```js 
region_post:{
    post:'./region/update?id={id}',
    abort:true
}
```

>compile

是否对url做编译

payload:Boolean , default:true

```js
export default {
    user_list:{
        get:'./user/list?aaa={bbb}'
        compile:false
    }
}
```
**生成 => Request URL:you root/user/list?aaa={bbb}**


>model 中 api 根路径配置 (ROOT)

axios全局配置在config mock中 *axios.defaults.baseURL*

有时期望特殊配置 如下
```js
export default {
    ROOT:'http://www.baidu.com/console',
    user_list:{
        get:'./user/list'
    },
    user_list2:{
        get:'../user/list'
    }
}
```
*user_list生成 => Request URL:http://www.baidu.com/console/user/list*
*user_list2生成 => Request URL:http://www.baidu.com/user/list*


### schema 配置

> 目的：为了解决服务端返回数据不可信问题
> 业务场景如下
>> 需要的字段类型是 plan object=>{},但是服务端返回null,或其他基本类型，获取属性时出现 the_key is not defined 错误，导致页面 block；plan array => [] ,场景和 object 一致

> 处理，根据以上经常出现的问题，做了如下两步主要处理
>>  1. 抛错：抛出 warn 警告

>>  2. 重写：定义的类型重写到返回字段中
![avatar](https://gitlab.spetechcular.com/aife/aife-vue-base/tree/release/0.5.0-alpha.5/assets/readme/schema_warn.png)

> 服务端返回的JSON对象 数据类型如下：
>>  引用类型：Object=> {}、Array=> []

>>  基本类型：String、Number、Boolean

> 规则：添加验证规则的字段开启验证，未添加的忽略验证
>>  如下接口，在文档中有company字段，但验证规则中未添加company字段，则忽略company验证

```js
export default {
    ...
    user_list:{
        get:'./user/info',
        // 这里既是schema配置
        schema:{
            data:{
                user:{
                    name:String
                },
                currentPermission:[Number],
                groupList:[{
                    companyId:Number,
                    companyName:String,
                    companyShortName:String
                    ...
                }]

            }
        }
    }
    ...
}
```



### local 封装




### 鉴权封装

由于服务端权限半小时失效，后续 token 从拦截器中刷新；固升级 aife-vue-base@0.2.6 版本
版本中添加3个api 分别为 权限初始、更新、销毁
auth.init()    
auth.update()
auth.destroy()

## bns 业务
**0.3.09** 登出跳转匹配域和cookie清除域判断
> tg 2018.05.30

**0.3.12** 登出时如果传入参数true将不再记住当前地址
> tsz 2018.06.11 

## 构建
### 构建封装

**0.3.10** 添加 babel-include-loader
> zdzDesigner 2018.06.06 
> https://www.npmjs.com/package/babel-include-loader

**0.3.10** proxy-mock 启动调整 exec => spawn
> zdzDesigner 2018.06.07 
> 解决服务自动挂断问题

**0.3.11** babel-loader 添加exclude,释放 .babelrc ignore配置
> zdzDesigner 2018.06.11 
> build/base.config.js 

暂时删除：vue-loader 中对 node_modules 中的源文件开启babel编译

**0.3.14** 去除code为4011时的3秒延迟

**0.4.0** 构建中添加 proxy-mock 配置，可配置多域名
> zdzDesigner 2018.07.01
> build/develop.config.js 

**0.4.3** fixbug api配置中 'log.php' => 'log.php/undefined' 问题
> zdzDesigner 2018.07.11 
> util/parse/parseURL

**0.5.0-alpha.0** webpack develop 拆分子进程
> zdzDesigner 2018.07.13
> build/develop.config.js 

**0.5.0-alpha.4** proxy-mock (window system & to @@)
> zdzDesigner 2018.08.01
> build/service/proxy-mock.js 

**0.5.0-alpha.5** api schema
> zdzDesigner 2018.08.03
> model/resource/schemer.js








