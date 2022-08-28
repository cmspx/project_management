<template>
    <el-container style="height: 100%">
        <!-- aside的宽度为自适应的 -->
        <el-aside width="auto">
            <!-- 引入后进行使用，改名字 -->
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <el-header>
                <common-header></common-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<!-- 使用less语法，要进行引入 -->
<style lang="less" scoped>
    .el-header {
        background-color: black;
    }

    .el-main {
        padding-top: 0;
    }
</style>
<script>
// 引入aside组件
import CommonAside from '../src/components/CommonAside.vue'
// 引入header组件
import CommonHeader from '../src/components/CommonHeader.vue'

export default {
    name: 'Home',
    components: {
        // 引入aside
        CommonAside,
        // 引入header
        CommonHeader
    },
    data() {
        return {}
    }
}
</script>
