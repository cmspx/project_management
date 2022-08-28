// 储存token文件
// 给系统添加登录凭证为token，这个token在登录的时候通过接口请求将用户名和密码传给后端，后端在数据库中匹配成功后返回一个凭证，前端依赖js-cookie库将token缓存起来，再调用接口时传给后端验证就建立了登录权限校验

import Cookie from 'js-cookie'

export default {
    state: {
        token: ''
    },
    // 用于改变token
    mutations: {
        // 设置token
        setToken(state, val) {
            state.token = val
            // 缓存token，在cookie中生成数据
            Cookie.set('token', val)
        },
        // 清除cookie
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        // 获取token
        getToken(state) {
            // 需要判断，若当前state中有token则直接获取，若没有则从cookie中获取
            state.token = state.token || Cookie.get('token')
        }
    }
}