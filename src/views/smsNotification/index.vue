<template>
  <div class="app-container">
    <div style="margin-bottom:15px;">
      <el-date-picker
        v-model="selectedDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
      <el-select v-model="params.smsType" placeholder="请选择短信类型">
        <el-option
          v-for="item in smsTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="params.sendState" placeholder="请选择发送状态">
        <el-option
          v-for="item in sendStateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width:100%"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
      >
        <el-table-column type="index" :index="indexExt" width="50" />
        <el-table-column prop="接收手机号" label="手机号" width="150" />
        <el-table-column prop="短信内容" label="短信内容" width="350" />
        <el-table-column prop="短信类型" label="短信类型" width="120" />
        <el-table-column label="添加时间" width="180">
          <template slot-scope="scope">{{ scope.row.添加时间 | formatTime }}</template>
        </el-table-column>
        <el-table-column prop="发送时间" label="发送时间" width="180">
          <template slot-scope="scope">{{ scope.row.发送时间 | formatTime }}</template>
        </el-table-column>
        <el-table-column prop="发送状态" label="发送状态" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.发送状态 | statusFilter"
              disable-transitions
            >{{ scope.row.发送状态 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="handleDetail(scope.row.Id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.limit" @pagination="getList" />
    </div>

    <el-dialog
      title="短信详细"
      :visible.sync="dialogVisible"
      width="550px"
    >
      <detail-form v-if="dialogVisible" :id="id" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import detailForm from './detail.vue'
import { query } from '@/api/smsNotification'
import Pagination from '@/components/Pagination'
import { formatDate } from '@/utils'
export default {
  components: { detailForm, Pagination },
  filters: {
    statusFilter(state) {
      const stateMap = {
        已发送: 'info',
        未发送: 'success',
        发送失败: 'danger'
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
      total: 0,
      loading: true,
      // 查询参数
      params: {
        startDate: '',
        endDate: '',
        smsType: '',
        sendState: '',
        page: 1,
        limit: 10
      },
      dialogVisible: false,
      smsTypeOptions: [
        { value: -1, label: '全部' },
        { value: 0, label: '验证码短信' },
        { value: 1, label: '通知短信' }
      ],
      sendStateOptions: [
        { value: -1, label: '全部' },
        { value: 0, label: '未发送' },
        { value: 1, label: '已发送' },
        { value: 2, label: '发送失败' }
      ],
      // 列表数据
      tableData: [],
      selectedDate: '',
      id: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      if (this.selectedDate !== '') {
        this.params.startDate = this.selectedDate[0]
        this.params.endDate = this.selectedDate[1]
      }
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
    // 查询
    handleSearch() {
      this.getList()
    },
    // 详细
    handleDetail(id) {
      this.id = id
      this.dialogVisible = true
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
