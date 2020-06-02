<template>
    <div class="app-container">
      <el-row>

        <el-col :span="16" :push="8">
          <video width="640" height="480" controls>
            <source src="https://www.runoob.com/try/demo_source/movie.mp4"  type="video/mp4">
            <source src="https://www.runoob.com/try/demo_source/movie.ogg"  type="video/ogg">
            您的浏览器不支持 HTML5 video 标签。
          </video>
        </el-col>

      </el-row>

  
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
            <el-tab-pane label="章节列表" name="second">章节列表</el-tab-pane>
          </el-tabs>


    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style>
  .tab-wrapper {
    border: 1px solid #ebebeb;
    padding: 15px;
  }
</style>
