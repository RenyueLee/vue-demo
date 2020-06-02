<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="权限信息" name="first">
      <el-form ref="groupForm" :model="model.data" :rules="rules" label-width="60px">
        <el-form-item prop="名称" label="名称">
          <el-input v-model="model.data.名称" />
        </el-form-item>
        <el-form-item prop="备注" label="备注">
          <el-input v-model="model.data.备注" type="textarea" rows="3" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="拥有角色" name="second">
      <div>
        <el-input
          v-model="params.queryString"
          prefix-icon="el-icon-search"
          placeholder="请输入关键字查询"
          style="width:100%;"
          @input="getRoles"
        />
      </div>
      <div style="margin-top:20px;">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          :data="roles"
          border
          style="width:100%"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" width="50" />
          <el-table-column prop="名称" label="名称" width="200" />
          <el-table-column prop="备注" label="备注" min-width="200" />
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { query as queryRoles } from '@/api/role'

export default {
  data() {
    return {
      activeName: 'first',
      loading: true,
      model: {
        state: 0,
        data: {
          Id: 0,
          名称: '',
          备注: '',
          角色编号集合: ''
        }
      },
      params: {
        queryString: ''
      },
      roles: [],
      rules: {
        名称: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 3, max: 100, message: '短信内容长度在3到100个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    // 获取角色列表
    async getRoles() {
      this.loading = true
      await queryRoles(this.params).then(response => {
        this.roles = response.Data
        this.loading = false
      })

      return this
    },
    // 获取表单数据
    getFormData() {
      this.$refs['groupForm'].validate((valid) => {
        if (valid) {
          // 获取选中的角色
          const selectData = this.$refs.multipleTable.selection
          if (selectData.length === 0) {
            this.$message({
              message: '请选择该角色所拥有的角色！',
              type: 'warning'
            })
          } else {
            // 获取选中的角色ID并组合成以逗号间隔的字符串
            this.model.data.角色编号集合 = selectData.map(item => item.Id).join()
            this.model.state = 1
          }
        }
      })

      return this.model
    }
  }
}
</script>
