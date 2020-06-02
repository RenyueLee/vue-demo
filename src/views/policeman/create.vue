<template>
  <section>
    <el-col :span="8">
      <div>
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
    </el-col>
    <el-col :span="16">
      <div>
        <el-form ref="policemanForm" :model="model.data" :rules="rules" label-width="100px">
          <el-form-item prop="警员编号" label="警员编号:">
            <el-input v-model="model.data.警员编号" />
          </el-form-item>
          <el-form-item prop="姓名" label="姓名:">
            <el-input v-model="model.data.姓名" />
          </el-form-item>
          <el-form-item prop="手机号" label="手机号:">
            <el-input v-model="model.data.手机号" />
          </el-form-item>
          <el-form-item prop="GroupIds" label="拥有权限:">
            <el-select v-model="model.data.GroupIds" placeholder="请选择">
              <el-option
                v-for="item in groupOptions"
                :key="item.Value"
                :label="item.Text"
                :value="item.Value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="DepartmentId" label="所属部门:">
            <el-select v-model="model.data.DepartmentId" filterable placeholder="请选择">
              <el-option
                v-for="item in departmentOptions"
                :key="item.Value"
                :label="item.Text"
                :value="item.Value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </section>
</template>

<script>
import { getSelectList as getDepartmentList } from '@/api/department'
import { getSelectList as getGroupList } from '@/api/group'
import { validPhone } from '@/utils/validate'
export default {
  data() {
    return {
      model: {
        state: 0,
        data: {
          Id: 0,
          警员编号: '',
          姓名: '',
          头像: '',
          手机号: '',
          DepartmentId: '',
          GroupIds: '',
          所属部门: '',
          添加时间: ''
        },
        uploadUrl: process.env.VUE_APP_BASE_API + '/policemen/uploadImageFile'
      },
      rules: {
        警员编号: [
          { required: true, message: '警员编号不能为空', trigger: 'blur' },
          { min: 10, max: 20, message: '警员编号长度在10到20个字符', trigger: 'blur' }
        ],
        姓名: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 4, message: '姓名长度在2到4个字符', trigger: 'blur' }
        ],
        手机号: [
          { trigger: 'blur', validator: validPhone }
        ],
        GroupIds: [
          { required: true, message: '请选权限', trigger: 'blur' }
        ],
        所属部门: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      },
      departmentOptions: [],
      groupOptions: [],
      imageUrl: ''
    }
  },
  mounted() {
    this.getDepartmentOptions()
    this.getGroupOptions()
  },
  methods: {
    // 获取部门下拉列表数据
    getDepartmentOptions() {
      getDepartmentList().then(response => {
        this.departmentOptions = response.Data
      })
    },
    // 获取权限下拉列表数据
    getGroupOptions() {
      getGroupList().then(response => {
        this.groupOptions = response.Data
      })
    },
    // 获取表单数据
    getFormData() {
      this.$refs['policemanForm'].validate((valid) => {
        if (valid) {
          this.model.state = 1
        }
      })

      return this.model
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      if (res.Code === 20000) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.imageUrl = process.env.VUE_APP_BASE_IP + res.Data
        this.model.data.头像 = res.Data
      } else {
        this.$message({
          message: res.Message,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
