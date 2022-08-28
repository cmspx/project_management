<template>
    <div class="common-table">
        <!-- data接收table的数据，stripe使table展现斑马条纹样式 -->
        <el-table :data="tableData" height="90%" stripe>
            <!-- show-overflow-tooltip表示如果当前列超长会用tooltip显示超长部分 -->
            <!-- 每个列通过配置将数据传组件中，拿到数据后渲染出所对应的列 -->
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : 125">
                <!-- 自定义接收传入过来的配置 -->
                <!-- slot-scope接收传入的插槽里的相关数据 -->
                <template slot-scope="scope">
                    <!-- 显示slot传入的数据 -->
                    <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <!-- 触发click事件时需要把当前行的数据传递进,才能使弹窗内有内容 -->
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- :total从props进行传入，总的数据数量，current-change改变分页数时有一个回调函数，page-size分页数的默认值 -->
        <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20"></el-pagination>
    </div>
</template>
<script>
export default {
    name: 'CommonTable',
    // 数据由外部传入，props接收父组件传递的属性
    props: {
        tableData: Array,
        // 拿到数据
        tableLabel: Array,
        config: Object
    },
    data() {
        return {}
    },
    methods: {
        // 点击对应的编辑、删除、分页切换事件时都会触发，将事件通过emit向上抛出，通知父组件此时已经触发了对应的事件，并将数据传递到父组件
        handleEdit(row) {
            this.$emit('edit', row)
        },
        handleDelete(row) {
            this.$emit('del', row)
        },
        changePage(page){
            this.$emit('changePage', page)
        }
    }
}
</script>
<style lang="less" scoped>
.common-table {
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .pager {
        position: absolute;
        // 位于底部
        bottom: 0;
        right: 20px;
    }
}
</style>