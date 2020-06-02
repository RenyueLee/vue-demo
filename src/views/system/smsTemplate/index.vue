<template>
  <div class="app-container">
    <div style="margin-bottom:15px;">
      <span>
        <el-input v-model="params.queryString" placeholder="请输入搜索内容" style="width:300px;" />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </span>
      <span style="margin-left:50px;">
        <el-button v-if="hasAuth('添加短信模板')" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
        <el-button v-if="hasAuth('删除短信模板')" type="danger" icon="el-icon-delete" @click="handleRemove(null)">删除</el-button>
      </span>
    </div>
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
        <el-table-column prop="短信内容" label="短信内容" width="350" />
        <el-table-column prop="短信类型" label="短信类型" width="150" />
        <el-table-column prop="接收对象" label="接收对象" width="150" />
        <el-table-column prop="受理状态" label="业务受理状态" width="150">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.受理状态 | statusFilter"
              disable-transitions
            >{{ scope.row.受理状态 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="180">
          <template slot-scope="scope">{{ scope.row.添加时间 | formatTime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button v-if="hasAuth('浏览短信模板详细')" type="success" size="small" @click="handleDetail(scope.row.Id)">详细</el-button>
            <el-button v-if="hasAuth('编辑短信模板')" type="primary" size="small" @click="handleUpdate(scope.row.Id)">编辑</el-button>
            <el-button v-if="hasAuth('删除短信模板')" type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.limit" @pagination="getList" />
    </div>

    <el-dialog
      title="短信模板"
      :visible.sync="detailDialogVisible"
      width="550px"
    >
      <detail-form v-if="detailDialogVisible" :id="id" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="handleUpdate(id)">编 辑</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑短信模板"
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
      title="添加短信模板"
      :visible.sync="createDialogVisible"
      width="550px"
    >
      <create-form v-if="createDialogVisible" :id="id" ref="createForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="excuteCreate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import detailForm from '../smsTemplate/detail.vue'
import updateForm from '../smsTemplate/update.vue'
import createForm from '../smsTemplate/create.vue'
import { query, remove, create, update } from '@/api/smsTemplate'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils'
export default {
  components: { detailForm, updateForm, createForm, Pagination },
  filters: {
    statusFilter(state) {
      const stateMap = {
        已完成: 'info',
        受理中: 'success',
        未受理: 'danger'
      }
      return stateMap[state]
    },
    formatTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      detailDialogVisible: false,
      updateDialogVisible: false,
      createDialogVisible: false,
      total: 0,
      loading: true,
      // 查询参数
      params: {
        queryString: '',
        page: 1, // 暂时不使用
        limit: 10// 暂时不使用
      },
      // 列表数据
      tableData: [],
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
    // 搜索事件
    handleSearch() {
      this.getList(this.params)
    },
    // 删除事件
    handleRemove(row) {
      let ids = []
      let states = ''
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
        states = selectData.map(item => item.受理状态).join()
      } else {
        ids.push(row.Id)
        states = row.受理状态
      }

      this.$confirm('是否删除受理状态为：' + states + '的短信模板？', '提示', {
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
    handleDetail(id) {
      this.id = id
      this.detailDialogVisible = true
      this.updateDialogVisible = false
      this.createDialogVisible = false
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
    // 更新表单数据持久化
    excuteUpdate() {
      // 获取表单数据
      const fromData = this.$refs.updateForm.getFormData()
      if (fromData.state === 0) {
        return
      }
      // 持久化操作
      update(fromData.data).then(response => {
        // 根据返回的code编码是否为'20000'来判断持久化操作是否成功
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成功，关闭窗口，刷新列表
        if (response.Code === 20000) {
          this.updateDialogVisible = false
          this.getList()
        }
      })
    },
    // 添加表单数据持久化
    excuteCreate() {
      // 获取表单数据
      const fromData = this.$refs.createForm.getFormData()
      if (fromData.state === 0) {
        return
      }
      // 持久化操作
      create(fromData.data).then(response => {
        // 根据返回的code编码是否为'20000'来判断持久化操作是否成功
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成功，关闭窗口，刷新列表
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
