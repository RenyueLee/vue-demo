<template>
  <el-form ref="smsTemplateform" :model="model.data" :rules="rules" label-width="80px">
    <el-form-item prop="短信内容" label="短信内容">
      <el-input v-model="model.data.短信内容" type="textarea" rows="5" />
    </el-form-item>
    <el-form-item prop="接收对象" label="接收对象">
      <el-select v-model="model.data.接收对象" placeholder="请选择">
        <el-option
          v-for="item in receivingObjectsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="短信类型" label="短信类型">
      <el-select v-model="model.data.短信类型" placeholder="请选择">
        <el-option
          v-for="item in smsTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="受理状态" label="受理状态">
      <el-select v-model="model.data.受理状态" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { detail } from '@/api/smsTemplate'
export default {
  props: ['id'],
  data() {
    return {
      model: {
        state: 0,
        data: {
          Id: 0,
          短信内容: '',
          接收对象: '',
          短信类型: '',
          受理状态: ''
        }
      },
      rules: {
        短信内容: [
          { required: true, message: '短信内容不能为空', trigger: 'blur' },
          { min: 5, max: 70, message: '短信内容长度在5到70个字符', trigger: 'blur' }
        ],
        短信类型: [
          { required: true, message: '请选择短信类型', trigger: 'blur' }
        ],
        受理状态: [
          { required: true, message: '请选择受理状态', trigger: 'blur' }
        ]
      },
      options: [{
        value: 0,
        label: '未受理'
      }, {
        value: 1,
        label: '受理中'
      }, {
        value: 2,
        label: '已完成'
      }],
      smsTypeOptions: [{
        value: 0,
        label: '验证码短信'
      }, {
        value: 1,
        label: '通知短信'
      }],
      receivingObjectsOptions: [{
        value: 0,
        label: '报警人'
      }, {
        value: 1,
        label: '警员'
      }, {
        value: 2,
        label: '管理员'
      }],
      selectedValue: ''
    }
  },
  mounted() {
    if (this.id > 0) {
      this.getDetail()
    }
  },
  methods: {
    // 获取详细
    getDetail() {
      detail(this.id).then(response => {
        this.model.data = response.Data
      })
    },
    // 返回表单数据给列表页进行持久化
    getFormData() {
      this.$refs['smsTemplateform'].validate((valid) => {
        if (valid) {
          this.model.state = 1
        }
      })
      return this.model
    }
  }
}
</script>
