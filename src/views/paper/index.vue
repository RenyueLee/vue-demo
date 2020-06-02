<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>试卷名称：{{exam.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">40/{{exam.totalNumber}}</el-button>
          </div>
          <p><span>1. ({{exam.questionType}})</span>{{exam.stem}}</p>
        <div v-for="(val, index) in exam.options" :key="val" class="text item">
            <div style="margin-bottom: 10px;">
              <el-button circle type="danger" size="mini" @click="btnOptionClick(index)" :class="{ 'selected': contains(selectedOptions, index) }"> {{QuestionOptions[index]}} </el-button>
              <span>{{val}}</span>
            </div>
          </div>
          <div>
            <el-radio v-model="radio" label="1">对</el-radio>
            <el-radio v-model="radio" label="2">错</el-radio>
          </div>
        </el-card>

        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="12" :offset="6">
            <el-button-group style="margin-top: 20px;">
              <el-button type="danger" @click="btnPrevClick(exam.id)" icon="el-icon-arrow-left">上一题</el-button>
              <el-button type="danger" @click="btnNextClick(exam.id)" :disabled="this.selectedOptions.length ? false : true">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              <el-button type="danger" disabled="">交 卷</el-button>
            </el-button-group>
          </el-col>
<!--          <el-col :span="12"><el-button type="danger" icon="el-icon-arrow-left" class="btnPrev">上一题</el-button></el-col>
          <el-col :span="12"><el-button type="danger" class="btnNext">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button></el-col> -->
        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      // 局部变量
      QuestionOptions: ['A', 'B', 'C', 'O'],
      radio: '1',
      exam: {
        id: '1',
        title: '党校考试',
        totalNumber: 50,
        questionType: '多选',

        // '{A:1234},{B:12},{C:1},{D:99}' 获取数据后将字符串解码成数组
        options: [1, 2, 3, 4],
        stem: '与选项卡绑定值 value 对应的标识符，表示选项卡别名',
        answer: 'A'
      },
      selectedOptions: [ ] // 默认为空数组

    }
  },
  methods: {
    //  获取试卷及试题数据
    getExamData() {
      // getSelectList().then(response => {
      //   this.options = response.Data
      // })
    },

    // 选项按钮点击事件
    btnOptionClick(index) {
      switch (this.exam.questionType) {
        case '单选':
          this.selectedOptions = [];
          this.selectedOptions.push(index);
          break;

        case '多选':
          if (this.contains(this.selectedOptions, index)) {
            let idx = this.selectedOptions.indexOf(index);
            this.selectedOptions.splice(idx, 1)
          } else this.selectedOptions.push(index);
          break;

        case '判断':
          this.selectedOptions = [];
          this.selectedOptions.push(index);
          break;
      }
    },

    btnPrevClick(id) {
      // to do...

    },

    btnNextClick(id) {
      // to do...

    },

    // 检查数组是否包含某个元素
    contains(arr, val) {
      let i = arr.length;
      while (i--) {
        if (arr[i] === val) {
          return true;
        }
      }
      return false;
    }
  }
  // to do list
  // 答题超时的逻辑
  // 答题到一半中途退出
}

</script>

<style>
  .btnPrev {
    float: right;
    margin-left: 20px;
  }

  .btnNext {
    float: left;
    margin-right: 20px;
  }

  .selected{
    background-color: #001528 !important;
  }

</style>
