<template>
  <div class="user-content">
    <el-dialog title="新增用户" :before-close="handleClose" :visible.sync="dialogVisible" width="50%">

      <!-- 用户的表单信息 -->
      <el-form ref="form" :rules="rules" label-position="right" :inline="true" :model="form" label-width="80px">

        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输人姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输人你的年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择" style="width: 94%;">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-DD" v-model="form.birth" style="width: 180%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输人你的地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="user-header">
      <el-button type="primary" @click="handleAdd"> + 新增</el-button>
      <!-- form的搜索区域 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输人名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table stripe :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sexLabel" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex == 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '@/api/index.js'

export default {
  name: 'User',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [{ required: true, message: '请输人姓名' }],
        age: [{ required: true, message: '请输人年龄' }],
        sex: [{ required: true, message: '请选择性别' }],
        birth: [{ required: true, message: '请选择出生日期' }],
        addr: [{ required: true, message: '请输人地址' }],
      },
      tableData: [],
      modalType: 0, //0表示新增的弹窗，1表示编辑的弹窗
      total: 0, // 当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: '',
      },
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((val) => {
        // console.log(val, 'validate')
        if (val) {
          // 后续对表单数据的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          }

          console.log(this.form, 'form')

          // 清空表单
          this.$refs.form.resetFields()
          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    // 弹窗关闭的时候
    handleClose() {
      console.log(this.$refs.form)
      // 清空表单
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 点击取消按钮
    cancel() {
      this.handleClose()
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      // 回显,注意需要对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            // 重新获取列表的接口
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },
    // 选择页码的回调函数
    handlePage(val) {
      console.log('val', val)
      this.pageData.page = val
      this.getList()
    },
    // 列表查询
    onSubmit() {
      this.getList()
    },
    // 获取的列表的数据
    getList() {
      // 获取的列表的数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data)
          this.tableData = data.list
          this.total = data.count || 0
        }
      )
    },
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.user-content {
  height: 90%;
  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    // calc(动态计算高度)
    height: calc(100% - 62px);
    position: relative;
    .pager {
      position: absolute;
      bottom: 0px;
      right: 20px;
    }
  }
}
</style>