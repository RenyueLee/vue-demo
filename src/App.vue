<template>

  <div id="app">
    <header>
      <div class="header">
       <img src="./assets/images/head.jpg" width="100%">
      </div>
    </header>
      <section class="topnav-wrapper">
        <div class="topnav-container container">
          <ul class="nav nav-justified top-nav">
            <li :class="{'active':( activeRouter === '#/home' ) ? true : false }">
              <a href="#/home" @click="topNavClick($event)">首 页</a>
            </li>
            <li :class="{'active':( activeRouter === '#/video/detail' ) ? true : false }">
              <a href="#/video/detail" @click="topNavClick($event)">视频课程</a>
            </li>
            <li :class="{'active':( activeRouter === '#/paper/index' ) ? true : false }">
              <a href="#/paper/index" @click="topNavClick($event)">在线考试</a>
            </li>
            <li :class="{'active':( activeRouter === '#/profile/index' ) ? true : false }">
              <a href="#/profile/index" @click="topNavClick($event)">个人中心</a>
            </li>
<!--            <li :class="{'active':isActive}"><a href="#/video">视频课程</a></li>
            <li class=""><a href="#/paper/index">在线考试</a></li>
            <li class=""><a href="#profile">个人中心</a></li> -->
          </ul>

<!--    <el-menu :default-active="activeRouter" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">视频课程</template>
        <el-menu-item index="2-1">
          <router-link to="/paper/index">试卷列表</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="/video/index">视频列表</router-link>
        </el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">个人中心</el-menu-item>
    </el-menu> -->
      </div>
      </section>

    <router-view />
		<footer>
      <el-row>
        <p>地址：舟山市昌州大道2000号（316000）(0580) 2660035 电子邮件：zsswdx@zhoushan.gov.cn</a></p>
        <p>版权所有：中共舟山市委党校 | 舟山行政学院 | 舟山市社会主义学院 <a href="http://www.zsdx.com.cn" target="_blank">技术支持：舟山东迅信息科技有限公司</a></p>
        <p>建议使用IE10以上浏览网页</p>
      </el-row>
    </footer>
  </div>

</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      // 页面当前位置为路由初始值
      activeRouter: window.location.hash || this.$route.path
    }
  },

  watch: {

  },

  mounted: function() {

  },

  methods: {

    // 结合href，控制顶部导航选中样式
    topNavClick(event) {
      console.log(event)
      this.activeRouter = event.target.hash;
    }

  }
}
</script>

<style>
  .header{
    margin-bottom: -5px;
  }
  .topnav-wrapper{
    box-shadow: 0px 2px 5px #e9e9e9;
  }
  .topnav-container {
    margin: 0 auto;
  }

  .topnav-container ul{
    margin: 0;
  }

  .topnav-container ul li{
    display: table-cell;
    width: 1%;
    padding: 20px;
    text-align: center;
  }

  .topnav-container ul li a{
    text-align: center;
  }

  .topnav-container ul .active{
    background-color: #ff0101;
    color: #ffffff;
  }

@media (min-width: 768px){
  .container {
      width: 746px;
  }
}

@media (min-width: 992px){
  .container {
      width: 966px;
  }
}

@media (min-width: 1200px){
  .container {
      width: 1166px;
  }
}





  footer {
    position: absolute;
    width: 100%;
    background-color: #f1f1f1;
    padding-top: 15px;

  }
	footer p {
		margin: 0 auto;
		line-height: 2rem;
		font-size: 14px;
		text-align: center;
	}
</style>
