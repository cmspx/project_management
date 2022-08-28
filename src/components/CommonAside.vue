<template>
    <!-- 这里的isCollaspe是从vuex中拿到的 -->
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
        active-text-color="#ffb04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <!-- 控制系统名称是否变化需要通过isCollapse进行判断 -->
        <h3>{{isCollapse ? '后台': '通用后台管理系统'}}</h3>
        <!-- v-for进行遍历，item.path作为index和key -->
        <!-- 加入点击事件实现跳转 -->
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
            <!-- 将class进行动态拼接 -->
            <i :class="'el-icon-' + item.icon"></i>
            <!-- 将名称渲染为item.label -->
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <!-- 起一个名称 -->
            <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" index="subIndex">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border: none;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            // 控制是否展开，完成动态展开后删去
            // isCollapse: false,
            // 放入侧边栏数据
            // 动态设置后可删除
            menu: [
                // {
                //     path: '/',
                //     name: 'home',
                //     label: '首页',
                //     icon: 's-home',
                //     url: 'Home/home'
                // },
                // {
                //     path: '/mall',
                //     name: 'mall',
                //     label: '商品管理',
                //     icon: 'video-play',
                //     url: 'MallManage/MallManage'
                // },
                // {
                //     path: '/user',
                //     name: 'user',
                //     label: '用户管理',
                //     icon: 'user',
                //     url: 'UserManage/UserManage'
                // },
                // {
                //     label: '其他',
                //     icon: 'location',
                //     children: [
                //         {
                //             path: '/page1',
                //             name: 'page1',
                //             label: '页面1',
                //             icon: 'setting',
                //             url: 'Other/PageOne'
                //         },
                //         {
                //             path: '/page2',
                //             name: 'page2',
                //             label: '页面2',
                //             icon: 'setting',
                //             url: 'Other/PageTwo'
                //         }
                //     ]
                // }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 点击跳转函数
        clickMenu(item) {
            // push方法实现跳转
            this.$router.push({
                // 通过name进行跳转
                name: item.name
            })
            // 面包屑数据的处理：调用commit方法，传入mutations，并传入对应的menu数据
            this.$store.commit('selectMenu', item)
        }
    },
    // 处理数据使用computed计算属性
    computed: {
        // 渲染数据，分为有子项目和无子项目两组
        noChildren() {
            // 对数据源进行过滤，利用filter，判断若无子项目，进行返回
            return this.asyncMenu.filter(item => !item.children)
        },
        hasChildren() {
            return this.asyncMenu.filter(item => item.children)
        },
        // 拿到vuex中的state，
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
        // 拿到menu数据
        asyncMenu() {
            return this.$store.state.tab.menu
        }
    }
}
</script>