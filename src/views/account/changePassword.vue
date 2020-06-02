<template>
  <el-form ref="changePasswordForm" :model="model.data" :rules="rules" label-width="80px">
    <el-form-item label="登录名">
      <el-input v-model="model.data.登录名" :disabled="true" />
    </el-form-item>

    <el-form-item label="原密码" prop="OriginalPassword">
      <el-input v-model="model.data.OriginalPassword" show-password auto-complete="off" />
    </el-form-item>
    <el-form-item label="新密码" prop="Password">
      <el-input v-model="model.data.Password" show-password auto-complete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="ConfirmPassword">
      <el-input v-model="model.data.ConfirmPassword" show-password auto-complete="off" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    // 验证密码
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.model.data.Password) {
        callback(new Error('密码输入不一致，请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      model: {
        state: 0,
        data: {
          登录名: this.$store.getters.loginName,
          OriginalPassword: '',
          Password: '',
          ConfirmPassword: ''
        }
      },
      rules: {
        OriginalPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '请输入长度为6-20位的密码', trigger: 'blur' }
        ],
        ConfirmPassword: [
          { required: true, message: '请再次输入密码确认', trigger: 'blur' },
          { min: 6, max: 20, message: '请输入长度为6-20位的密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取表单数据
    getFormData() {
      this.$refs['changePasswordForm'].validate((valid) => {
        if (valid) {
          this.model.state = 1
        }
      })
      return this.model
    }
  }
}

</script>
