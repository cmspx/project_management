import Vue from 'vue'
import App from './App.vue'
//全局引入element-ui
import ElementUI, { MessageBox } from 'element-ui';
// 按需引入
// import { Button, Container, Main, Header, Aside } from 'element-ui';
// 引入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css';

// index中已经全部引入，这里只需引入index.less即可
import './assets/less/index.less'

// 引入vue-router，在根目录中创建router文件夹专门管理路由
import router from '../router'
// 引入vue-store，创建store文件夹，管理vuex的相关配置
import store from '../store'
// 全局引入axios
import http from 'axios'
// 引入mockjs
import '../api/mock.js'

Vue.config.productionTip = false

// 通过use函数，将element-ui进行注入
Vue.use(ElementUI);
// Vue.use(Button)
// Vue.use(Container)
// Vue.use(Main)
// Vue.use(Header)
// Vue.use(Aside)

// axios不是插件，在全局中想使用需要绑定在vue的prototype属性上
Vue.prototype.$http = http
// 将confirm方法绑定到Vue上
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message

// 路由监听，接收三个参数
router.beforeEach((to, from, next) => {
  // 导航守卫的逻辑
  // 获取token信息，防止页面刷新后vuex丢失token信息
  store.commit('getToken')
  const token = store.state.user.token
  // 如果token不存在且非登录页，则无法进入
  if(!token && to.name !== 'login') {
    next({ name: 'login'} )
  } else if (token && to.name === 'login'){
    next({ name: 'home'})
  } else {
    next()
  }
})

new Vue({
  // 导航栏是否展开，根据CommonAside内的el-menu的isCollapse实现，true为折叠，false为展开，而控制展开的按钮在CommonHeader内，于是就出现兄弟组件之间的相互通信问题，通过vuex进行事件通讯
  store:store,
  // 路由
  router,
  render: h => h(App),
  // 生命周期
  created() {
    // 调用动态设置路由的方法，解决home白屏问题
    store.commit('addMenu', router)
  }
}).$mount('#app')
