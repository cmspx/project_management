<template>
    <!-- 一个form表单和登录按钮，点击按钮将form表单提交到后端 -->
    <!-- status-icon表单校验时的图标，rules表单校验 ，label-width名称宽度-->
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
        <!-- 标题 -->
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 按钮被表单域包裹 -->
        <el-form-item class="login-submit">
            <el-button type="primary" @click="login" class="login-submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// mock模拟生成token
import Mock from 'mockjs'
import { getMenu } from '../../api/data'

export default {
    name: 'login',
    data() {
        return{
            form: {

            },
            // 定义表单校验
            rules: {
                // 两个字段，分别定义校验内容
                username: [
                    // 必填，如果校验不通过给提示，触发方式blur
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    // 长度限制
                    {
                        min: 3,
                        message: "用户名长度不能小于3位",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        login() {
            getMenu(this.form).then(({data: res}) => {
                console.log(res);
                if(res.code === 20000) {
                    // 清除当前路由
                    this.$store.commit('clearMenu')
                    // 设置menu并传递数据
                    this.$store.commit('setMenu', res.data.menu)
                    // 拿到token并设置
                    this.$store.commit('setToken', res.data.token)
                    // 给不同的账号配置不同的菜单权限，设置动态路由并传入router实例
                    this.$store.commit('addMenu', this.$router)
                    // 进行路由跳转
                    this.$router.push({ name: 'home' })
                } else {
                    // 抛出异常，直接warning显示res.data.message的异常信息
                    this.$message.warning(res.data.message)
                }
            })
            // 生成随机数模拟后端返回的token
            // const token = Mock.random.guid()
            // // 将生成的token设置
            // this.$store.commit('setToken', token)
            // this.$router.push({ name: 'home' })
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    border-radius: 15px;
    // 背景裁剪的内边距
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    // 阴影
    box-shadow: 0 0 25px #cac6c6;
}

.login-title {
    margin: 0px auto 40px auto;
    // 居中
    text-align: center;
    color: #505458;
}

.login-submit {
    margin: 10px auto 0px auto;
}
</style>