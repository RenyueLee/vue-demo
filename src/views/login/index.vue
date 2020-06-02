<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-page"
      auto-complete="on"
      label-position="left"
    >

      <h3 class="title">系统登录</h3>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="手机号码"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-form-item prop="imageCode">
        <el-input v-model="loginForm.imageCode" placeholder="图形验证码" prefix-icon="el-icon-picture-outline" style="width:65%" />
        <img ref="validateImg" :src="ValidateCodeUrl" onclick="this.src = this.src + '?'" style="cursor:pointer;">
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="短信验证码" prefix-icon="el-icon-mobile-phone" style="width:65%" />
        <el-button type="success" :disabled="isDisabled" @click="sendCode">{{ buttonText }}</el-button>
      </el-form-item>
      <el-form-item>
        <p style="color:red;"><i>TIP：看不清图形验证码，可点击刷新。</i></p>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { createSmsCode } from '@/api/smsNotification'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        grant_type: 'password',
        username: '18857069995',
        password: '',
        imageCode: ''
      },
      buttonText: '发送验证码',
      flag: true,
      isDisabled: false, // 是否禁止点击发送验证码按钮
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
        imageCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // ValidateCodeUrl: process.env.VUE_APP_BASE_IP + '/ValidateCode/Create',
      ValidateCodeUrl: 'http://115.231.121.154:90/ValidateCode/Create'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 发送验证码短信
    sendCode() {
      if (this.flag) {
        this.flag = false
        // 创建验证码短信
        const model = { imageCode: this.loginForm.imageCode, mobile: this.loginForm.username }
        createSmsCode(model).then(response => {
          const type = response.Code === 20000 ? 'success' : 'error'
          this.$message({
            message: response.Message,
            type: type
          })
          if (response.Code !== 20000) {
            this.buttonText = '重新获取'
            this.$refs.validateImg.src = this.ValidateCodeUrl + '?raw=' + new Date().getTime()
            this.isDisabled = false
            this.flag = true
            return
          }

          let time = 60
          this.buttonText = '已发送'
          this.isDisabled = true

          const timer = setInterval(() => {
            time--
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer)
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true
            }
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    background: #283443;
    overflow: hidden;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 80px auto;
    width: 450px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 5px #cac6c6;
}
.title{
  text-align: center;
  margin: 30px;
}
.code >>> .el-form-item_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
</style>
