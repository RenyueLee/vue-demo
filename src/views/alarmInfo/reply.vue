<template>
  <el-form ref="replyForm" :model="replyData" :rules="rules">
    <el-form-item prop="message">
      <el-input v-model="replyData.message" type="textarea" rows="6" placeholder="请输入内容" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      replyData: {
        state: 0,
        message: ''
      },
      rules: {
        message: [
          { required: true, message: '请输入短信内容', trigger: 'blur' },
          { min: 5, max: 70, message: '短信内容长度在5到70个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 返回回复内容
    getReplyData() {
      this.$refs['replyForm'].validate((valid) => {
        if (valid) {
          this.replyData.state = 1
        }
      })
      return this.replyData
    }
  }
}
</script>
