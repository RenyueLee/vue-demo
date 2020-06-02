<template>
  <div>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>部门名称：</span></el-col>
      <el-col :span="18">{{ model.部门名称 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>上级部门：</span></el-col>
      <el-col :span="18">{{ model.上级部门 }}</el-col>
    </el-row>
    <el-row :gutter="20" style="padding:5px 0 15px 20px;">
      <el-col :span="6"><span>添加时间：</span></el-col>
      <el-col :span="18">{{ model.添加时间|formatTime }}</el-col>
    </el-row>
  </div>
</template>

<script>
import { detail } from '@/api/department'
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
        部门名称: 0,
        上级部门: '',
        添加时间: ''
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    // 获取部门详细信息
    getDetail() {
      detail(this.id).then(response => {
        this.model = response.Data
      })
    }
  }
}
</script>
