<template>
  <el-form ref="departmentForm" :model="model.data" :rules="rules" label-width="80px">
    <el-form-item prop="部门名称" label="部门名称">
      <el-input v-model="model.data.部门名称" />
    </el-form-item>
    <el-form-item label="上级部门">
      <el-select v-model="model.data.ParentId" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.Value"
          :label="item.Text"
          :value="item.Value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { detail, getSelectList } from '@/api/department'
export default {
  props: ['id'],
  data() {
    return {
      model: {
        state: 0,
        data: {
          Id: 0,
          部门名称: '',
          ParentId: ''
        }
      },
      rules: {
        部门名称: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 4, max: 50, message: '部门名称长度在4到50个字符', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  mounted() {
    if (this.id > 0) {
      this.getDetail()
    }
    // 获取部门下拉列表
    this.getDepartmentOptions()
  },
  methods: {
    // 获取部门详细信息
    getDetail() {
      detail(this.id).then(response => {
        this.model.data = response.Data
        this.model.data.ParentId = String(response.Data.ParentId)
      })
    },
    // 获取部门下拉列表
    getDepartmentOptions() {
      getSelectList().then(response => {
        this.options = response.Data
      })
    },
    // 返回表单数据给列表页进行持久化
    getFormData() {
      this.$refs['departmentForm'].validate((valid) => {
        if (valid) {
          this.model.state = 1
        }
      })
      return this.model
    }
  }
}
</script>

<style>
</style>
