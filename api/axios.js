// axios工具类

// 引入axios
import axios from 'axios'
// 引入配置文件
import config from '../config'

// 对当前环境变量进行判断
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// 写axios的工具类，es6的class语法
class HttpRequest {
    constructor(baseUrl) {
        // 将baseUrl添加到当前实例的baseUrl属性上
        this.baseUrl = baseUrl
    }
    // 定义axios相关配置
    getInsideConfig() {
        // 定义配置的初始值
        const config = {
            baseUrl: this.baseUrl,
            // header是请求头的信息
            header: {}
        }
        return config
    }
    // 拦截器相关
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    // 后续进行接口请求时调用request函数，此函数接收传入的相关配置
    request(options) {
        // 对axios进行实例的创建
        const instance = axios.create()
        // options是传入的相关参数，拿到当前对象并进行解构
        options = {...this.getInsideConfig(), ...options}
        // 调用拦截器，将创建的axios实例传入
        this.interceptors(instance)
        return instance(options)
    }
}

// 对外暴露类的实例
// 传入url地址
export default new HttpRequest(baseUrl)