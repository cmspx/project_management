<template>
    <div class="manage">
        <!-- 点击新增弹出对话框 -->
        <!-- title判断当前为新增还是编辑 -->
        <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
            <!-- 引入CommonForm组件 -->
            <!-- formLabel从用户列表进行传入，:form="oprateForm"传入数据 -->
            <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
            <!-- 给对话框加自定义底部 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>
        <!-- 查询用户，可对CommonForm进行复用 -->
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
            <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="form">
                <!-- 搜索，通过searchFormform下的keyword -->
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
        </div>
        <!-- 引入表格组件 -->
        <!-- tableData是表格数据，tableLabel是表中列的配置数据，config分页的配置数据 -->
        <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></common-table>
    </div>
</template>
<script>
// 引入CommonForm
import CommonForm from '../../src/components/CommonForm.vue';
import CommonTable from '../../src/components/CommonTable.vue'
import { getUser } from '../../api/data'

export default {
    name: 'user',
    components: {
        // 引入CommonForm
        CommonForm,
        // 引入CommonTable
        CommonTable
    },
    data() {
        return {
            // 对话框类型
            operateType: 'add',
            // 对话框是否展开
            isShow: false,
            // 传入配置数据
            operateFormLabel: [
                {
                    model: 'name',
                    label: '姓名',
                    type: 'input'
                },
                {
                    model: 'age',
                    label: '年龄',
                    type: 'input'
                },
                {
                    model: 'sex',
                    label: '性别',
                    type: 'select',
                    opts: [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 0
                        }
                    ]
                },
                {
                    model: 'birth',
                    label: '出生日期',
                    type: 'date'
                },
                {
                    model: 'addr',
                    label: '地址',
                    type: 'input'
                }
            ],
            // form数据，在传入之后，CommonForm组件中修改表单元素时，通过双向绑定的原则修改父组件传入的数据
            operateForm: {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            },

            // 查询用户
            formLabel: [
                // 只有一个查询的input框
                {
                    model: "keyword",
                    // 默认搜索框当前为空
                    label: '',
                    type: 'input'
                }
            ],
            searchForm: {
                keyword: ''
            },
            tableData: [],
            tableLabel: [
                {
                    // 需要读取的数据中字段的名称
                    prop: "name",
                    // 列的名称
                    label: "姓名"
                },
                {
                    prop: "age",
                    label: "年龄"
                },
                {
                    prop: "sexLabel",
                    label: "性别"
                },
                {
                    prop: "birth",
                    label: "出生日期",
                    width: 200
                },
                {
                    prop: "addr",
                    label: "地址",
                    width: 320
                },
            ],
            config: {
                page: 1,
                total: 30
            }  
        }
    },
    methods: {
        // 编辑或更新后要将重新获取用户列表，将列表进行重置再次调用getList
        // 确定按钮的方法
        confirm() {
            // 先判断当前弹窗状态是新增还是编辑
            if(this.operateType === 'edit') {
                // 调用编辑的接口，传入form数据
                this.$http.post('/user/edit', this.operateForm).then(res => {
                    console.log(res);
                    // 关闭弹窗
                    this.isShow = false
                    // 更新table数据
                    this.getList()
                })
            } else {
                // 新增逻辑
                this.$http.post('/user/add', this.operateForm).then(res => {
                    console.log(res);
                    // 关闭弹窗
                    this.isShow = false
                    // 更新table数据
                    this.getList()
                })
            }
        },
        // 新增按钮的方法
        addUser() {
            // 打开弹窗
            this.isShow = true
            // 把当前弹窗状态变为新增用户
            this.operateType = 'add'
            // 初始化form数据
            this.operateForm = {
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            }
        },
        // 搜索按钮的方法
        // 调用时传入name，给默认值
        getList(name = '') {
            this.config.loading = true
            // 判断name是否存在，存在是否搜索，如果搜索将当前分页置为1
            name ? (this.config.page = 1) : ''
            // 调用接口
            getUser({
                page: this.config.page,
                name
            }).then(({ data: res }) => {
                // list在res.data下，是table的列表数据，使用es6的解构赋值{ data: res }
                this.tableData = res.list.map(item => {
                    item.sexLabel = item.sex === 0 ? "女" : "男"
                    return item
                })
                // 处理分页数据
                this.config.total = res.count
                this.config.loading = false
            })
        },
        
        // 拿到传入进来的当前数据row
        editUser(row) {
            // 把当前弹窗状态变为编辑
            this.operateType = 'edit'
            this.isShow = true
            // 把当前弹窗表格内数据置为当前数据
            this.operateForm = row
        },
        // 拿到传入进来的当前数据row
        delUser(row) {
            // 通知栏组件，点击时触发回调函数
            this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                // 获取到当前的id
                const id = row.id
                this.$http.post("/user/del", {
                    params: { id }
                })
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                // 更新table数据
                this.getList()
            })
        }
    },
    // getList在页面加载时就要进行调用，写在生命周期内
    created() {
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.manage-header {
    display: flex;
    // 左右靠边
    justify-content: space-between;
    // 上下对齐
    align-items: center;
}
</style>