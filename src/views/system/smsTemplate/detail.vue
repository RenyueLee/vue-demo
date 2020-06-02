<template>
  <div>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>短信内容：</span></el-col>
      <el-col :span="18">{{ model.短信内容 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>接收对象：</span></el-col>
      <el-col :span="18">{{ model.接收对象 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>短信类型：</span></el-col>
      <el-col :span="18">{{ model.短信类型 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>受理状态：</span></el-col>
      <el-col :span="18">{{ model.受理状态 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>添加时间：</span></el-col>
      <el-col :span="18">{{ model.添加时间|formatTime }}</el-col>
    </el-row>
  </div>
</template>

<script>
import { detail } from '@/api/smsTemplate'
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
        id: 0,
        短信内容: '',
        接收对象: '',
        短信类型: '',
        受理状态: '',
        添加时间: ''
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    // 获取详细
    getDetail() {
      detail(this.id).then(response => {
        this.model = response.Data
      })
    }
  }
}
</script>
