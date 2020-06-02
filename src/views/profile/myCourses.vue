<template>
  <section>
    <el-col :span="6">
      <!-- 部门导航 -->
      <el-card style="margin:20px;">
        <div slot="header" class="clearfix">
          <span>个人中心</span>
        </div>
        <div>
          <ul>
            <li><a href="#/profile/myexams">我的课程</a></li>
            <li><a href="#/profile/mycourses">我的考试</a></li>
          </ul>
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"
            prefix-icon="el-icon-search"
          />

          <div style="margin-top:20px;">
            <el-tree
              ref="tree"
              class="filter-tree"
              accordion
              :data="departmentTree"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            />
          </div>

        </div>
      </el-card>
    </el-col>
    <el-col :span="18" style="height:100%;">
      <el-card style="margin-top:20px;margin-right:20px;margin-bottom:20px;height:100%">
        <div slot="header" class="clearfix">
          <span>警员列表</span>
        </div>
        <div>
          <!-- 工具栏 -->
          <div style="margin-bottom:20px;">
            <span>
              <el-input v-model="params.queryString" placeholder="请输入警员编号/姓名/手机号" style="width:300px;" />
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </span>
            <span style="margin-left:50px;">
              <el-button v-if="hasAuth('添加警员')" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
              <el-button v-if="hasAuth('删除警员')" type="danger" icon="el-icon-removeete" @click="handleRemove(null)">删除</el-button>
            </span>

          </div>
          <!-- 警员列表 -->
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
              <el-table-column prop="警员编号" label="警员编号" width="150" />
              <el-table-column prop="姓名" label="姓名" width="100" />
              <el-table-column prop="手机号" label="手机号" width="150" />
              <el-table-column prop="所属部门" label="所属部门" width="300" />
              <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                  <el-button v-if="hasAuth('浏览警员详细')" type="success" size="small" @click="handleDetail(scope.row.Id)">详细</el-button>
                  <el-button v-if="hasAuth('编辑警员')" type="primary" size="small" @click="handleUpdate(scope.row.Id)">编辑</el-button>
                  <el-button v-if="hasAuth('删除警员')" type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页栏 -->
          <div>
            <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.limit" @pagination="getList" />
          </div>
        </div>
      </el-card>
    </el-col>

    <el-dialog
      title="警员详细"
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
      title="编辑警员"
      :visible.sync="updateDialogVisible"
      width="650px"
    >
      <update-form v-if="updateDialogVisible" :id="id" ref="updateForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="excuteUpdate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加警员"
      :visible.sync="createDialogVisible"
      width="650px"
    >
      <create-form v-if="createDialogVisible" ref="createForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="excuteCreate">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import detailForm from '../policeman/detail.vue'
import updateForm from '../policeman/update.vue'
import createForm from '../policeman/create.vue'
import { query, remove, update, create } from '@/api/policeman'
import { getTree } from '@/api/department'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: { detailForm, updateForm, createForm, Pagination },
  data() {
    return {
      detailDialogVisible: false,
      updateDialogVisible: false,
      createDialogVisible: false,
      filterText: '',
      total: 0,
      loading: true,
      params: {
        queryString: '',
        departmentId: 0,
        page: 1,
        limit: 10
      },
      tableData: [],
      id: 0,
      departmentTree: [],
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
  watch: {
    // 触发树节点过滤
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    // 页面打开时先获取列表数据与部门树数据
    this.getList()
    this.getDepartmentTree()
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
    // 获取部门树
    getDepartmentTree() {
      getTree().then(response => {
        this.departmentTree = response.Data
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
        names = selectData.map(item => item.姓名).join()
      } else {
        ids.push(row.Id)
        names = row.姓名
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
    // 详细事件
    handleDetail(id) {
      this.id = id
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
    // 执行修改操作
    excuteUpdate() {
      // 获取表单数据
      const formData = this.$refs.updateForm.getFormData()
      if (formData.state === 0) {
        return
      }
      // 持久化操作
      update(formData.data).then(response => {
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成功，关闭编辑窗口，更新列表数据
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
      // 持久化操作
      create(formData.data).then(response => {
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 操作成功，关闭编辑窗口，更新列表数据
        if (response.Code === 20000) {
          this.createDialogVisible = false
          this.getList()
        }
      })
    },
    // 过滤部门节点
    filterNode(value, data) {
      if (!value) return true
      return data.text.indexOf(value) !== -1
    },
    // 点击部门节点搜索
    handleNodeClick(data) {
      this.params.departmentId = data.id
      this.getList()
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
