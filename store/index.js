import Vue from 'vue'
import Vuex from 'vuex'
// store下新建tab.js文件，控制是否需要展开的state属性
import tab from './tab'
import user from './user'

// 将vuex进行全局注入
Vue.use(Vuex)

// 要设置store中的state，需要通过modules的方式将不同模块的store进行引入
// 将store对外暴露
export default new Vuex.Store ({
    // 用模块的方式定义store
    modules: {
        // 定义两个模块
        tab,
        user
    }
})