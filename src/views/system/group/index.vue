<template>
  <div class="app-container">
    <!-- 工具栏 -->
    <div style="margin-bottom:20px;">
      <span>
        <el-input v-model="params.queryString" placeholder="请输入关键字查询" style="width:300px;" />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </span>
      <span style="margin-left:50px;">
        <el-button v-if="hasAuth('添加权限')" type="primary" icon="el-icon-edit" @click="handleCreate()">添加</el-button>
        <el-button v-if="hasAuth('删除权限')" type="danger" icon="el-icon-delete" @click="handleRemove(null)">删除</el-button>
      </span>
    </div>

    <!-- 权限列表 -->
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        tooltip-effect="dark"
        :data="tableData"
        border
        style="width:100%"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" :index="indexExt" width="50" />
        <el-table-column prop="名称" label="名称" width="120" />
        <el-table-column prop="备注" label="备注" width="200" />
        <el-table-column label="创建日期" width="200">
          <template slot-scope="scope">{{ scope.row.创建日期 | formatTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button v-if="hasAuth('编辑权限')" type="primary" size="small" @click="handleUpdate(scope.row.Id)">编辑</el-button>
            <el-button v-if="hasAuth('删除权限')" type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页栏 -->
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.limit" @pagination="getList" />
    </div>

    <el-dialog
      title="编辑权限"
      :visible.sync="updateDialogVisible"
      width="550px"
    >
      <update-form v-if="updateDialogVisible" :id="id" ref="updateForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="excuteUpdate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加权限"
      :visible.sync="createDialogVisible"
      width="550px"
    >
      <create-form v-if="createDialogVisible" ref="createForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="excuteCreate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import updateForm from './update'
import createForm from './create'
import { query, remove, create, update } from '@/api/group'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils'
export default {
  components: { pagination, updateForm, createForm },
  filters: {
    formatTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      updateDialogVisible: false,
      createDialogVisible: false,
      total: 0,
      loading: true,
      params: {
        queryString: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      id: 0,
      defaultProps: {
        children: 'nodes',
        label: 'text'
      }
    }
  },
  computed: {
    ...mapGetters({
      hasAuth: 'hasAuth'
    })
  },
  mounted() {
    // 页面打开时先获取列表数据与部门树数据
    this.getList()
  },
  methods: {
    // 获取列表数据
    getList() {
      this.loading = true
      query(this.params).then(response => {
        this.tableData = response.Data
        this.total = response.Total
        this.loading = false
      })
    },
    // 扩展表格序号，使其连续显示，而不是每页从头开始
    indexExt(index) {
      return (this.params.page - 1) * this.params.limit + index + 1
    },
    // 搜索操作
    handleSearch() {
      this.getList()
    },
    // 删除操作
    handleRemove(row) {
      let ids = []
      let names = ''
      if (row === null) {
        const selectData = this.$refs.multipleTable.selection
        if (selectData.length === 0) {
          this.$message({
            message: '请选择一条或多条数据进行删除！',
            type: 'warning'
          })
          return
        }

        ids = selectData.map(item => item.Id)
        names = selectData.map(item => item.名称).join()
      } else {
        ids.push(row.Id)
        names = row.名称
      }

      this.$confirm('是否删除姓名为：' + names + '的警员？', '提示', {
        type: 'warning'
      }).then(() => {
        remove(ids).then(response => {
          // 删除成功刷新列表数据
          if (response.Code === 20000) {
            this.getList()
          }
          // 显示提示信息
          const type = response.Code === 20000 ? 'success' : 'error'
          this.$message({
            message: response.Message,
            type: type
          })
        })
      })
    },
    // 编辑事件
    handleUpdate(id) {
      this.id = id
      this.detailDialogVisible = false
      this.createDialogVisible = false
      this.updateDialogVisible = true
    },
    // 添加事件
    handleCreate() {
      this.detailDialogVisible = false
      this.updateDialogVisible = false
      this.createDialogVisible = true
    },
    // 执行新增（修改）操作
    excuteUpdate() {
      // 获取表单数据
      const formData = this.$refs.updateForm.getFormData()
      if (formData.state === 0) {
        return
      }

      // 添加更新操作
      update(formData.data).then(response => {
        // 根据返回的code编码是否为'20000'来判断持久化操作是否成功
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成功，关闭窗口，刷新列表数据
        if (response.Code === 20000) {
          this.updateDialogVisible = false
          this.getList()
        }
      })
    },
    // 执行添加操作
    excuteCreate() {
      // 获取表单数据
      const formData = this.$refs.createForm.getFormData()
      if (formData.state === 0) {
        return
      }

      // 添加更新操作
      create(formData.data).then(response => {
        // 根据返回的code编码是否为'20000'来判断持久化操作是否成功
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成功，关闭窗口，刷新列表数据
        if (response.Code === 20000) {
          this.createDialogVisible = false
          this.getList()
        }
      })
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center'
    },
    rowClass({ row, rowIndex }) {
      return 'text-align:center'
    }
  }
}
</script>
