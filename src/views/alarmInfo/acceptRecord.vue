<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      border
      style="width:100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="记录时间" width="200">
        <template slot-scope="scope">{{ scope.row.添加时间 | formatTime }}</template>
      </el-table-column>
      <el-table-column prop="描述" label="描述信息" />
    </el-table>
  </div>
</template>

<script>
import { query } from '@/api/acceptRecord'
import { formatDate } from '@/utils'
export default {
  filters: {
    formatTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  props: ['alarmInfoId'],
  data() {
    return {
      queryString: '',
      multipleSelection: [],
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取受理记录
    getData() {
      query(this.alarmInfoId).then(response => {
        this.tableData = response.Data
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
