<template>
  <section>
    <el-col :span="8">
      <div><img :src="model.头像" width="120px" height="120px"></div>
    </el-col>
    <el-col :span="16">
      <div>
        <el-row :gutter="20" style="padding:5px 0 15px 20px;">
          <el-col :span="8"><span>警员编号：</span></el-col>
          <el-col :span="16">{{ model.警员编号 }}</el-col>
        </el-row>
        <el-row :gutter="20" style="padding:5px 0 15px 20px;">
          <el-col :span="8"><span>姓名：</span></el-col>
          <el-col :span="16">{{ model.姓名 }}</el-col>
        </el-row>
        <el-row :gutter="20" style="padding:5px 0 15px 20px;">
          <el-col :span="8"><span>手机号：</span></el-col>
          <el-col :span="16">{{ model.手机号 }}</el-col>
        </el-row>
        <el-row :gutter="20" style="padding:5px 0 15px 20px;">
          <el-col :span="8"><span>所属部门：</span></el-col>
          <el-col :span="16">{{ model.所属部门 }}</el-col>
        </el-row>
      </div>
    </el-col>
  </section>
</template>

<script>
import { detail } from '@/api/policeman'
export default {
  props: ['id'],
  data() {
    return {
      model: {
        id: 0,
        警员编号: '',
        姓名: '',
        手机号: '',
        所属部门: '',
        头像: ''
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
        this.model.头像 = this.model.头像 === null ? require('@/assets/alarm_images/policeman.png') : process.env.VUE_APP_BASE_IP + this.model.头像
      })
    }
  }
}
</script>
