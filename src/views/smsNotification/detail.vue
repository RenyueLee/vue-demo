<template>
  <div>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>接收手机号：</span></el-col>
      <el-col :span="18">{{ model.接收手机号 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>短信内容：</span></el-col>
      <el-col :span="18">{{ model.短信内容 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>短信类型：</span></el-col>
      <el-col :span="18">{{ model.短信类型 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>是否已发送：</span></el-col>
      <el-col :span="18">{{ model.发送状态 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>发送时间：</span></el-col>
      <el-col :span="18">{{ model.发送时间|formatTime }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>添加时间：</span></el-col>
      <el-col :span="18">{{ model.添加时间|formatTime }}</el-col>
    </el-row>
  </div>
</template>

<script>
import { detail } from '@/api/smsNotification'
import { formatDate } from '@/utils'
export default {
  filters: {
    formatTime(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  props: ['id'],
  data() {
    return {
      model: {
        Id: 0,
        短信内容: '',
        手机号: '',
        发送状态: '',
        发送时间: '',
        添加时间: '',
        短信类型: ''
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    // 详细
    getDetail() {
      detail(this.id).then(response => {
        this.model = response.Data
      })
    }
  }
}
</script>
