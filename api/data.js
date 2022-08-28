// 接口请求写在该文件内

// 引入axios工具类
import axios from './axios'

// 接口调用，调用接口时传入参数param
export const getMenu = (param) => {
    // 调用时直接拿到axios的request方法，调用request是会传入一个对象，这个对象就是传入的相关配置和参数
    return axios.request({
        // 传入的相关配置
        // 这里的url是接口的相关地址，定义名字
        url: '/permission/getMenu',
        // 定义接口类型
        method: 'post',
        // data作为传入参数
        data: param
    })
}

export const getData = () => {
    return axios.request({
        // url是mock中的rurl，默认为get请求
        url: '/home/getData',
        method: 'get'
    })
}

// 调用getUserList
export const getUser = (params) => {
    return axios.request( {
        url: '/user/getUser',
        method: 'get',
        // 传递参数
        params
    } )
}
