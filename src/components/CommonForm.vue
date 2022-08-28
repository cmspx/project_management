<template>
    <!-- :model双向绑定传入的form数据 -->
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
        <!-- 表单域 -->
        <!-- 循环传入的配置 -->
        <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
            <!-- 根据配置渲染出对应的表单元素 -->
            <!-- 如果type是input，就渲染出input组件 -->
            <el-input v-if="item.type === 'input'" :placeholder="'请输入' + item.label" v-model="form[item.model]"></el-input>
            <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
            <el-date-picker v-if="item.type === 'date'" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form[item.model]"></el-date-picker>
            <el-select v-if="item.type === 'select'" placeholder="请选择" v-model="form[item.model]">
                <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <!-- 给其他需要的组件预留位置 -->
            <slot></slot>
        </el-form-item>
    </el-form>
</template>

<script> 
export default {
    name: 'CommonForm',
    // 接收属性
    props: {
        // 接收form的相关配置
        formLabel: Array,
        // 接收form数据，从父组件传递进并进行双向绑定
        form: Object,
        // 布局
        inline: Boolean
    },
    data() {
        return {}
    }
}
</script>