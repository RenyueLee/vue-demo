<template>
  <el-form ref="resultForm" :model="resultData" :rules="rules">
    <el-form-item prop="处理结果">
      <el-input v-model="resultData.处理结果" type="textarea" rows="6" placeholder="请输入内容" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      resultData: {
        state: 0,
        处理结果: ''
      },
      rules: {
        处理结果: [
          { required: true, message: '请输入处理结果内容', trigger: 'blur' },
          { min: 10, max: 200, message: '处理结果内容长度在10到200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取结果数据
    getResult() {
      this.$refs['resultForm'].validate((valid) => {
        if (valid) {
          this.resultData.state = 1
        }
      })
      return this.resultData
    }
  }
}
</script>
