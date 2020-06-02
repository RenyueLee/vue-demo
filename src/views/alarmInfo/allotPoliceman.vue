<template>
  <div>
    <!-- 工具栏 -->
    <div style="margin-bottom:20px;">
      <el-input v-model="params.queryString" placeholder="请输入警员编号/姓名/手机号" style="width:300px;" />
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <!-- 警员列表 -->
    <div>
      <el-table
        ref="singleTable"
        v-loading="loading"
        tooltip-effect="dark"
        highlight-current-row
        :data="tableData"
        border
        style="width:100%"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" :index="indexExt" width="50" />
        <el-table-column prop="警员编号" label="警员编号" min-width="20%" />
        <el-table-column prop="姓名" label="姓名" min-width="15%" />
        <el-table-column prop="手机号" label="手机号" min-width="20%" />
        <el-table-column prop="所属部门" label="所属部门" min-width="25%" />
      </el-table>
    </div>
    <!-- 分页栏 -->
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.limit" @pagination="getPolicemen" />
    </div>
  </div>
</template>

<script>
import { query } from '@/api/policeman'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  props: ['alarmInfoIds'],
  data() {
    return {
      total: 0,
      loading: true,
      // 查询参数
      params: {
        queryString: '',
        page: 1,
        limit: 10
      },
      // 列表数据
      tableData: [],
      // 当前选中行
      currentRow: null,
      // 报警分配模型
      allotModel: {
        state: 0,
        data: {
          alarmInfoIds: '',
          policemanId: ''
        }
      }

    }
  },
  mounted() {
    this.getPolicemen()
    this.allotModel.data.alarmInfoIds = this.alarmInfoIds
  },
  methods: {
    // 获取列表数据
    getPolicemen() {
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
      this.getPolicemen()
    },
    // 选中行事件
    handleCurrentChange(val) {
      this.currentRow = val
    },
    // 获取分配数据
    getAllotData() {
      if (this.currentRow === null) {
        this.$message({
          message: '请选择一位警员分配任务。',
          type: 'warning'
        })
      } else {
        // 获取选中的警员ID
        this.allotModel.data.policemanId = this.currentRow.Id
        this.allotModel.state = 1
      }

      return this.allotModel
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
