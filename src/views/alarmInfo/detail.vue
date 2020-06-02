<template>
  <section>
    <!-- 侧边信息栏 -->
    <el-col :span="6">
      <!-- 受理警员 -->
      <el-card style="margin:20px;">
        <div slot="header" class="clearfix">
          <span>受理警员</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="showPolicemanDetail">></el-button>
        </div>
        <div>
          <div>
            <div class="block">
              <div style="text-align:center;"><img :src="policemanData.头像" width="120px" height="120px"></div>
            </div>
            <div style="text-align:center;margin-bottom:10px;">
              <span>{{ policemanData.姓名 }}</span>
            </div>
            <div style="text-align:center;">
              <span>{{ policemanData.手机号 }}</span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 受理记录 -->
      <el-card style="margin:20px;">
        <div slot="header" class="clearfix">
          <span>受理记录</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="showAcceptRecord">></el-button>
        </div>
        <div>
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in acceptRecordData"
              :key="index"
              :timestamp="item.添加时间|formatTime"
            >
              {{ item.描述 }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>

    </el-col>

    <!-- 报警详细信息 -->
    <el-col :span="18">
      <el-card style="margin:20px 20px 20px 0;">
        <div slot="header" class="clearfix">
          <span>报警详细信息</span>
        </div>
        <div>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>报警单号：</span></el-col>
            <el-col :span="18">{{ alarmInfo.报警单号 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>报警人姓名：</span></el-col>
            <el-col :span="18">{{ alarmInfo.报警人姓名 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>报警人身份证号：</span></el-col>
            <el-col :span="18">{{ alarmInfo.报警人身份证号 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>报警人手机号：</span></el-col>
            <el-col :span="18">{{ alarmInfo.报警人手机号 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>其他联系方式：</span></el-col>
            <el-col :span="18">{{ alarmInfo.其他联系方式 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>报警内容：</span></el-col>
            <el-col :span="18">{{ alarmInfo.报警内容 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>警情地址：</span></el-col>
            <el-col :span="18">{{ alarmInfo.警情地址 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>是否接受反馈：</span></el-col>
            <el-col :span="18">{{ alarmInfo.是否接受反馈 }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>事发时间：</span></el-col>
            <el-col :span="18">{{ alarmInfo.事发时间|formatTime }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>报警时间：</span></el-col>
            <el-col :span="18">{{ alarmInfo.报警时间|formatTime }}</el-col>
          </el-row>
          <el-row :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>受理状态：</span></el-col>
            <el-col :span="18">{{ alarmInfo.受理状态 }}</el-col>
          </el-row>
          <el-row v-if="alarmInfo.处理结果 !== null" :gutter="20" style="padding:5px 0 15px 20px;">
            <el-col :span="6"><span>处理结果：</span></el-col>
            <el-col :span="18">{{ alarmInfo.处理结果 }}</el-col>
          </el-row>
          <el-row style="padding:5px 0 15px 20px;text-align:center;">
            <el-col>
              <el-button v-if="alarmInfo.附件 !== ''" type="warning" @click="download">下载附件</el-button>
              <el-button v-if="hasAuth('填写报警受理结果') && alarmInfo.受理状态 === '已受理'" type="primary" @click="handleShowResult">填写处理结果</el-button>
              <el-button v-if="hasAuth('回复报警人') && alarmInfo.受理状态 === '已受理'" type="info" @click="handleReply">人工回复</el-button>
              <el-button v-if="hasAuth('分发报警任务') && alarmInfo.受理状态 === '未受理'" type="success" @click="handleAllot">分发</el-button>
              <el-button @click="gotoList">返回</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <!-- 填写处理结果 -->
    <el-dialog
      title="处理结果"
      :visible.sync="writeResultDialogVisible"
      width="550px"
    >
      <processing-result v-if="writeResultDialogVisible" ref="processingResult" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="writeResultDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleWriteResult">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 人工回复 -->
    <el-dialog
      title="人工回复"
      :visible.sync="replyDialogVisible"
      width="550px"
    >
      <reply-form v-if="replyDialogVisible" ref="reply" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="excuteReply">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分发 -->
    <el-dialog
      title="分发"
      :visible.sync="allotDialogVisible"
      width="800px"
    >
      <allot-policeman v-if="allotDialogVisible" ref="allotPoliceman" :alarm-info-ids="alarmInfoId" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="allotDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="excuteAllot">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 警员详细 -->
    <el-dialog
      title="警员详细"
      :visible.sync="policemanDetailVisible"
      width="550px"
    >
      <policeman-detail v-if="policemanDetailVisible" :id="policemanData.Id" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="policemanDetailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 受理记录 -->
    <el-dialog
      title="受理记录"
      :visible.sync="acceptRecordVisible"
      width="650px"
    >
      <accept-record v-if="acceptRecordVisible" :alarm-info-id="alarmInfoId" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="acceptRecordVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import processingResult from './processingResult'
import replyForm from './reply'
import allotPoliceman from './allotPoliceman'
import policemanDetail from '../policeman/detail.vue'
import acceptRecord from './acceptRecord.vue'
import { detail, writeResult, reply, allot } from '@/api/alarmInfo'
import { query } from '@/api/acceptRecord'
import { getPolicemanByAlarmId } from '@/api/policeman'
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils'
export default {
  components: { processingResult, replyForm, allotPoliceman, policemanDetail, acceptRecord },
  filters: {
    formatTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      // 报警ID
      alarmInfoId: this.$route.params.id,
      // 警员详细显示窗口开关
      policemanDetailVisible: false,
      // 受理记录显示窗口开关
      acceptRecordVisible: false,
      // 填写处理结果窗口显示开关
      writeResultDialogVisible: false,
      // 人工回复窗口显示开关
      replyDialogVisible: false,
      // 分发窗口显示开关
      allotDialogVisible: false,
      // 报警详细信息
      alarmInfo: {
        Id: this.$route.params.id,
        报警单号: '',
        报警人姓名: '',
        报警人手机号: '',
        报警人身份证号: '',
        报警内容: '',
        警情地址: '',
        是否接受反馈: '',
        报警时间: '',
        受理状态: '',
        处理结果: '',
        事发时间: '',
        其他联系方式: '',
        附件: ''
      },
      // 处理结果数据
      resultData: {
        alarmInfoId: this.$route.params.id,
        处理结果: ''
      },
      // 回复数据
      replyData: {
        alarmInfoId: this.$route.params.id,
        短信内容: '',
        接收手机号: '',
        短信类型: 1
      },
      // 受理警员信息
      policemanData: {
        Id: 0,
        警员编号: '',
        姓名: '',
        手机号: '',
        头像: '',
        部门: '',
        添加时间: ''
      },
      // 受理记录
      acceptRecordData: []
    }
  },
  computed: {
    ...mapGetters({
      hasAuth: 'hasAuth'
    })
  },
  mounted() {
    // 获取报警信息
    this.getAlarmInfo()
    // 获取受理记录
    this.getAcceptRecord()
    // 获取受理警员详细
    this.getPolicemanDetail()
  },
  methods: {
    filterAttachment(value) {
      return process.env.VUE_APP_BASE_IP + value
    },
    // 获取报警详细信息
    getAlarmInfo() {
      detail(this.alarmInfoId).then(response => {
        if (response.Code === 20000) {
          this.alarmInfo = response.Data
          this.replyData.接收手机号 = this.alarmInfo.报警人手机号
        }
      })
    },
    // 获取受理警员详细
    getPolicemanDetail() {
      getPolicemanByAlarmId(this.alarmInfo.Id).then(response => {
        if (response.Code === 20000) {
          this.policemanData = response.Data
          this.policemanData.头像 = this.policemanData.头像 === null ? require('@/assets/alarm_images/policeman.png') : process.env.VUE_APP_BASE_IP + this.policemanData.头像
        }
      })
    },
    // 获取受理记录列表
    getAcceptRecord() {
      query(this.alarmInfoId).then(response => {
        if (response.Code === 20000) {
          this.acceptRecordData = response.Data
        }
      })
    },
    // 显示填写处理结果窗口
    handleShowResult() {
      this.writeResultDialogVisible = true
    },
    // 显示人工回复窗口
    handleReply() {
      this.replyDialogVisible = true
    },
    // 填写处理结果
    handleWriteResult() {
      // 获取处理结果
      const result = this.$refs.processingResult.getResult()
      if (result.state === 0) {
        return
      }
      // 持久化操作
      this.resultData.处理结果 = result.处理结果
      writeResult(this.resultData).then(response => {
        const type = response.Code === 20000 ? 'success' : 'error'
        this.$message({
          message: response.Message,
          type: type
        })
        // 关闭窗口，刷新数据
        if (response.Code === 20000) {
          this.writeResultDialogVisible = false
          this.getAlarmInfo()
        }
      })
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
        // 关闭窗口
        if (response.Code === 20000) {
          this.replyDialogVisible = false
        }
      })
    },
    // 显示分发窗口
    handleAllot() {
      if (this.alarmInfo.受理状态 !== '未受理') {
        this.$message({
          message: '该报警已分发，请不要重复分发！',
          type: 'warning'
        })
        return
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
          this.getAlarmInfo()
          this.getPolicemanDetail()
          this.getAcceptRecord()
        }
      })
    },
    // 返回报警列表
    gotoList() {
      this.$router.replace('/alarmInfo/Index')
    },
    // 显示警员详细窗口
    showPolicemanDetail() {
      this.policemanDetailVisible = true
    },
    // 显示处理记录窗口
    showAcceptRecord() {
      this.acceptRecordVisible = true
    },
    // 下载附件
    download() {
      const attachFile = process.env.VUE_APP_BASE_IP + this.alarmInfo.附件
      window.open(attachFile)
    }
  }
}
</script>

<style>
</style>
