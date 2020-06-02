<template>
  <div class="dashboard-container">
    <el-row>
      <el-card shadow="never">
        <div slot="header">
          <span>视频学习</span>
          <el-button style="float: right; padding: 3px 0" type="text">更多 >> </el-button>
        </div>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for="(o, index) in videoList" :key="o">
            <el-card :body-style="{ padding: '0px', backgroundColor: '#eeeeee'}" shadow="hover">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <a href="" style="color: #337ab7; font-size: 18px;">{{ videoList[index].title }}</a>
                <p>主讲人：<span> {{ videoList[index].speaker }}</span></p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>

      <el-card shadow="never" style="margin-top:20px">
        <div slot="header">
          <span>在线考试</span>
          <el-button style="float: right; padding: 3px 0" type="text">更多 >> </el-button>
        </div>
       <template>
         <el-tabs v-model="activeName">
           <el-tab-pane label="我的试卷" name="first">

            <el-table
              :data="tblDataPapers"
              height="250"
              border
              style="width: 100%">
              <el-table-column prop="date" label="试卷名称" width="180"></el-table-column>
              <el-table-column prop="name" label="可考次数" width="180"></el-table-column>
              <el-table-column prop="address" label="时长"></el-table-column>
              <el-table-column prop="address" label="截止时间"></el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"> 开始考试 </el-button>
                </template>
              </el-table-column>

            </el-table>

            </el-tab-pane>
            <el-tab-pane label="我的成绩" name="second">
              <el-table
                :data="tblDataExam"
                height="250"
                border
                style="width: 100%">
                <el-table-column prop="date" label="试卷名称" width="180"></el-table-column>
                <el-table-column prop="name" label="可考次数" width="180"></el-table-column>
                <el-table-column prop="address" label="时长"></el-table-column>
                <el-table-column prop="address" label="截止时间"></el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"> 开始考试 </el-button>
                  </template>
                </el-table-column>

              </el-table>
            </el-tab-pane>
         </el-tabs>
       </template>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import LineChart from '@/components/home/LineChart'
import LineCount from '@/components/home/LineCount'
import { countAsAcceptingState, chartData } from '@/api/alarmInfo'

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      // 视频列表数据(后台返回最新的8条数据)
      videoList: [{
        title: '着力解决民生痛点热点...',
        speaker: '王道勇',
        src: '',
        href:'',
      },{
          title: '着力解决民生痛点热点...',
          speaker: '王道勇',
          src: '',
          href:''
      },{
          title: '着力解决民生痛点热点...',
          speaker: '王道勇',
          src: '',
          href:''
      },{
          title: '着力解决民生痛点热点...',
          speaker: '王道勇',
          src: '',
          href:''
      }],
      
      // 在线考试相关数据
      activeName: 'second',
      tblDataPapers: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
      }],
      tblDataExam: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  watch: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>
