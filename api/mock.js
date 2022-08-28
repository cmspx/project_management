// 引入mock
import Mock from 'mockjs'
// 模块方式引入回调函数，将所有的mock数据定义在mockServeData
import homeApi from './mockServeData/home'

import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

// 拦截器的规则
// 确切的url地址或匹配的正则规则
// 接收一个回调函数，是返回的具体数据，这里调用getStatisticalData
Mock.mock('/home/getData', homeApi.getStatisticalData)

// 正则的方式
// 新增用户
Mock.mock(/user\/add/, 'post', userApi.createUser)
// 编辑用户
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

// 表格获取用户列表
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)

// 删除用户
Mock.mock(/user\/del/, 'post', userApi.deleteUser)

// 权限
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
