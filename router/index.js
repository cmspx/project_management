import Vue from 'vue'
import VueRouter from 'vue-router'
// 直接引入对应的vue页面
// import Home from '../views/Home.vue'

// 对vue-router进行全局引入
Vue.use(VueRouter)

// 需要传入路由对应相关信息，进行配置，接收数组
const routes = [
    {
        // 按钮跳转页面
        // 对应路径首先为根目录
        path: '/',
        redirect: '/home',
        name: 'Main',
        // 使用按需引入vue页面
        component: () => import('../views/Main.vue'),
        // 配置嵌套路由
        // 动态配置路由后可删除
        children: [
            // {
            //     // 地址显示
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/home')
            // },
            // {
            //     // 用户界面
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../views/user')
            // },
            // {
            //     // 商品界面
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('../views/mall')
            // },
            // {
            //     // 其他1界面
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import('../views/other/pageOne.vue')
            // },
            // {
            //     // 其他2界面
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('../views/other/pageTwo.vue')
            // }
        ]
    },
    // 登录页面
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/login.vue')
    }
]

// 对路由进行配置，声明变量router用于接收router实例
const router = new VueRouter( {
    // 路由的匹配模式
    // mode:'history',
    // 将routers传入到router属性中
    routes
} )

// 对外进行暴露，将router传出
export default router
