<template>
    <!-- gutter栅格间隔，每一行总共分为多少个栅格 -->
    <el-row class="home" :gutter="20">
        <!-- span，所占用当前行的栅格数 -->
        <!-- 左侧区域 -->
        <el-col :span="8" style="margin-top: 20px">
            <!-- 使用element-ui中card组件。shadow表示当前阴影显示状态，hover，悬浮时有阴影 -->
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登陆时间：<span>2022-8-22</span></p>
                    <p>上次登陆地点：<span>北京</span></p>
                </div>
            </el-card>

            <!-- 使用el-card将table放入其中 -->
            <el-card style="margin-top: 20px; height: 460px">
                <!-- data为要接收的数据，后用mock模拟数据 -->
                <el-table :data="tableData">
                    <!-- 通过遍历方式把列渲染出来 -->
                    <!-- 用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名 -->
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 右侧区域 -->
        <el-col style="margin-top: 20px" :span="16">
            <!-- 数据区域 -->
            <div class="num">
                <!-- 数据暂时写死，循环遍历 -->
                <!-- name作为唯一key值 -->
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <!-- 添加动态class，根据icon选择需要渲染的图标。es6语法，模拟字符串 -->
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num">¥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <!-- 图表区域 -->
            <!-- 折线图 -->
            <el-card style="height: 280px">
                <div style="height: 280px" ref="echarts"></div>
            </el-card>
            <div class="graph">
                <!-- 柱状图 -->
                <el-card style="height: 260px">
                    <div style="height: 240px" ref="userEcharts"></div>
                </el-card>
                <!-- 饼图 -->
                <el-card style="height: 260px">
                    <div style="height: 240px" ref="videoEcharts"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
// 引入data.js，解构出getMenu方法
// import { getMenu } from '../../api/data.js'
// 引入mockjs
import { getData } from '../../api/data.js'
// 引入echarts
import * as echarts from 'echarts'

export default {
    name: 'home',
    data() {
        return {
            userImg: require('../../src/assets/images/user.png'),
            // 表格中数据，后用mock模拟
            tableData: [
                // {
                //     name: 'oppo',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // },
                // {
                //     name: '苹果',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // },
                // {
                //     name: '小米',
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800
                // }
            ],
            // 每列，先在此定义再用遍历渲染到页面
            tableLabel: {
                name: '品牌',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                }
            ]
        }
    },
    // 接口请求一般写在mounted下
    mounted() {
        // 调用getMenu方法，通过then拿到响应
        // getMenu().then(res => {
        //     console.log(res);
        // })
        getData().then(res => {
            // 将res里data中的code和data解构
            const { code, data } = res.data
            // 正常接口访问时拿到数据，可以从mock里直接将tableData取出
            if (code === 20000) {
                // 赋值给tableData，可以将前面tableData改为空数组
                this.tableData = data.tableData

                // 拿到数据
                const order = data.orderData
                const xData = order.date
                // 拿到图例，传入数组第一项，返回所传对象的key。keyArray就是key值集合
                const keyArray = Object.keys(order.data[0])
                // 组装series数据
                const series = []
                // 遍历，添加到series数组
                keyArray.forEach(key => {
                    series.push({
                        // name就是图例，也就是key值
                        name: key,
                        // data对应图例数据，遍历每一项，将每一项对应的key值的值返回
                        data: order.data.map(item => item[key]),
                        // 折线图
                        type: 'line'
                    })
                })
                // 组装option
                const option = {
                    xAxis: {
                        // x坐标的值
                        data: xData,
                    },
                    yAxis: {},
                    // 图例
                    legend: {
                        data: keyArray
                    },
                    series
                }

                // 初始化echarts，用一个变量来接收实例
                const E = echarts.init(this.$refs.echarts)
                // 绘图
                E.setOption(option)

                // 用户图
                const userOption = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                            color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        // 对data下的userData进行遍历，拿到x轴
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de"],
                    series: [
                        // 两个图例，要添加两个对象
                        {
                            name: '新增用户',
                            // 对item.new遍历
                            data: data.userData.map(item => item.new),
                            // 柱状图
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            // 对item.active遍历
                            data: data.userData.map(item => item.active),
                            // 柱状图
                            type: 'bar'
                        }
                    ],
                }
                // 初始化
                const U = echarts.init(this.$refs.userEcharts)
                U.setOption(userOption)

                // 饼图
                const videoOption = {
                    tooltip: {
                        trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: [
                        {
                            data: data.videoData,
                            // 饼图
                            type: 'pie'
                        }
                    ],
                }
                const V = echarts.init(this.$refs.videoEcharts)
                V.setOption(videoOption)
            }
            console.log(res);
        })
    }
}
</script>