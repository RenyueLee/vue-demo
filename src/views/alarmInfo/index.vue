<template>
  <div class="app-container">
    <div style="margin-bottom:15px;">
      <span>
        <el-input v-model="params.queryString" placeholder="请输入查询内容" style="width:250px;" />
        <el-select v-model="params.acceptingState" placeholder="请选择处理状态">
          <el-option
            v-for="item in acceptingStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="params.selectedDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </span>

      <span style="margin-left:50px;">
        <el-button v-if="hasAuth('分发报警任务')" type="primary" icon="el-icon-phone-outline" @click="handleAllot(null)">批量分发</el-button>
        <el-button v-if="hasAuth('删除报警')" type="danger" icon="el-icon-removeete" @click="handleRemove(null)">删除</el-button>
      </span>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        border
        style="width:100%"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="NO" :index="indexExt" width="50" />
        <el-table-column prop="报警单号" label="报警单号" width="120" />
        <el-table-column prop="报警人姓名" label="报警人姓名" width="100" />
        <el-table-column prop="报警人手机号" label="报警人手机号" width="150" />
        <el-table-column prop="警情地址" label="警情地址" width="300" />
        <el-table-column label="报警时间" width="200">
          <template slot-scope="scope">{{ scope.row.报警时间 | formatTime }}</template>
        </el-table-column>
        <el-table-column prop="受理状态" label="受理状态" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.受理状态 | statusFilter"
              disable-transitions
            >{{ scope.row.受理状态 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button v-if="hasAuth('浏览报警详细')" type="success" size="small" @click="gotoLink(scope.row)">详细</el-button>
            <el-button v-if="hasAuth('分发报警任务') && scope.row.受理状态 === '未受理'" type="primary" size="small" @click="handleAllot(scope.row)">分发</el-button>
            <el-button v-if="hasAuth('回复报警人') && scope.row.受理状态 !== '已完成'" type="info" size="small" @click="handleReply(scope.row)">回复</el-button>
            <el-button v-if="hasAuth('删除报警')" type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.limit" @pagination="getList" />
    </div>

    <el-dialog
      title="回复"
      :visible.sync="replyDialogVisible"
      width="550px"
    >
      <reply-form v-if="replyDialogVisible" ref="reply" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="excuteReply">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="分发"
      :visible.sync="allotDialogVisible"
      width="800px"
    >
      <allot-policeman v-if="allotDialogVisible" ref="allotPoliceman" :alarm-info-ids="selectedIds" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="allotDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="excuteAllot">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { query, remove, allot, reply } from '@/api/alarmInfo'
import replyForm from './reply'
import allotPoliceman from './allotPoliceman'
import Pagination from '@/components/Pagination'
import { mapGetters, mapActions, mapState } from 'vuex'
import { formatDate } from '@/utils'

export default {
  components: { replyForm, allotPoliceman, Pagination },
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
      // 总记录数
      total: 0,
      loading: true,
      // 查询参数
      params: {
        startDate: '',
        endDate: '',
        acceptingState: -1,
        queryString: '',
        page: 1,
        limit: 10
      },
      // 日期查询条件
      selectedDate: '',
      // 回复对话框显示状态
      replyDialogVisible: false,
      // 分发对话框显示状态
      allotDialogVisible: false,
      // 回复数据
      replyData: {
        alarmInfoId: 0,
        短信内容: '',
        接收手机号: '',
        短信类型: 1
      },
      // 受理状态
      acceptingStateOptions: [
        { value: -1, label: '全部' },
        { value: 0, label: '未受理' },
        { value: 1, label: '受理中' },
        { value: 2, label: '已完成' }
      ],
      tableData: [],
      selectedIds: ''
    }
  },
  computed: {
    ...mapGetters({
      hasAuth: 'hasAuth'
    }),
    ...mapState({
      alarmStore: 'alarm'
    })
  },
  created() {
    this.init()
  },
  // mounted() {
  //   this.init()
  // },
  methods: {
    ...mapActions({
      setParams: 'alarm/setParams',
      setSelectedIds: 'alarm/setSelectedIds'
    }),
    // 获取列表数据
    getList() {
      if (this.selectedDate !== '') {
        this.params.startDate = this.selectedDate[0]
        this.params.endDate = this.selectedDate[1]
      }
      this.loading = true

      return new Promise((resolve, reject) => {
        query(this.params).then(response => {
          this.tableData = response.Data
          this.total = response.Total
          this.loading = false
          resolve(response.Data)
        })
      })
    },
    // 扩展表格序号，使其连续显示，而不是每页从头开始
    indexExt(index) {
      return (this.params.page - 1) * this.params.limit + index + 1
    },
    // 查询事件
    handleSearch() {
      this.getList()
    },
    // 删除事件（合并多选删除，行删除事件）
    handleRemove(row) {
      let numbers = ''
      let ids = []
      // 行删除时会传递要删除的ID，所以未传ID时为多选删除
      if (row === null) {
        // 获取选择数据
        const selectData = this.$refs.multipleTable.selection
        if (selectData.length === 0) {
          this.$message({
            message: '请选择一条或多条数据进行删除！',
            type: 'warning'
          })
          return
        }
        // 获取选中数据的ID，并以逗号间隔合并输出id字符串
        ids = selectData.map(item => item.Id).join()
        numbers = selectData.map(item => item.报警单号).join()
      } else {
        ids.push(row.Id)
        numbers = row.报警单号
      }

      // 删除操作
      this.$confirm('是否删除报警单号为：' + numbers + '的信息？', '提示', {
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
    // 显示回复窗口事件
    handleReply(row) {
      // 设置传值
      this.replyData.alarmInfoId = row.Id
      this.replyData.接收手机号 = row.报警人手机号
      // 设置显示模态窗口状态
      this.replyDialogVisible = true
    },
    // 确认回复消息，调用组件中的方法完成回复操作
    excuteReply() {
      // 获取回复内容
      const replyMessage = this.$refs.reply.getReplyData()
      if (replyMessage.state === 0) {
        return
      }
      // 持久化操作
      this.replyData.短信内容 = replyMessage.message
      reply(this.replyData).then(response => {
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 关闭窗口，刷新列表数据
        if (response.Code === 20000) {
          this.replyDialogVisible = false
          this.getList()
        }
      })
    },
    // 显示分发窗口事件
    handleAllot(row) {
      if (row === null) {
        // 获取选择数据
        const selectData = this.$refs.multipleTable.selection
        if (selectData.length === 0) {
          this.$message({
            message: '请选择一条或多条数据进行分发！',
            type: 'warning'
          })
          return
        }

        if (selectData.find(item => item.受理状态 !== '未受理') !== undefined) {
          this.$message({
            message: '选中的行中含有已分发的数据！',
            type: 'warning'
          })
          return
        }

        // 获取选中数据的ID，并以逗号间隔合并输出id字符串
        const ids = selectData.map(item => item.Id).join()
        // 打开分发窗口并传递选中的报警ID
        this.selectedIds = ids
      } else {
        if (row.受理状态 !== '未受理') {
          this.$message({
            message: '请选择未受理的报警进行分发！',
            type: 'warning'
          })
          return
        }
        this.selectedIds = row.Id
      }
      this.allotDialogVisible = true
    },
    // 分发操作事件
    excuteAllot() {
      // 获取分发数据
      const allotData = this.$refs.allotPoliceman.getAllotData()
      if (allotData.state === 0) {
        return
      }
      // 将分配关联数据持久化
      allot(allotData.data).then(response => {
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 关闭窗口，刷新列表
        if (response.Code === 20000) {
          this.allotDialogVisible = false
          this.getList()
        }
      })
    },
    // 跳转链接，跳转至详细报警信息
    gotoLink(row) {
      // 保持当前页面参数状态
      this.setParams(this.params)

      const selectData = this.$refs.multipleTable.selection
      if (selectData.length > 0) {
        this.selectedIds = selectData.map(item => item.Id).join()
        this.setSelectedIds(this.selectedIds)
      }

      // 跳转到详细
      this.$router.replace('/alarmInfo/detail/' + row.Id)
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center'
    },
    rowClass({ row, rowIndex }) {
      return 'text-align:center'
    },
    // 初始化页面数据
    init() {
      const that = this
      // (1)获取列表数据
      this.params = this.alarmStore.params
      this.getList().then(response => {
        // (2)获取选中的ID
        this.selectedIds = this.alarmStore.selectedIds
        if (this.selectedIds === '') {
          return
        }
        // (3)设置选中状态
        // -------------------------
        // 拆分选中的ID为数组
        const ids = this.selectedIds.split(',')
        ids.forEach(function(value) {
        // 在列表数据集合中查找对应ID,并返回查找到的行
          const row = response.find(item => item.Id === parseInt(value))
          if (row !== undefined) {
          // 在列表中将该行数据设为选中
            that.$refs.multipleTable.toggleRowSelection(row)
          }
        })
      })
    }
  }
}
</script>
