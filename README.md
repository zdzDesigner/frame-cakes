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




### local 封装




### 鉴权封装

由于服务端权限半小时失效，后续 token 从拦截器中刷新；固升级 aife-vue-base@0.2.6 版本
版本中添加3个api 分别为 权限初始、更新、销毁
auth.init()    
auth.update()
auth.destroy()

## bns 业务
**登出跳转匹配域和cookie清除域判断**
> tg 2018.05.30

**登出时如果传入参数true将不再记住当前地址**
> tsz 2018.06.11 

## 构建
### 构建封装

**添加 babel-include-loader**
> zdzDesigner 2018.06.06 
> https://www.npmjs.com/package/babel-include-loader

**proxy-mock 启动调整 exec => spawn**
> zdzDesigner 2018.06.07 
> 解决服务自动挂断问题



