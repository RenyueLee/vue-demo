<template>
  <div class="app-container">
    <!-- 工具栏（搜索框，添加，删除按钮） -->
    <div style="margin-bottom:15px;">
      <span>
        <el-input v-model="params.queryString" placeholder="请输入搜索内容" style="width:300px;" />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </span>
      <span style="margin-left:50px;">
        <el-button v-if="hasAuth('添加部门')" type="primary" icon="el-icon-edit" @click="handleCreate()">添加</el-button>
        <el-button v-if="hasAuth('删除部门')" type="danger" icon="el-icon-delete" @click="handleRemove(null)">删除</el-button>
      </span>
    </div>
    <!-- 部门列表 -->
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        tooltip-effect="dark"
        :data="tableData"
        row-key="Id"
        border
        default-expand-all
        :tree-props="{children: 'nodes', hasChildren: 'hasChildren'}"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="NO" :index="indexExt" width="50" />
        <el-table-column prop="名称" label="部门名称" width="400" />
        <el-table-column label="添加时间" width="200">
          <template slot-scope="scope">{{ scope.row.创建日期 | formatTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button v-if="hasAuth('浏览部门详细')" type="success" size="small" @click="handleDetail(scope.row)">详细</el-button>
            <el-button v-if="hasAuth('编辑部门')" type="primary" size="small" @click="handleUpdate(scope.row.Id)">编辑</el-button>
            <el-button v-if="hasAuth('删除部门')" type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.limit" @pagination="getList" />
    </div>

    <el-dialog
      title="部门详细"
      :visible.sync="detailDialogVisible"
      width="450px"
    >
      <detail-form v-if="detailDialogVisible" :id="id" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="handleUpdate(id)">编 辑</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑部门"
      :visible.sync="updateDialogVisible"
      width="30%"
    >
      <update-form v-if="updateDialogVisible" :id="id" ref="updateForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="excuteUpdate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加部门"
      :visible.sync="createDialogVisible"
      width="30%"
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
import detailForm from './detail.vue'
import updateForm from './update.vue'
import createForm from './update.vue'
import { query, remove, create, update } from '@/api/department'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils'
export default {
  // 部门详细，表单组件，分页主键
  components: { detailForm, updateForm, createForm, Pagination },
  filters: {
    formatTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      // 查询参数
      params: {
        queryString: '',
        page: 1,
        limit: 10
      },
      total: 0,
      // 部门详细对话框窗口开关
      detailDialogVisible: false,
      // 编辑部门对话框窗口开关
      updateDialogVisible: false,
      // 添加部门对话框窗口开关
      createDialogVisible: false,
      // 列表数据
      tableData: [],
      loading: true,
      // 选中详细，编辑id
      id: ''
    }
  },
  computed: {
    ...mapGetters({
      hasAuth: 'hasAuth'
    })
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取部门列表数据
    getList() {
      this.loading = true
      query(this.params).then(response => {
        this.tableData = response.Data
        this.total = response.Total
        this.loading = false
      })
    },
    // 查询事件
    handleSearch() {
      this.getList(this.params)
    },
    // 删除事件
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
        names = selectData.map(item => item.部门名称).join()
      } else {
        ids.push(row.Id)
        names = row.部门名称
      }

      this.$confirm('是否删除部门名称为：' + names + '的信息？', '提示', {
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
    // 详细事件
    handleDetail(row) {
      this.id = row.Id
      this.detailDialogVisible = true
      this.createDialogVisible = false
      this.updateDialogVisible = false
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
    // 获取表单数据并持久化
    excuteUpdate() {
      // 获取表单数据
      const formData = this.$refs.updateForm.getFormData()
      if (formData.state === 0) {
        return
      }

      // 持久化操作
      update(formData.data).then(response => {
        // 根据返回的code编码是否为'20000'来判断持久化操作是否成功
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成，关闭编辑窗口，刷新列表数据
        if (response.Code === 20000) {
          this.updateDialogVisible = false
          this.getList()
        }
      })
    },
    // 添加部门操作
    excuteCreate() {
      // 获取表单数据
      const formData = this.$refs.createForm.getFormData()
      if (formData.state === 0) {
        return
      }

      // 持久化操作
      create(formData.data).then(response => {
        // 根据返回的code编码是否为'20000'来判断持久化操作是否成功
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成，关闭编辑窗口，刷新列表数据
        if (response.Code === 20000) {
          this.createDialogVisible = false
          this.getList()
        }
      })
    },
    // 扩展表格序号，使其连续显示，而不是每页从头开始
    indexExt(index) {
      return (this.params.page - 1) * this.params.limit + index + 1
    },
    // 表格行列居中
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center'
    },
    rowClass({ row, rowIndex }) {
      return 'text-align:center'
    }
  }
}

</script>
