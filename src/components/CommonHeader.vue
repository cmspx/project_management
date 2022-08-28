<template>
    <header>
        <!-- 靠左、靠右通过flex布局实现 -->
        <div class="l-content">
            <!-- plain为镂空 -->
            <!-- click控制是否展开 -->
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑，使用element-ui中的面包屑组件 -->
            <!-- <h3 style="color:#fff">首页</h3> -->
            <el-breadcrumb separator="/">
                <!-- 遍历tags，路径为tags的path，名称为tags的 -->
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <!-- 引入element-ui的dropdown -->
            <el-dropdown trigger="click" size="mini">
                <span>
                    <!-- 点击头像出下拉菜单，将头像动态引入 -->
                    <img class="user" :src="userImg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <!-- 组件添加click事件，需要.native -->
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
// 渲染面包屑，引入辅助函数
import { mapState } from 'vuex'

export default {
    name: 'CommonHeader',
    data() {
        return {
            // 图片url的名称，通过require获取
            userImg: require('../assets/images/user.png')
        }
    },
    methods: {
        // 导航栏是否展开
        handleMenu() {
            // 通过mutations改变store中的state
            this.$store.commit('collapseMenu')
        },
        // 登出
        logOut() {
            // 清除token
            this.$store.commit('clearToken')
            // 重置menu
            this.$store.commit('clearMenu')
            // 跳转至login
            this.$router.push("/login")
        }
    },
    computed: {
        // 面包屑：注入state中的数据
        ...mapState({
            // tags表示store中的面包屑数据
            tags: state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
header {
    // flex布局实现左右贴边以及全部居中
    display: flex;
    height: 100%;
    justify-content: space-between;
    // 上下居中
    align-items: center;
}

.l-content {
    display: flex;
    // 让左边内容内部元素上下居中
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
}

.r-content {

    // 让图片变为圆形
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>