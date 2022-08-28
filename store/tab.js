import Cookie from 'js-cookie'
// import router from 'router'


// 控制是否需要展开的state属性
export default {
    // state初始状态
    state: {
        // 是否展开处理
        // 默认展开
        isCollapse: false,

        // 面包屑数据处理
        // 定义初始数据，用于存储每次点击菜单对应路由的数据，后面拿到state渲染出对应的面包屑
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        // 定义当前高亮显示对应路由的数据
        currentMenu: null,
        menu: []
    },
    // 定义改变state的方法，接收两个参数：state和所需要传入的参数
    mutations: {
        // 是否展开处理
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        
        // 面包屑数据处理
        // 用于改变tabsList数据，每次点击菜单改变tabsList
        selectMenu(state, val) {
            // 当前点击的菜单的name值是否为首页
            if(val.name !== 'home') {
                state.currentMenu = val
                // 判断当前点击的菜单在state中是否存在，如果item的name和传入的菜单数据的name相等，证明存在
                const result = state.tabsList.findIndex(item => item.name === val.name)
                // 如果不存在就添加进
                if (result === -1) {
                    state.tabsList.push(val)
                }
            } else {
                // 如果是首页则将标识进行重置
                state.currentMenu = null
            }
        },

        // 菜单权限
        setMenu(state, val) {
            state.menu = val
            // 将menu数据缓存在cookie中，避免刷新浏览器时丢失数据，第一个参数为cookie的名称，第二个参数为要存入的数据
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 动态添加菜单
        addMenu(state, router) {
            // 如果cookie中没有menu，直接返回
            if(!Cookie.get('menu')){
                return
            }
            // 将cookie中menu转为对象
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 动态添加路由，先对数据进行处理
            const menuArray = []
            // 这里的menu实际上是permission.js里的menu数组，分为有二级菜单和没有两种
            menu.forEach(item => {
                // 有二级菜单
                if(item.children) {
                    // 继续往下遍历
                    item.children = item.children.map(item => {
                        // 给它添加上component属性，本来的url是页面地址，通过拼接找到页面文件
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 动态路由的添加
            menuArray.forEach(item => {
                router.addRoute('Main', item) 
            })
        }
    }
}